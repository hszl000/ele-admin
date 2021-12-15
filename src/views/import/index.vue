<!-- 导入 -->
<template>
  <div class="">
    <upload-excel
      :beforeUpload="beforeUpload"
      :onSuccess="uploadExcelSuccess"
    />
  </div>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
// 添加数据接口
import { addUserByExcel } from '@/api/user-manage.js'
import { USER_RELATION } from '@/common/common.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { formatDate } from '@/utils/xlsx.js'
const router = useRouter()
const i18n = useI18n()
// 上传前钩子
const beforeUpload = () => {
  return { type: 'excel', doUpload: true }
}
// 上传后钩子
const uploadExcelSuccess = async ({ headers, bodys }) => {
  // console.log(headers)
  // console.log(bodys)

  const result = generateExcelData(bodys)
  // 插入数据
  await addUserByExcel(result)
  // console.log(result, '0000')
  ElMessage.success(result.length + i18n.t('msg.excel.importSuccess'))
  // 跳转到员工管理界面
  router.push('/user/manage')
}

// 格式化 excel 数据
const generateExcelData = (arr) => {
  const arr_ = []
  arr.forEach((item) => {
    const obj = {}
    Object.keys(USER_RELATION).forEach((key) => {
      if (USER_RELATION[key] === 'role') {
        // 处理角色
        obj[USER_RELATION[key]] = item[key].split(' ')
      } else if (USER_RELATION[key] === 'openTime') {
        // 处理时间
        obj[USER_RELATION[key]] = formatDate(item[key])
      } else {
        obj[USER_RELATION[key]] = item[key]
      }
    })
    arr_.push(obj)
  })
  return arr_
}
</script>

<style lang="scss" scoped></style>
