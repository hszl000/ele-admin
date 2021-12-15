<!-- 角色列表 -->
<template>
  <div class="">
    <!-- 封装的 table  isCard是询问你父组件是否有cards -->
    <theme-table :cds="cds" :isCard="false">
      <template #isCard="{ headerStyleObj }">
        <el-table
          :data="RoleList"
          border
          style="width: 100%"
          :header-cell-style="headerStyleObj"
          row-key="id"
          ref="table"
        >
          <!-- @expand-change="expandChange" -->
          <!-- 展开行 显示角色下面的权限 > -->
          <el-table-column type="expand" label=">">
            <template #default="{ row }">
              <div class="tags">
                <el-tag
                  size="mini"
                  v-for="item in getAllPermissions_"
                  :key="item.id"
                  :closable="!isActive(row, item)"
                  @close="tagClose(row, item.id)"
                  @click="addTag(row, item.id)"
                  :class="{ 'no-active': isActive(row, item) }"
                  >{{ item.title }}</el-tag
                >
              </div>
            </template>
          </el-table-column>
          <!-- 序号 -->
          <el-table-column
            :label="$t('msg.role.index')"
            type="index"
            width="160"
          ></el-table-column>
          <!-- 名称 -->
          <el-table-column
            :label="$t('msg.role.name')"
            prop="title"
            width="200"
          >
          </el-table-column>
          <!-- 描述 -->
          <el-table-column
            :label="$t('msg.role.desc')"
            prop="describe"
          ></el-table-column>
          <!-- 操作 -->
          <el-table-column :label="$t('msg.role.action')">
            <template #default="{ row }">
              <el-badge
                v-if="row.permissions && row.permissions.length >= 0"
                :value="row.permissions.length"
                type="primary"
              >
                <el-button
                  type="primary"
                  size="mini"
                  @click="showEditPermission(row)"
                  >{{ $t('msg.role.assignPermissions') }}</el-button
                >
              </el-badge>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </theme-table>

    <!-- 角色修改权限的 模态框 -->
    <edit-permission
      :isShowDialog="isShowDialog"
      @close="parentClose"
      :roleId="selectRoleId"
      :tagObj="tagObj"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
// 引入封装好的 table 组件
import ThemeTable from '@/components/ThemeTable/index.vue'
// 引入修改权限的模态框
import EditPermission from './components/EditPermission.vue'
import { useStore } from 'vuex'
const store = useStore()
// 初始化角色列表数据
const RoleList = ref([]) // 响应式 在 vuex 中更新这里也会改变
const getAllRoles = () => {
  // 初始化请求角色列表（vuex中执行）
  store.dispatch('roleAndPermission/InitRoles')
  // 初始化请求所有的权限列表（vuex中执行）
  store.dispatch('roleAndPermission/InitPermissions')
  // 赋值操作用了 watch 监听
}
getAllRoles()
// 语言切换重新请求数据
const cds = [
  () => {
    // 清空本地储存
    store.dispatch('roleAndPermission/clearRoleAndPermission')
  },
  getAllRoles
]

// 修改权限
const isShowDialog = ref(false)
// 当前选中数据的id
const selectRoleId = ref('')
// 当前行内容
// const rowData = ref({})
const showEditPermission = (row) => {
  // 打开模态框
  isShowDialog.value = true
  // 保存当前 id
  selectRoleId.value = row.id
  // 保存当前行内容
  // rowData.value = row
}

// 获取所有的权限
const getAllPermissions_ = ref([])
// 未选中 tag 的文字颜色
const noActiveBg = computed(() => {
  return store.getters.cssVar['light-7']
})

// 检测是否选中 tag
const isActive = (row, item) => {
  if (row.permissions && row.permissions.length > 0) {
    return !row.permissions.find((per) => {
      return per.id === item.id
    })
  }
  return 'no-active'
}
// 在父组件关闭子组件模态框
const table = ref(null)
const parentClose = () => {
  // 关闭模态框
  isShowDialog.value = false
  // 改完之后让本来展开的树形控件继续打开
  // expandArr.value.forEach((role) => {
  //   table.value.toggleRowExpansion(role, true)
  // })
}

// 当某一行被展开或合并时触发
// const expandArr = ref([])
// const expandChange = (_, arr) => {
//   expandArr.value = arr
// }

// 关闭 tag close 触发
const tagObj = ref({ row: '', id: '', title: '' })
const tagClose = async (row, tagId) => {
  console.log(row, tagId, '关闭')
  tagObj.value = { row, id: tagId, title: '删除' }
}
// 点击添加tag 权限
const addTag = async (row, tagId) => {
  console.log(row, tagId, '添加')
  tagObj.value = { row, id: tagId, title: '添加' }
}

// 监听数据发生改变对表格数据进行赋值
// 防抖只进行最后一次赋值
let timer
watch(
  () => store.getters.roles,
  () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // 初始化表格数据
      RoleList.value = store.getters.roles
      // 所有权限
      getAllPermissions_.value = store.state.roleAndPermission.permissions_
    }, 500)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.tags {
  text-align: center;
  width: 100%;
  span {
    margin-left: 10px;
  }
  .no-active {
    color: v-bind(noActiveBg);
    cursor: pointer;
  }
}
</style>
