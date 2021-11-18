// 这是用户数据的仓库

// 引入user的请求模块
import { login } from '@/api/user.js'
// 引入md5加密
import md5 from 'md5'
// 引入封装好的本地存储模块
import * as utils from '@/utils/storage.js'

// 引入common.js 它是一变量的形式访问数据
import { TOKEN } from '@/common/common.js'

const state = {
  token: utils.getItem(TOKEN) || ''
}
const getters = {}
const mutations = {
  setToken(state, token) {
    // 保存 vuex or 本地储存
    state.token = token
    utils.setItem(TOKEN, token)
  }
}
const actions = {
  login({ commit }, info) {
    // 获取到登陆的密码信息
    const { username, password } = info
    return new Promise((resolve, reject) => {
      login({ username, password: md5(password) })
        .then((res) => {
          // 保存 vuex
          commit('setToken', res.token)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export default {
  // 设置为局部
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
