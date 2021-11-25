// 集中暴露vuex各个模块需要暴露的属性和方法
import variables from '@/styles/variables.scss'
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  cssVar: (state) => variables,
  // 侧边收缩依赖
  sideBarOpen: (state) => state.app.sideBarOpened,
  // 国际化语言切换依赖
  language: (state) => state.app.language
}
