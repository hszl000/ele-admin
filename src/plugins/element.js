import ElementPlus from 'element-plus'
import '@/styles/element-plus/index.css' // 后来引入的
import 'element-plus/lib/theme-chalk/index.css' // 自带的
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import store from '@/store/index.js'
export default (app) => {
  // app.use 使用一个插件 app.components()注册一个全局组件
  app.use(ElementPlus, {
    locale: store.getters.language === 'zh' ? zhCn : en
  })
}
