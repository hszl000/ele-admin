import i18n from '@/i18n/index.js'
/**
 * 1.去除重复的二级路由，保持一二级路由的层级关系
 */
// commonjs 引入path
const path = require('path')

// 获取所有的二级路由
const getChildrenRouters = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      // 当前的route是一级路由 包含子路由
      result.push(...route.children)
    }
  })
  return result
}
// 去除重复的二级路由
export const filterRouter = (routes) => {
  // 获取所有的二级路由
  const childrenRouters = getChildrenRouters(routes)
  return routes.filter((router) => {
    // 只要在 childrenRouters 出现的就是重复的二级路由
    // 过滤出重复出现的二级子路由
    return !childrenRouters.find((childrenRoute) => {
      return childrenRoute.path === router.path
    })
  })
}

/**
 * 2.将routes (filterRouter后的)为了配合v-for遍历生成菜单，需要格式化数据
 */

/**
 * 判断数据是否为空值
 */
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

/*
  3.配合 fuse.js 处理路由数据源 满足 fuse.js 的搜索方式
  @param routes 是filter 过滤去重后的路由
*/
export const generateFuse = (routes, titles = []) => {
  let res = []
  // 遍历 routes
  for (const route of routes) {
    // 生成理想的数据格式
    const data = {
      path: route.path,
      title: [...titles] // 不迭代的话这里是一个空 title,如果迭代 这里就是以后的一级标题的 title
      // 第一次 title在这里是空的
    }
    // 条件 1.具有 meta && meta.title 2.过滤掉动态路由
    const reg = /.\/:.*/ // 正则 判断当前 path 中是否是动态路由
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      // 把生成好的数据里的 title 添加本条数据的title
      // 执行国际化
      const title = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, title]
      // 第一次 ...data.title是空的 经过 放入本条数据后就有了
      // 把数据放到 res 当中
      res.push(data)
    }

    // 如果本条数据有 子路由 让子路由继续走上边的流程
    if (route.children && route.children.length > 0) {
      const subRes = generateFuse(route.children, data.title)
      // 返回后的子路由
      if (subRes.length > 0) {
        // 放入和父级平级的 res里
        res = [...res, ...subRes]
      }
    }
  }
  // 此时的 res 就是父子同级的理想数据
  return res
}
