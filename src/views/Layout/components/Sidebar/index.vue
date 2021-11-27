<template>
  <div>
    <!-- logo -->
    <div class="logo-container">
      <el-avatar :src="Logo" shape="square" />
      <transition name="list">
        <h1 class="logo-title" v-if="store.getters.sideBarOpen">ele-admin</h1>
      </transition>
    </div>
    <!-- 滚动的组件 -->
    <el-scrollbar>
      <sidebar-menu class="border" />
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'
import Logo from '@/assets/logo.png'
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="scss" scoped>
.border {
  // 由于导航组件出现与父元素偏差1px 所以添加边框
  border: 0.5px solid transparent;
}
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  .logo-title {
    color: #fff;
    margin-left: 10px;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
  :deep(.el-avatar) {
    --el-avatar-background-color: none;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.28s linear;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: rotateY(90deg);
  }
}
</style>
