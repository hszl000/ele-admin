<template>
  <div>
    <el-card>
      <el-input placeholder="请输入文章标题" v-model="input"></el-input>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="markdown" name="first">
          <div ref="$editor"></div>
        </el-tab-pane>
        <el-tab-pane label="富文本" name="second">
          <div ref="$div"></div>
          <textarea
            v-show="false"
            ref="$text"
            style="width: 100%; height: 200px"
          ></textarea>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click="confirm">提交</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from 'vue'
// 创建文章 --- 获取文章详情 --- 修改文章详情
import { createArticle, getArticleDetails, editArticle } from '@/api/article.js'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
// md or 富文本
import { $editor, mdAndEditor, mdAndEditorFn } from './Hooks/markdown'
// 富文本
import { $div, $text, editorFn, editor } from './Hooks/wangEditor'
const props = defineProps({
  id: {
    type: String
  }
})

const router = useRouter()
// tab切换
const activeName = ref('first')
// 收集标题名称数据
const input = ref('')
// tab切换的标志
const thisLabel = ref('')
const handleClick = (tab, event) => {
  thisLabel.value = tab.props.label
}

// 页面挂载完成后再加载 富文本编辑器
onMounted(() => {
  // md and 富文本
  mdAndEditorFn()
  // 富文本
  editorFn()
})

// 提交按钮
const confirm = async () => {
  // 两种情况 --- 两个编辑器提交的内容问题
  const title = input.value || '无标题'
  let content
  if (thisLabel.value === '富文本') {
    content = $text.value.value
  } else {
    content = mdAndEditor.getHTML()
  }
  // 数据包装
  // 请求接口进行发布
  if (props.id !== ':id') {
    // 修改文章
    await editArticle({
      id: props.id,
      title,
      content
    })
    // 发布成功提示
    ElMessage.success('文章修改成功成功！')
  } else {
    // 创建文章
    await createArticle({
      title,
      content
    })
    // 发布成功提示
    ElMessage.success('文章发布成功！')
  }
  // 跳转文章排名页
  router.push('/article/ranking')
  // 清空 md 输入框的数据
  mdAndEditor.setHTML('')
  // 清空 富文本 输入框的内容
  editor.txt.clear()
  // 清空标题框
}

watch(
  () => props.id,
  async (newVal) => {
    if (newVal !== ':id') {
      const res = await getArticleDetails(props.id)
      // 将请求到的数据展示到修改文章里
      // 富文本
      input.value = res.title
      editor.txt.html(res.content)
      // md or 富文本
      mdAndEditor.setHTML(res.content)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
