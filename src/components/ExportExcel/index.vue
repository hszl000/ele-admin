<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="dialogShow"
    @close="close"
    width="30%"
  >
    <el-input
      :model-value="fileName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <slot></slot>
    <template #footer>
      <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
      <el-button type="primary" @click="exportExcel">{{
        $t('msg.excel.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { exportJsonToExcel } from '@/utils/Export2Excel.js'
import { ElMessage } from 'element-plus'
// 父组件传的参数
const props = defineProps({
  dialogShow: {
    type: Boolean,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  header: {
    type: Array,
    require: true
  },
  message: {
    type: String,
    default: '下载成功！'
  }
})

// 自定义事件
const emit = defineEmits(['closeDialog'])

// 触发父组件close事件
const close = () => {
  emit('closeDialog')
}

// 导出业务执行
const exportExcel = () => {
  // 1.默认文件名 fileName (中英文切换)
  // 2.导出全部数据 or 导出当前页数据 ---> exportData
  // 3.利用工具 将 服务器返回的用户数据 --》 转换成 excel 的数据
  // 4.解析 excel 数据 并且下载该文件
  exportJsonToExcel({
    header: props.header,
    data: props.data,
    filename: props.fileName,
    merges: true,
    autoWidth: true,
    bookType: 'xlsx'
  }).then((res) => {
    // 6.提示消息
    ElMessage.success(props.message)
  })
  // 5.关闭dialog
  close()
}
</script>

<style lang="scss" scoped></style>
