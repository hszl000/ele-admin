// 这是token事件文件
import * as loacl from './storage.js'
import { TIME_STAMP, TIME_OUT } from '@/common/common.js'
// 设置token时间
export const setTimeStamp = () => {
  // 保存时间
  loacl.setItem(TIME_STAMP, Date.now())
}
// 获取保存token的时间
const getTimeStamp = () => {
  return loacl.getItem(TIME_STAMP)
}
// check 时间是否超时 true(不过期) or false(过期了)
export const isCheckTimeOut = () => {
  // 现在的时间 - 保存token的时间 > 两小时
  const currentTime = Date.now() // 现在的时间
  /* eslint-disable */
  const time_stamp = getTimeStamp() // 调用函数（获取时间）
  return currentTime - time_stamp <= TIME_OUT
  /* eslint-enable */
}
