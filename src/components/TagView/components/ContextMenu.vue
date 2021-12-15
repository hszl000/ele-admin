<!-- 顶部导航组件的菜单 -->
<template>
  <ul class="context-menu-container">
    <li @click="refresh">{{ $t('msg.tagsView.refresh') }}</li>
    <li @click="closeRight">{{ $t('msg.tagsView.closeRight') }}</li>
    <li @click="closeOther">{{ $t('msg.tagsView.closeOther') }}</li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { defineProps, defineEmits } from 'vue'
const router = useRouter()
const store = useStore()
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['closeContextMenu'])
// 点击刷新
const refresh = () => {
  router.go(0)
  // 关闭
  emits('closeContextMenu')
}
// 关闭右侧
const closeRight = () => {
  store.commit('tag/closeTag', { type: 'right', index: props.index })
  // 关闭
  emits('closeContextMenu')
}
// 关闭其他
const closeOther = () => {
  store.commit('tag/closeTag', { type: 'other', index: props.index })
  // 关闭
  emits('closeContextMenu')
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 1000;
  list-style: none;
  padding: 5px 0px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
