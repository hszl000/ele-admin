// 引入utils下request 封装好的axios
import axios from '@/utils/request.js'
// 定义user相关的请求
export const login = (data) => {
  // axios的请求(这里使用axios中的request)
  // axios本身是promise
  return axios.request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
