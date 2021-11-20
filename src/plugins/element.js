import ElementPlus from 'element-plus'
import '@/styles/element-plus/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app) => {
  // app.use 使用一个插件 app.components()注册一个全局组件
  app.use(ElementPlus, { locale })
}
