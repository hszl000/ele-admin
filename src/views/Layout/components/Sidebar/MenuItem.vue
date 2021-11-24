<template>
  <!-- 展示element图标 -->
  <i :class="icon" v-if="icon.includes('el-icon')"></i>
  <!-- 展示自定义图标 -->
  <svg-icon :iconName="icon" iconClass="icons" v-else />
  <span v-if="children">{{ title }}</span>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  children: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.icons {
  margin-right: 10px;
  margin-left: -3px;
}
// .el-icon {
//   width: 1rem;
//   height: 1rem;
// }
</style>
