// 这是主页一些逻辑仓库
const state = {
  sideBarOpened: true
}
const mutations = {
  toggleSideBar(state) {
    state.sideBarOpened = !state.sideBarOpened
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
