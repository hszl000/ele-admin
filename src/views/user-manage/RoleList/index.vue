<template>
  <div>
    <el-dialog
      :title="$t('msg.excel.roleDialogTitle')"
      :model-value="showRole"
      @close="close('取消')"
    >
      <div class="demo-with-border">
        <el-checkbox-group v-model="checkboxRole" size="small">
          <el-checkbox
            v-for="role in props.allRole"
            :key="role.id"
            :label="role.title"
            size="medium"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
      <template #footer>
        <el-button @click="close('取消')">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
// 获取指定用户 所拥有的角色
import { getUserRoleById, upDataUserRole } from '@/api/user-manage.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
// 接收父传子参数
const props = defineProps({
  showRole: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  allRole: {
    type: Array,
    required: true
  },
  tagObj: {
    type: Object,
    required: true
  }
})
// 自定义事件
const emits = defineEmits(['closeRole'])

// 关闭
const close = (title = '提交') => {
  emits('closeRole', title)
}
// 当本模态框被打开时请求数据
watch(
  () => props.showRole,
  (newValue) => {
    if (newValue) {
      getUserRole()
    }
  }
)
// 获取当前用户所拥有的角色
const checkboxRole = ref([])
const getUserRole = async () => {
  const res = await getUserRoleById(props.userId)
  checkboxRole.value = res.role.map((item) => item.title)
}
// 为员工添加角色
const confirm = async () => {
  const roleArr = props.allRole.filter((item) => {
    return checkboxRole.value.includes(item.title)
  })
  console.log(roleArr)
  await upDataUserRole(props.userId, { roles: roleArr })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 关闭模态框
  close()
}

// 点击 tag 分配权限
watch(
  () => props.tagObj,
  async () => {
    const res = await getUserRoleById(props.tagObj.row._id)
    checkboxRole.value = res.role
    if (props.tagObj.title === '删除') {
      checkboxRole.value = checkboxRole.value.filter((item) => {
        return item.id !== props.tagObj.item.id
      })
    } else {
      checkboxRole.value.push(props.tagObj.item)
    }
    await upDataUserRole(props.tagObj.row._id, { roles: checkboxRole.value })
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    // 关闭模态框 (能调用一次刷新)
    close()
  }
)
</script>

<style lang="scss" scoped></style>
