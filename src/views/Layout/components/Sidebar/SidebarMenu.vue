<template>
  <!-- 菜单 -->
  <el-menu
    :background-color="store.getters.cssVar.menuBg"
    :text-color="store.getters.cssVar.menuText"
    :default-active="activePath"
    :active-text-color="store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
    :collapse="!store.getters.sideBarOpen"
  >
    <!-- 一级二级菜单展示的组件 -->
    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 引入加工后的动态路由方法
import { filterRouter, generateMenus } from '@/utils/router.js'
// 引入导航组件
import SidebarItem from './SidebarItem.vue'
// 引入 store
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()
// 获取路由
// console.log(router.getRoutes(), 'getRoutes')

// 过滤去重
// console.log(filterRouter(router.getRoutes()), '过滤后')

// 格式化路由
// console.log(generateMenus(filterRouter(router.getRoutes())), '格式化后')

// 因为以后路由要变化，所以 通过 router.getRoutes() 获取动态的路由
// router.getRoutes() 有一个弊端，就是子路由重复出现在以及路由里，所以要对其进行加工
const routes = computed(() => {
  const filterRoutes = filterRouter(router.getRoutes())
  return generateMenus(filterRoutes)
})
// 默认选中的路由（以后的路由会变化）
const activePath = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped>
// 必须添加（否则侧边栏抖动）
:deep(.el-sub-menu__title) {
  display: block !important;
}
</style>
