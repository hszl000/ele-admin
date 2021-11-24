<template>
  <div class="navbar">
    <!-- 左侧收缩标志 -->
    <cuttle class="cuttle_container" />
    <!-- 动态面包屑 -->
    <breadcrumb class="breadcrumb-container" />
    <!-- 右侧 -->
    <div class="right-menu">
      <el-dropdown class="avatar-containe">
        <!-- 头像 -->
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="50" :src="avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-drop-down">
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item disabled>课程主页</el-dropdown-item>
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
            >
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
import Cuttle from '@/components/Cuttle/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
const store = useStore()
// 主动退出
const logout = () => {
  store.dispatch('user/logout')
}
// 用户头像
const avatar = computed(() => {
  return store.state.user.userInfo.avatar
})
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
