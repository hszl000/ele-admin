// 引入axios
import axios from 'axios'
// 引入element ElMessage 弹框
import { ElMessage } from 'element-plus'
// 引入store对象 -- 与组件中导入不同
import store from '@/store/index.js'
// 引入token时间是否超时
import { isCheckTimeOut } from './auth.js'
// 封装token
const server = axios.create({
  // 后台代理 cros
  timeout: 5000, // 请求延时时间（超过时间就报错）
  baseURL: '/api' // vue.config.js 已配置代理
})

// 请求拦截 封装token
server.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (!isCheckTimeOut()) {
        // 过期 执行退出
        store.dispatch('user/logout')
        // 不能请求了
        return Promise.reject(new Error('token过期，请重新登录'))
      }
      // 携带语言的参数
      if (store.getters.language) {
        // Accept-Lanuage
        config.headers['Accept-Language'] = store.getters.language
      }
      // 如果存在token 不存在 不封装
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 错误的处理服务器返回错误，消息提醒（响应拦截）
server.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么   对的数据 or 错的数据
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      ElMessage({
        type: 'error',
        message
      })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 后端token失效 code=401 单点登录 后台会返回特定的状态码 -- 执行退出
    const { message, response } = error // 解构 error 对象
    if (response && response.data && response.data.code === 401) {
      // 过期 执行退出
      store.dispatch('user/logout')
    }

    // 浏览器没有返回数据或服务器未知错误
    ElMessage({
      type: 'error',
      message
    })
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 封装好的token

// 导出一个对象
export default server
