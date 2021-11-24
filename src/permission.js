// 用户鉴权  全局路由守卫
import router from '@/router/index.js'
import store from './store/index.js'
// 路由白名单
const whiteRouter = ['/login']
// 进入每个路由都会执行 这个钩子
router.beforeEach(async (to, form, next) => {
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
        // setTimeout(async () => {
        //   await store.dispatch('user/getUserInfo')
        //   next()
        // }, 70000)
        await store.dispatch('user/getUserInfo')
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
