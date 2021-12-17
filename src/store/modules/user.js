// 这是用户数据的仓库

// 引入user的请求模块
import { login, getUserInfo } from '@/api/user.js'
// 引入md5加密
import md5 from 'md5'
// 引入封装好的本地存储模块
import * as utils from '@/utils/storage.js'

// 引入common.js 它是一变量的形式访问数据
import { TOKEN, USER_INFO } from '@/common/common.js'
// 引入路由
import router, { clearPrivateRoutes } from '@/router/index.js'
// 引入token过期时间函数
import { setTimeStamp } from '@/utils/auth.js'
const state = {
  token: utils.getItem(TOKEN) || '',
  // userInfo: utils.getItem(USER_INFO) || {}
  userInfo: {}
}
const getters = {}
const mutations = {
  // 设置token
  setToken(state, token) {
    // 保存 vuex or 本地储存
    state.token = token
    // 保存本地储存中
    utils.setItem(TOKEN, token)
  },
  // 设置用户数据
  setUserInfo(state, userInfo) {
    // 保存 vuex or 本地储存
    state.userInfo = userInfo
    // 保存本地储存中
    utils.setItem(USER_INFO, userInfo)
  }
}
const actions = {
  // 登录
  login({ commit }, info) {
    // 获取到登陆的密码信息
    const { username, password } = info // 解构登陆参数
    return new Promise((resolve, reject) => {
      // 返回promise
      login({ username, password: md5(password) }) // 发送请求（封装好的user模块请求），把数据用md5加密
        .then((res) => {
          // 成功执行
          // 保存 vuex 和 本地存储
          commit('setToken', res.token)
          // 设置token的获取时间
          setTimeStamp() // 设置登录时token时间
          resolve()
        })
        .catch((err) => {
          // 失败执行
          reject(err)
        })
    })
  },
  // 退出登录
  logout(context) {
    // 退出清除动态添加的路由规则
    clearPrivateRoutes()
    // 清理用户数据
    context.commit('setToken', '')
    context.commit('setUserInfo', {})

    // 退出登录时清除本地数据（角色 or 权限）
    context.dispatch('roleAndPermission/clearRoleAndPermission', null, {
      root: true
    })
    // 跳转到登录页面
    router.push('/login')
  },
  // 请求用户数据
  async getUserInfo({ commit }) {
    // 发送axios
    const res = await getUserInfo()
    console.log('请求用户数据')
    commit('setUserInfo', res)
    return res
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
