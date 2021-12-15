<!-- 顶部导航组件 -->
<template>
  <div class="tags-view-container">
    <router-link
      v-for="(route, index) in store.getters.tagViewList"
      :key="route.fullPath"
      :to="{ path: route.fullPath }"
      class="tags-view-item"
      :style="{
        backgroundColor: isActive(route) ? store.getters.cssVar.menuBg : '',
        borderColor: isActive(route) ? store.getters.cssVar.menuBg : ''
      }"
      active-class="active"
      @contextmenu.prevent.stop="showContextMenu($event, index, route.path)"
    >
      {{ route.title }}
      <!-- 渲染删除 icon -->
      <svg-icon
        iconName="close"
        iconClass="el-icon-close"
        v-if="!isActive(route)"
        @click.prevent.stop="closeIndex(index)"
      />
    </router-link>

    <!-- 操作菜单 -->
    <ContextMenu
      v-if="isShowContextMenu"
      :style="styleObj"
      :index="selectIndex"
      @closeContextMenu="closeContextMenu"
    />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import ContextMenu from './components/ContextMenu.vue'
import router from '../../router'
const store = useStore()
const route = useRoute()

// 判断是否激活路由
const isActive = (tag) => {
  return route.path === tag.path
}

// 显示菜单标志
const isShowContextMenu = ref(false)
const styleObj = ref({
  left: 0,
  top: 0
})
// 获取鼠标右击时元素的下标
const selectIndex = ref(-1)
// 右击显示菜单
const showContextMenu = (e, i, path) => {
  isShowContextMenu.value = true
  styleObj.value.top = '90px'
  styleObj.value.left = e.x + 'px'
  router.push(path)
  selectIndex.value = i
}
// 关闭当前
const closeIndex = (i) => {
  selectIndex.value = i
  store.commit('tag/closeTag', { type: 'index', index: i })
}
// 关闭菜单
const closeContextMenu = () => {
  isShowContextMenu.value = false
}
// 监听菜单的打开（给body添加点击事件,用于关闭菜单）
watch(
  () => isShowContextMenu.value,
  (newValue) => {
    if (newValue) {
      document.body.addEventListener('click', closeContextMenu)
    } else {
      document.body.removeEventListener('click', closeContextMenu)
    }
  }
)
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    border-radius: 3px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 13px;
      height: 13px;
      vertical-align: middle;
      margin-top: -2px;
      margin-left: 3px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  a {
    text-decoration: none;
  }
}
</style>
