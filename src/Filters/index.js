// 时间格式化
import dateFilter from './dateFilter'

// 所有全局属性都可以在此集成
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
