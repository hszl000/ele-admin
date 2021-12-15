<!-- 封装的全屏切换组件 -->
<template>
  <div>
    <svg-icon
      :iconName="isScreenFull ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggleScreenFull"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 引入全屏切换(插件)
import screenfull from 'screenfull'
// 图标切换标志
const isScreenFull = ref(false)
// 图标切换函数
const toggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value
  // 使用 screenfull 插件来完成全屏的切换
  screenfull.toggle() // 默认将 body 切换全屏
}
</script>

<style lang="scss" scoped></style>
