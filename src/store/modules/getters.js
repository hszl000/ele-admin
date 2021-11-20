// 集中暴露vuex各个模块需要暴露的属性和方法
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}'
}
