<!-- 用户管理 导入 导出 -->
<template>
  <div class="user-manage-container">
    <el-card class="header">
      <!-- 导入 excel 按钮 -->
      <el-button type="primary" @click="onInportExcel">{{
        $t('msg.excel.importExcel')
      }}</el-button>
      <!-- 导出  按钮 -->
      <el-button type="success" @click="onExportExcel">{{
        $t('msg.excel.exportExcel')
      }}</el-button>
    </el-card>
    <!-- table -->
    <el-card class="table-card">
      <!-- table 渲染 -->
      <theme-table :cds="cds" :isCard="true">
        <template #default="{ headerStyleObj }">
          <el-table
            :data="tableData"
            :header-cell-style="headerStyleObj"
            border
            style="width: 100%"
            class="table"
            row-key="id"
          >
            <!-- 展开行 显示角色下面的权限 > -->
            <el-table-column type="expand" label=">">
              <template #default="{ row }">
                <div class="tags">
                  <el-tag
                    size="mini"
                    v-for="item in allRole"
                    :key="item.id"
                    :closable="!isActive(row, item)"
                    @close="tagClose(row, item)"
                    @click="addTag(row, item)"
                    :class="{ 'no-active': isActive(row, item) }"
                    >{{ item.title }}</el-tag
                  >
                </div>
              </template>
            </el-table-column>
            <!-- # -->
            <el-table-column
              label="#"
              type="index"
              align="center"
            ></el-table-column>
            <!-- 姓名 -->
            <el-table-column
              :label="$t('msg.excel.name')"
              prop="username"
              align="center"
            ></el-table-column>
            <!-- 联系方式 -->
            <el-table-column
              :label="$t('msg.excel.mobile')"
              prop="mobile"
              align="center"
            ></el-table-column>
            <!-- 头像 -->
            <el-table-column :label="$t('msg.excel.avatar')" align="center">
              <template v-slot="{ row }">
                <el-image
                  :src="row.avatar"
                  :preview-src-list="[row.avatar]"
                  class="avatar"
                ></el-image>
              </template>
            </el-table-column>
            <!-- 角色 -->
            <el-table-column :label="$t('msg.excel.role')" align="center">
              <template #default="{ row }">
                <div v-if="row.role && row.role.length > 0">
                  <el-tag v-for="tag in row.role" :key="tag.id" size="mini">
                    {{ tag.title }}
                  </el-tag>
                </div>
                <div v-else>
                  <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <!-- 开通时间 -->
            <el-table-column :label="$t('msg.excel.openTime')" align="center">
              <template #default="{ row }">
                {{ $filters.dateFilter(row.openTime) }}
              </template>
            </el-table-column>
            <!--  -->
            <el-table-column
              :label="$t('msg.excel.action')"
              width="260px"
              align="center"
              :resizable="true"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button
                  size="mini"
                  type="success"
                  @click="showUserDetail(row)"
                  >{{ $t('msg.excel.show') }}</el-button
                >
                <el-button size="mini" type="primary" @click="openRole(row)">{{
                  $t('msg.excel.showRole')
                }}</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="removeDate(row)"
                  >{{ $t('msg.excel.remove') }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </theme-table>
      <!-- pagenation 分页展示 -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :currentpage="page"
        :page-sizes="[1, 5, 10, 20, 30, 50]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- excel 导出 模态显示 -->
    <export-excel
      :dialogShow="dialogShow"
      @closeDialog="close"
      :fileName="fileName"
      :data="dataFormate(exportData)"
      :header="Object.keys(USER_RELATION)"
      :message="$t('msg.excel.exportSucceed')"
    >
      <template #default>
        <!-- 选择下载的文件类型 -->
        <el-select
          v-model="excelType"
          placeholder="Select"
          class="sel"
          @change="changeExportType"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </template>
    </export-excel>

    <!-- 分配角色模态框 -->
    <role-list
      :showRole="showRole"
      @closeRole="closeRole"
      :userId="userId"
      :allRole="allRole"
      :tagObj="tagObj"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// 获取用户 -- 获取所有 -- 删除当前员工 -- 更新当前用户的角色
import { getUser, getAllUser, deleteUserById } from '@/api/user-manage.js'
import ExportExcel from '@/components/ExportExcel/index.vue'
import { USER_RELATION } from '@/common/common.js'
import dateFilter from '@/Filters/dateFilter.js'
import { useI18n } from 'vue-i18n/index'
import { watchLang } from '@/utils/i18n.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import ThemeTable from '../../components/ThemeTable/index.vue'
import RoleList from './RoleList/index.vue'
// 角色列表请求
import { getAllRole } from '@/api/role.js'
// #region 导入逻辑
// 使用路由
const router = useRouter()
// 使用 vuex
const store = useStore()

// 表格相关数据
const tableData = ref([])

// excel的导入 （需要跳转到导入页面）
const onInportExcel = () => {
  // 跳转到导入页面
  router.push('/user/import')
}

// 分页相关数据
const size = ref(5) // 展示的数据
const page = ref(1) //
const total = ref(0) // 总条目数

// 改变页展示数据的大小
const sizeChange = (currentSize) => {
  size.value = currentSize
  // 请取数据
  getManageUser()
}
// 改变当前页码
const currentChange = (currentPage) => {
  page.value = currentPage
  // 请取数据
  getManageUser()
}
// 获取用户数据
const getManageUser = async () => {
  const data = await getUser({
    // 请求数据传参格式
    page: page.value,
    size: size.value
  })
  // 接收参数
  tableData.value = exportData.value = data.list
  total.value = data.total
}
getManageUser()
const cds = [getManageUser]
// #endregion

// #region 导出业务
const i18n = useI18n()
// 导出相关业务
// 模态框标志
const dialogShow = ref(false)
// 打开模态框（点击导出）
const onExportExcel = () => {
  dialogShow.value = true
  // 默认显示第一页
  fileName.value = `${i18n.t('msg.excel.defaultName')}(${page.value})`
  // 默认选中当前页
  excelType.value = 1
}
// 关闭模态框
const close = () => {
  dialogShow.value = false
}

// 下拉框相关数据
const excelType = ref(1)
const options = ref([
  {
    id: 1,
    label: '当前页'
  },
  {
    id: 2,
    label: '全部数据'
  }
])
// 收集要下载的数据
const exportData = ref([])
// 收集文件名称
const fileName = ref(i18n.t('msg.excel.defaultName'))
// 下拉框改变
const changeExportType = async (value) => {
  if (value === 1) {
    // 请求当前页
    fileName.value = `${i18n.t('msg.excel.defaultName')}(${page.value})`
  } else {
    fileName.value = i18n.t('msg.excel.defaultName')
    // 请求全部数据
    const { list } = await getAllUser()
    exportData.value = list
  }
}

// 转换数据格式
const dataFormate = (data) => {
  return data.map((item) => {
    return Object.keys(USER_RELATION).map((key) => {
      if (USER_RELATION[key] === 'role') {
        // 处理用户角色
        const roles = item[USER_RELATION[key]]
        if (roles.length > 0) {
          return JSON.stringify(roles.map((role) => role.title))
        } else {
          return '[]'
        }
      } else if (USER_RELATION[key] === 'openTime') {
        // 处理时间
        return dateFilter(item[USER_RELATION[key]])
      } else {
        return item[USER_RELATION[key]]
      }
    })
  })
}

// 监听中英文切换 (封装好的 语言切换监听方法)
watchLang((lang) => {
  fileName.value = i18n.t('msg.excel.defaultName')
  getAllRole_()
})

// 删除表格数据
const removeDate = (row) => {
  ElMessageBox.confirm(
    `${i18n.t('msg.excel.dialogTitle1')}:  ${row.username}${i18n.t(
      'msg.excel.dialogTitle2'
    )}`,
    i18n.t('msg.excel.remove'),
    {
      confirmButtonText: i18n.t('msg.excel.remove'),
      cancelButtonText: i18n.t('msg.excel.close'),
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUserById(row._id)
      // 删除完成重新请求数据
      getManageUser()
      ElMessage({
        type: 'success',
        message: i18n.t('msg.excel.removeSuccess')
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.t('msg.excel.close') + i18n.t('msg.excel.remove')
      })
    })
}
// #endregion

// 跳转用户详情 (查看)
const showUserDetail = ({ _id }) => {
  router.push(`/user/info/${_id}`)
}

// 分配角色逻辑 --------------------------------------
// 获取所有角色 --- 权限列表中也有储存（先获取储存，如果没有在请求）
const allRole = ref(store.state.roleAndPermission.roles)
const getAllRole_ = async () => {
  allRole.value = await getAllRole()
}
// 如果 vuex 角色数据是空的，那就请求接口获取
if (Array.isArray(allRole.value) && allRole.value.length <= 0) {
  getAllRole_()
}
// 模态框展开
const showRole = ref(false)
// 获取当前的用户 id
const userId = ref('')
// 打开模态框
const openRole = (row) => {
  showRole.value = true
  // 获取当前打开的数据id
  userId.value = row._id
}
// 关闭模态框
const closeRole = (title) => {
  if (title !== '取消') {
    // 更新本地数据
    getManageUser()
  }
  // 关闭模态框
  showRole.value = false
}

// 检测是否选中 tag
const isActive = (row, item) => {
  if (row.role && row.role.length > 0) {
    return !row.role.find((per) => {
      return per.id === item.id
    })
  }
  return 'no-active'
}

// 未选中 tag 的文字颜色
const noActiveBg = computed(() => {
  return store.getters.cssVar['light-7']
})

// 关闭 tag close 触发
const tagObj = ref({ row: '', id: '', title: '' })
const tagClose = async (row, item) => {
  tagObj.value = { row, item, title: '删除' }
  console.log(tagObj.value, '删除')
}
// 点击添加tag 权限
const addTag = async (row, item) => {
  tagObj.value = { row, item, title: '添加' }
  console.log(tagObj.value, '添加')
}
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  margin-bottom: 22px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.table-card {
  // max-height: calc(100vh - 96px - 22px);
}
.sel {
  margin-top: 20px;
  width: 100%;
}

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
