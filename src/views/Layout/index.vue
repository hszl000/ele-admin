<template>
  <div class="app-wrapper">
    <!-- 左边 -->
    <side-bar
      class="siderbar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />
    <!-- 右边 -->
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script setup>
import SideBar from './components/Sidebar/index.vue'
import NavBar from './components/Navbar/index.vue'
import AppMain from './components/Appmain/index.vue'

// 引入scss变量样式 在js中使用

import variables from '@/styles/variables.scss'
</script>
<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  // display: flex;
  .siderbar-container {
    width: $sideBarWidth;
    height: 100vh;
    float: left;
  }

  .main-container {
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10;
      width: calc(100% - #{$sideBarWidth}); // 用来动态计算宽度的
    }
  }
}
</style>
