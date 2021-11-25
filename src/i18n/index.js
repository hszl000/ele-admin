// i18n 国际化
// import { createI18n } from 'vue-i18n' // 这种能用但是报⚠
import { createI18n } from 'vue-i18n/index'
import zh from './lang/zh' // 中文包
import en from './lang/en' // 英文包
import store from '@/store/index.js'

// 1.定义数据源
const messages = {
  en: {
    msg: {
      ...en
    }
  },
  zh: {
    msg: {
      ...zh
    }
  }
}
console.log(store)
// 2.定义语言的类型
const locale = store.getters.language || 'en'

// 3.初始化 i18n
const i18n = createI18n({
  legacy: false, // 配合vue3.2 composition 组合API
  globalInjection: true, // 全局注册一个 t 函数 t()
  locale,
  messages
})
export default i18n
