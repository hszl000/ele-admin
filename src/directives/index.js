import print from 'vue3-print-nb'
// 页面按钮权限
import permission from './permission'

export default (app) => {
  app.use(print)
  app.directive('showPermission', permission)
}
