<template>
  <div class="article-detail-container">
    <!-- 标题 -->
    <h2 class="title">{{ thisArticle.title }}</h2>
    <div class="header">
      <!-- 作者 -->
      <span class="author">{{
        `${$t('msg.article.author')}  :  ${thisArticle.author}`
      }}</span>
      <!-- 发布时间 -->
      <span class="time">{{
        `${$t('msg.article.publicDate')} : ${$filters.relativeTime(
          thisArticle.publicDate
        )}`
      }}</span>
      <!-- 编辑按钮 -->
      <el-button type="text" class="edit" @click="editArticle">{{
        $t('msg.article.edit')
      }}</el-button>
    </div>
    <!-- 内容 -->
    <div class="content" v-html="thisArticle.content"></div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, onActivated } from 'vue'
// 请求当前文章
import { getArticleDetails } from '@/api/article.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 查看文章详情
const thisArticle = ref([])
const getArticle = async () => {
  const res = await getArticleDetails(props.id)
  thisArticle.value = res
}
getArticle()

// 编辑文章操作
const editArticle = () => {
  // 跳转到编辑页面 (创建文章页)
  router.push('/article/create/' + props.id)
}
// 检测 id 的变化重新请求
watch(
  () => props.id,
  () => {
    getArticle()
  }
)

// 由于keep-alive的缘由 每次进入页面有缓存，导致数据是旧的
onActivated(getArticle)
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #556665;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #4d4d4d;
  }
}
</style>
