// 这是主页一些逻辑仓库
import { setItem, getItem } from '@/utils/storage.js'
import { LANGUAGE } from '@/common/common.js'

const state = {
  sideBarOpened: true,
  language: getItem(LANGUAGE) || ''
}
const mutations = {
  // 侧边导航栏切换
  toggleSideBar(state) {
    state.sideBarOpened = !state.sideBarOpened
  },
  // i18n 国际化切换
  setLanguage(state, lang) {
    state.language = lang
    // 设置本地储存
    setItem(LANGUAGE, lang)
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
