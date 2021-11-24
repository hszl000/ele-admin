<template>
  <svg aria-hidden="true" :class="svgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    require: true
  },
  iconClass: {
    type: String
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
const svgClass = computed(() => {
  if (props.iconClass) {
    // 如果传了iconClass 就加上
    return 'defaultSvgClass ' + props.iconClass
  } else {
    // 否则就显示默认的
    return 'defaultSvgClass'
  }
})
</script>
<style lang="scss" scoped>
.defaultSvgClass {
  width: 1.2rem;
  height: 1.2rem;
  // vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
