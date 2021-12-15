<!-- 面包屑组件 -->
<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="list" tag="p">
      <el-breadcrumb-item
        v-for="(route, index) in breadcrumbData"
        :key="route.path"
        class="no-redirect"
      >
        <!-- 判断最后一项不能点 -->
        <span v-if="index === breadcrumbData.length - 1">{{
          getTitle(route.meta.title)
        }}</span>
        <a v-else @click="onLinkClick(route.path)">{{
          getTitle(route.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
// 监听路由变化
import { useRoute, useRouter } from 'vue-router'
import { watch, ref } from 'vue'
// 引入 i18n 封装title
import { getTitle } from '@/utils/i18n.js'
// 获取当前的路由
const route = useRoute()
const router = useRouter()

const breadcrumbData = ref([])
watch(
  route,
  () => {
    breadcrumbData.value = route.matched.filter((item) => {
      return item.meta && item.meta.title
    })
  },
  { immediate: true }
)
// 点击跳转
const onLinkClick = (path) => {
  router.push({ path })
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  margin-left: 8px;
  // .no-redirect {
  // }
  .redirect {
    font-weight: 600;
    color: #666;
    cursor: pointer;
  }
}
</style>
