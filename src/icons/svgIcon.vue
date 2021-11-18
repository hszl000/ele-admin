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
    return 'defaultSvgClass ' + props.iconClass
  } else {
    return 'defaultSvgClass'
  }
})
</script>
<style lang="scss" scoped>
.defaultSvgClass {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15rm;
  overflow: hidden;
}
</style>
