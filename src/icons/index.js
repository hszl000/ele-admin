// 加载所有的svg
import svgIcon from '@/icons/svgIcon.vue'
// 注册一个全局组件
export default function initSvgIcon(app) {
  app.component('svg-icon', svgIcon)
}
const file = require.context('@/icons/svg', false, /\.svg$/)
file.keys().map(file)
