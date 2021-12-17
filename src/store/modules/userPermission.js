// 公有路由 --- 私有路由
import { PublicRoutes, PrivateRouites } from '@/router/index.js'
export default {
  namespaced: true,
  state: {
    // 用户所有的路由表 public(公有) + priote（私有）
    routes: [...PublicRoutes]
  },
  mutations: {
    setPrivateRoutes: (state, newPrivateRoutes) => {
      state.routes = [...state.routes, ...newPrivateRoutes]
    }
  },
  actions: {
    filterPrivateRoutes: ({ commit }, menus) => {
      const routes_ = []
      // 过滤
      menus.forEach((name) => {
        routes_.push(...PrivateRouites.filter((route) => route.name === name))
      })
      // 如果匹配到不存在的路由 统一加载 /404
      routes_.push({ path: '/:pathMatch(.*)*', redirect: '/404' })
      commit('setPrivateRoutes', routes_)
      return routes_
    }
  }
}
