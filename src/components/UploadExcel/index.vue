<!-- 员工上传 -->
<template>
  <div class="upload-excel-container">
    <!-- 点击上传 -->
    <div class="btn-upload">
      <el-button type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
      <!-- 文件上传的隐藏域 accept 属性 用于接收什么类型的文件-->
      <input
        type="file"
        class="upload-excel-input"
        :accept="accept[type]"
        @change="handleChange"
        ref="tagUploadInput"
      />
    </div>
    <!-- 拖拽上传 -->
    <div
      class="drop"
      @drop.prevent.stop="onDrop"
      @dragenter.prevent.stop="onDragEnter"
      @dragover.prevent.stop="onDragEnter"
    >
      <!-- <i class="el-icon-upload"></i> -->
      <svg-icon iconName="upload" iconClass="upload-svg" />
      {{ $t('msg.uploadExcel.drop') }}
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { isExcel, isJs, readFileAsExcel } from '@/utils/xlsx.js'
import { useI18n } from 'vue-i18n'
// --------- 父组件传参
const props = defineProps({
  // 上传前调用的函数
  beforeUpload: {
    type: Function,
    required: true
  },
  onSuccess: Function // 上传完毕后调用的函数
})
const type = ref('')
// ------ 共用
const { type: typeFile, doUpload } = props.beforeUpload()
// 还要获取文件类型
if (typeFile) {
  type.value = typeFile
} else {
  // 没有文件类型
  ElMessage({
    type: 'error',
    message: '必须设定对应的文件'
  })
}

const accept = ref({ excel: '.xlsx,xls', js: '.js', txt: '.txt' })
// #region ------------------- input 上传业务
// 获取到input上传域
const tagUploadInput = ref(null)

// 点击上传
const handleUpload = (e) => {
  // 触发input点击，调用上传模式
  tagUploadInput.value.click()
}

// 选择了文件调用的方法
const handleChange = (e) => {
  // 获取到文件
  const files = e.target.files
  const rawFile = files[0]
  // 如果没有上传文件就停止
  if (!rawFile) return

  // 执行上传
  upload(rawFile)
  // 插件解析 excel 文件
}

// 父组件是否取消上传  -- 你传入的 beforeUpload 且 返回true 才执行
const upload = (rawFile) => {
  // 如果允许继续上传
  if (doUpload) {
    // 读取解析文件
    readFile(rawFile)
  } else {
    // 父组件取消了文件上传
    ElMessage({
      type: 'error',
      message: '取消文件读取操作'
    })
  }
}

// 读取解析文件
const readFile = (rawFile) => {
  // 1.创建读取对象
  const reader = new FileReader()
  // 2.读取完毕回调函数
  reader.onload = (event) => {
    // 2-1-1 获取读取后的文件内容 （excel 文件格式）
    const data = event.target.result
    // 按照不同的方式解析不同的文件
    if (type.value === 'excel') {
      const result = readFileAsExcel(data)
      // 2-2 解析完毕后调用 onSuccess方法 把数据传过去
      generateData(result)
    } else if (type.value === 'js') {
      // 解析其他类型组件。。。
      console.log('解析js文件')
    }
  }
  // props.onSuccess('解析完的文件')
  // 3.异步读取 --> 异步快慢不确定，所以先将回调监听事件先行加载
  reader.readAsArrayBuffer(rawFile)
}

// 通知父组件解析完毕
const generateData = (result) => {
  props.onSuccess(result)
  // 上传完成后一定要将 input 的 value清空一次，否则 change 事件不发生改变不会触发
  tagUploadInput.value.value = null
}
// #endregion

// #region ---------------- 拖拽上传业务
const i18n = useI18n()

// 当元素或选中的文本在可释放目标上被释放时触发
const onDrop = (e) => {
  // 获取文件的内容
  const files = e.dataTransfer.files
  // 如果没有文件便不执行
  if (files.length <= 0) {
    ElMessage({
      type: 'error',
      message: i18n.t('msg.excel.invalidDocument')
    })
    return false
  }
  const rawFile = files[0]
  if (!checkFileType(rawFile)) return false
  // 是否执行执行上传
  upload(rawFile)
}

// 验证文件类型（xlsx or js）
const checkFileType = (rawFile) => {
  if (type.value === 'excel') {
    // 如果文件类型不是 excel 也不执行
    if (!isExcel(rawFile)) {
      ElMessage({
        type: 'error',
        message: rawFile.name + ' : ' + i18n.t('msg.excel.noExcelFile') + '!'
      })
      return false
    } else {
      return true
    }
  } else if (type.value === 'js') {
    // 如果文件类型不是 js 也不执行
    if (!isJs(rawFile)) {
      ElMessage({
        type: 'error',
        message: rawFile.name + ' : ' + i18n.t('msg.excel.noJsFile') + '!'
      })
      return false
    } else {
      return true
    }
  }
}

// 当拖拽元素或选中的文本到一个可释放目标时触发
const onDragEnter = (e) => {
  // 在新位置生源项的副本
  e.dataTransfer.dropEffect = 'copy'
}
// #endregion
</script>

<style lang="scss" scoped>
.upload-excel-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .btn-upload,
  .drop {
    border: 1px dashed #ddd;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #ddd;
    :deep(.upload-svg) {
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }
  }
  .upload-excel-input {
    display: none;
    z-index: -1000;
  }
}
</style>
