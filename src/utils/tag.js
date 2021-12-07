// 这里指的是路由黑名单 (不能展示在tag里面的路由)
const isNoTagArr = ['/login', '/404', '/401', '/import']
// 检测当前路由是否存在黑名单中
export const isNoTag = (path) => {
  return isNoTagArr.includes(path)
}
