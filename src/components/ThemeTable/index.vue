<!-- 封装的 table -->
<template>
  <div>
    <slot :headerStyleObj="headerStyleObj" />
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
import { useStore } from 'vuex'
// 引入封装好的 watch 语言切换监听
import { watchLang } from '@/utils/i18n.js'

const store = useStore()
// css变量
// 表头样式
const headerStyleObj = ref({
  background: store.getters.cssVar['light-2'],
  color: '#eee',
  fontWeight: 800
})
// (修改二级菜单的背景)
const childrenBgColor = ref(store.getters.cssVar['light-5'])
// 修该 hover 状态的背景
const hoverBgColor = ref(store.getters.cssVar['light-8'])
// 小圆点移入背景色
const badgeColorHover = ref(store.getters.cssVar['light-3'])
// 文章排名拖拽样式
const ghost = ref(store.getters.cssVar['light-9'])

// 监听 css 的变化
watch(
  () => store.getters.cssVar,
  () => {
    childrenBgColor.value = store.getters.cssVar['light-5']
    hoverBgColor.value = store.getters.cssVar['light-8']
    headerStyleObj.value.background = store.getters.cssVar['light-2']
    badgeColorHover.value = store.getters.cssVar['light-3']
    ghost.value = store.getters.cssVar['light-4']
  }
)

// 公共业务
// 1. 当语言切换的时候 重新调用表格数据初始化
const props = defineProps({
  cbs: {
    type: Array,
    // 自定义 props 校验规则
    validator: (cbs) => {
      // cbs 必须是一个数组
      if (Array.isArray(cbs)) {
        // 数组中的每个单元必须是一个函数
        cbs.every((item) => typeof item === 'function')
      } else {
        throw new Error('验证失败，不符合规范')
      }
    }
  }
})

//  把语言切换后要执行的方法传递进去 内部帮你执行
watchLang(...props.cbs)
</script>

<style lang="scss" scoped>
:deep(.el-table__row--level-1 > td) {
  background: v-bind(childrenBgColor);
}
:deep(.el-table__body tr:hover > td) {
  background: v-bind(hoverBgColor) !important;
  transition: all 0.28 ease;
}
:deep(.el-badge__content.is-fixed) {
  top: 13px;

  &:hover {
    background: v-bind(badgeColorHover);
  }
}

:deep(.ghost) {
  background: v-bind(ghost);
}
</style>
