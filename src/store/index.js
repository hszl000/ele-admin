import { createStore } from 'vuex'
// 引入用户模块
import user from './modules/user'
import getters from './modules/getters'
import app from './modules/app'
export default createStore({
  getters,
  modules: { user, app }
})
