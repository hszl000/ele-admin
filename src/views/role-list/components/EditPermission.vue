<!-- 模态框 编辑角色权限 -->
<template>
  <div>
    <el-dialog
      :title="$t('msg.role.assignPermissions')"
      :model-value="isShowDialog"
      @close="close"
    >
      <!-- 树形控件 -->
      <el-tree
        :props="defaultProps"
        :data="PermissionList"
        node-key="id"
        :show-checkbox="true"
        :check-strictly="true"
        ref="tree"
      />
      <template #footer>
        <el-button @click="close">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
// 请求所有的权限列表
import { getAllPermissions } from '@/api/permission.js'
// 请求当前角色权限 --- 更新当前角色权限
import { getPermissionsByRoleId, updatePermissionByRoleId } from '@/api/role.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n/index'
import { useStore } from 'vuex'
const i18n = useI18n()
const store = useStore()
// props属性
const props = defineProps({
  isShowDialog: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  },
  tagObj: {
    type: Object,
    required: true
  }
})
// 自定义事件
const emits = defineEmits(['close'])

// 关闭模态框
const close = () => {
  emits('close')
}
// 确认事件
const confirm = async () => {
  // 获取当前角色被选中的权限
  const checkedArr = tree.value.getCheckedKeys()
  // 修改对应角色的权限
  await updatePermissionByRoleId({
    roleId: props.roleId,
    permissions: checkedArr
  })
  // 更新 vuex 中该角色的权限
  store.commit('roleAndPermission/updatePermissionToRole', {
    roleId: props.roleId,
    permissionArray: checkedArr
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 关闭模态框
  close()
}
// 展示树形控件的字节
const defaultProps = ref({
  label: 'permissionName',
  children: 'children'
})

// 请求所有的权限列表数据
const PermissionList = ref([])
const tree = ref(null)
const getAllPermissions_ = async () => {
  PermissionList.value = await getAllPermissions()
}

// 请求当前角色默认的权限
const getPermissionsByRoleId_ = async () => {
  const res = await getPermissionsByRoleId(props.roleId)
  tree.value.setCheckedKeys(res)
}

// 监视当前 模态框是否为开启状态（如果开启便请求）
watch(
  () => props.isShowDialog,
  (newValue) => {
    if (newValue) {
      getAllPermissions_()
      getPermissionsByRoleId_()
      console.log('树形控件请求了')
    }
  },
  { immediate: true }
)
// 监视父组件操作的权限 （如果改变便更新）
watch(
  () => props.tagObj,
  async (newValue) => {
    // 请求当前角色拥有的权限
    const res = await getPermissionsByRoleId(newValue.row.id)
    if (newValue.title === '添加') {
      // 添加操作

      // 如果当前角色有你当前新添加的权限 那就停止添加
      if (res.includes(newValue.id)) return ElMessage.info('不能重复添加')
      // 否则就添加至服务器
      await updatePermissionByRoleId({
        roleId: newValue.row.id,
        permissions: res.concat(newValue.id)
      })
      // 更新 vuex 中该角色的权限
      store.commit('roleAndPermission/updatePermissionToRole', {
        roleId: newValue.row.id,
        permissionArray: res.concat(newValue.id)
      })
      // 添加成功提示
      ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    } else {
      // 删除操作
      console.log('删除')

      // 移出角色中你选中的权限
      const newRes = res.filter((item) => item !== newValue.id)
      // 同步至服务器
      await updatePermissionByRoleId({
        roleId: newValue.row.id,
        permissions: newRes
      })
      // 更新 vuex 中该角色的权限
      store.commit('roleAndPermission/updatePermissionToRole', {
        roleId: newValue.row.id,
        permissionArray: newRes
      })
      // 更新成功提示
      ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    }
  }
)
</script>

<style lang="scss" scoped></style>
