<template>
  <!-- 包含子集菜单 -->
  <el-submenu :index="route.path" v-if="route.children.length > 0">
    <template #title>
      <menu-item
        :title="route.meta.title"
        :icon="route.meta.icon"
        :children="true"
      />
    </template>
    <!-- 递归组件 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    />
  </el-submenu>

  <!-- 没有子菜单 -->
  <el-menu-item :index="route.path" v-else>
    <menu-item
      :title="route.meta.title"
      :icon="route.meta.icon"
      :children="false"
    />
    <!-- 由于单个导航必须要有插槽，就将插槽写在这里 -->
    <template #title>{{ getTitle(route.meta.title) }}</template>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'
// 引入 i18n 封装title
import { getTitle } from '@/utils/i18n.js'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.el-menu-item {
  display: block;
}
</style>
