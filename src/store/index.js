import { createStore } from 'vuex'
// 引入用户模块
import user from './modules/user'
import getters from './modules/getters'
import app from './modules/app'
import theme from './modules/theme'
import tag from './modules/tag'
import roleAndPermission from './modules/role&permission'
export default createStore({
  getters,
  modules: { user, app, theme, tag, roleAndPermission }
})
