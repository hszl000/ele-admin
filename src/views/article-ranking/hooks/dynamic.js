import { ref, watch } from 'vue'
import { watchLang } from '@/utils/i18n.js'

// 所有的列数据 由于 inport 是静态导入
// 如果想让数据是响应式就在导出的时候导出一个函数，在需要的时候调用函数，就能拿到新的数据了
import getDynamicData from './dynamicData'
export const dynamicData = ref(getDynamicData())

// 默认 checkbox 动态选择的列数据
export const selectDynamicLabel = ref([])

// 初始化选中的 checkbox 框
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// 表格的所有列数据
export const tableLabels = ref([])

// 当语言切换的时候 数据也要被切换
watchLang(() => {
  dynamicData.value = getDynamicData()
  initSelectDynamicLabel()
})

// 监听选择展示的列
watch(
  selectDynamicLabel,
  (val) => {
    tableLabels.value = dynamicData.value.filter((item) =>
      val.includes(item.label)
    )
  },
  { immediate: true }
)
