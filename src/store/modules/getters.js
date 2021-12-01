// 集中暴露vuex各个模块需要暴露的属性和方法
import variables from '@/styles/variables.scss'
import { generateColors } from '@/utils/theme.js'
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  cssVar: (state) => {
    return {
      ...variables,
      // 新生成的颜色覆盖旧的颜色
      ...generateColors(state.theme.myColor)
    }
  },
  // 侧边收缩依赖
  sideBarOpen: (state) => state.app.sideBarOpened,
  // 国际化语言切换依赖
  language: (state) => state.app.language,
  // 取色器颜色
  theme_color: (state) => state.theme.myColor,
  // 顶部导航数据
  tagViewList: (state) => state.tag.tagViewList
}
