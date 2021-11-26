<template>
  <div
    class="app-wrapper"
    :class="store.getters.sideBarOpen ? '' : 'hideSidebar'"
  >
    <!-- 左边 -->
    <side-bar
      id="guide-sidebar"
      class="siderbar-container"
      :style="{ backgroundColor: store.getters.cssVar.menuBg }"
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

import { useStore } from 'vuex'
const store = useStore()
</script>
<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .siderbar-container {
    width: $sideBarWidth;
    height: 100vh;
    float: left;
    overflow: hidden; // 侧边栏超出出现了滚动条
    transition: width 0.28s;
  }
  .main-container {
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10;
      width: calc(100% - #{$sideBarWidth}); // 用来动态计算宽度的
      transition: width 0.28s;
    }
  }
}
.hideSidebar {
  .siderbar-container {
    width: #{$sideBarhideWidth};
  }
  .fixed-header {
    width: calc(100% - #{$sideBarhideWidth}) !important; // 用来动态计算宽度的
  }
}
</style>
