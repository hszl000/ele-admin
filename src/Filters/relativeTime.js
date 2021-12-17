// 时间格式化
import dayjs from 'dayjs'
// 相对时间插件
import rt from 'dayjs/plugin/relativeTime'
// 使用中文语言包（dayjs默认语言是英文，所以要引入中文包）
import 'dayjs/locale/zh-cn'
import i18n from '@/i18n/index.js'
import store from '@/store/index.js'
// dayjs使用插件
dayjs.extend(rt)

export default (val) => {
  if (!isNaN(parseInt(val))) {
    return dayjs()
      .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
      .to(dayjs(parseInt(val)))
  } else {
    return i18n.global.t('msg.excel.nodateFormate')
  }
}
