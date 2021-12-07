// 时间格式化文件
import dayjs from 'dayjs'
import i18n from '@/i18n/index.js'
const reg =
  /((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)/
export default (value, format = 'YYYY-MM-DD') => {
  // dayjs转化成标准时间格式
  if (!isNaN(value)) {
    // 把字符串转换成number类型
    const val = parseInt(value)
    return dayjs(val).format(format)
  } else if (reg.test(value)) {
    return value
  } else {
    return i18n.global.t('msg.excel.nodateFormate')
  }
}
