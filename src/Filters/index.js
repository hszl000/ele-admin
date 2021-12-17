// 时间格式化
import dateFilter from './dateFilter'
// 相对时间格式化
import relativeTime from './relativeTime'

// 所有全局属性都可以在此集成
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
