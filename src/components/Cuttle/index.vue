<!-- 侧边导航伸缩切换组件 -->
<template>
  <div class="cuttle_container" @click="toggleSideBar">
    <svg-icon :iconName="getIcon" iconClass="cuttle" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
// 引入vuex
import { useStore } from 'vuex'

const store = useStore()
// 显示图标
const getIcon = computed(() => {
  return store.getters.sideBarOpen ? 'cuttle_open' : 'cuttle_close'
})
// 切换图标
const toggleSideBar = () => {
  store.commit('app/toggleSideBar')
}
</script>

<style lang="scss" scoped>
.cuttle_container {
  padding: 0 16px;
  .cuttle {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
