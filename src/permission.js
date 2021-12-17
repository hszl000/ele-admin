// 用户鉴权  全局路由守卫
import router from '@/router/index.js'
import store from './store/index.js'
// 路由白名单
const whiteRouter = ['/login']

// 进入每个路由都会执行 这个钩子
router.beforeEach(async (to, form, next) => {
  // if (to.matched.length === 0) {
  //   next('/404')
  // }
  /*
    用户鉴权：
      当用户未登录时（没有token），只能进入login 页面
      用户登录后，token 未过期之前，不允许进入login页面
  */
  //  登录
  if (store.getters.token) {
    if (to.path === '/login') {
      // 不允许进入登录页
      next('/')
    } else {
      // 登陆成功 跳转到首页
      if (!store.getters.hasUserInfo) {
        // 判断是否由用户数据
        // 判断没有用户的信息 就去发送axios
        const res = await store.dispatch('user/getUserInfo')

        /**
         * 1.获取该用户的所有权限 然后动态添加路由到路由表中
         * 2.根据权限对比私有路由 获取用户能访问的路由
         * 3.将获取过滤后的该用户的私有路由 动态添加到路由表中
         */
        // 执行动态路由添加
        const {
          permission: { menus }
        } = res
        // 把该用户权限传递到 actions 中进行加工保存
        const filterRoutes = await store.dispatch(
          'userPermission/filterPrivateRoutes',
          menus
        )
        // 将返回的路由添加到路由表中
        filterRoutes.forEach((activeRoute) => {
          router.addRoute(activeRoute)
        })
        next(to.path)
      }
      next()
    }
    // 未登录
  } else {
    if (whiteRouter.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
