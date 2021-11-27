<template>
  <div class="navbar">
    <!-- 左侧收缩标志 -->
    <cuttle class="cuttle_container" />
    <!-- 动态面包屑 -->
    <breadcrumb class="breadcrumb-container" />
    <!-- 右侧 -->
    <div class="right-menu">
      <!-- 模糊搜索组件 -->
      <search class="rigth-menu-item search_" />
      <!-- 全屏切换组件 -->
      <screen-full class="rigth-menu-item" />
      <!-- 主题换肤组件 -->
      <theme class="rigth-menu-item" />
      <!-- 国际化按钮 -->
      <select-lang class="rigth-menu-item" />
      <el-dropdown class="avatar-containe">
        <!-- 头像 -->
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="50" :src="avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-drop-down">
            <el-dropdown-item @click="routerHome">{{
              $t('msg.navBar.home')
            }}</el-dropdown-item>
            <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            <el-dropdown-item divided @click="logout">{{
              $t('msg.navBar.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
// import avatar from '@/assets/logo.png'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Cuttle from '@/components/Cuttle/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
// 引入封装好的 国际化组件
import SelectLang from '@/components/SelectLang/index.vue'
// 引入主题换肤
import Theme from '@/components/Theme/index.vue'
// 全屏切换组件
import ScreenFull from '@/components/ScreenFull/index.vue'
// 模糊搜索组件
import Search from '@/components/Search/index.vue'
const store = useStore()
const router = useRouter()
// 主动退出
const logout = () => {
  store.dispatch('user/logout')
}
// 用户头像
const avatar = computed(() => {
  return store.state.user.userInfo.avatar
})
// 跳转首页
const routerHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    .avatar-containe {
      cursor: pointer;
      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        :deep(.el-avatar) {
          --el-avatar-background-color: none;
          margin-right: 10px;
        }
      }
    }
    :deep(.rigth-menu-item) {
      transition: background 0.28s;
      font-size: 24px;
      vertical-align: text-bottom;
      padding: 15px;
      color: #606266; // 设置图标颜色
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .search_ {
      padding: 0; // 由于子集已经设置过padding 说一将这里的padding设置为0
      margin-top: -4px; // 与理想效果偏差 4px
      padding-right: 5px;
    }
  }
  .cuttle_container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.28s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    height: 50px;
    line-height: 50px;
  }
}
</style>
