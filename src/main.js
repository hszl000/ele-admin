import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 引入样式的入口文件
import './styles/index.scss'

// 注册加载svg的处理
import initSvgIcon from '@/icons/index.js'

// 用户鉴权 (路由守卫)
import './permission.js'
const app = createApp(App)
installElementPlus(app) // 安装使用element函数
initSvgIcon(app) // svg 函数
app.use(store).use(router).mount('#app')

// 入口 main.jx --> webpack（导入模块：js模块）   出口 /js/app.js 文件

// 【css、文件、字体、svg】--> loader --> 对应的js模块 --> webpack

// 不需要配置，直接使用，因为项目环境已经直接配置了 常见loader

/**
 * svg 导入后
 * 1.它是由 file-loader 变成一个 /img/look.a9c8cab5.svg js模块
 * 2.可以按照img的方式加载
 *    缺点：fil-loader 转化的js模块不能动态修改一个图片的颜色
 *      不利于封装一个全局组件
 */

// 查看webpack 的默认配置 ？？
/**
 * vue inspect 查看默认的webpack配置
 * vue inspect --rules 查看所有的loader配置
 * vue inspect --rule svg
 *
 * 如何配置webpack
 *    1.在项目根目录创建 vue.config.js
 *
 *    2.修改webpack的配置
 *        a).禁用 file-loader 对某个目录下svg的解析
 *        b).下载 loader
 *            npm i -D svg-sprite-loader  // -D 保存在devlopment 依赖中
 *
 *    3.
 */

/*
  用户鉴权：
      当用户未登录时，只能进入login 页面
      用户登录后，token 未过期之前，不允许进入login页面
*/

/*
  退出业务：
    1.token 的作用
        a) token 是由后台再首次登录的时候生成，通过response 响应给前端
          意思是说一个token 同时在前后端都有保存
        b) token 表示用户的身份，是一个用户的令牌，对于服务器而言，只认token不认人
          意思说别人获取到你的token 以你的身份就能登陆服务器，获取你的敏感数据
          所以出于安全角度，需要对token进行一些安全策略
            创建的处理方式：
              动态 token
              时效 token（使用）
              刷新 token
              ......
    2.常见的退出方式：
      主动退出：用户手动点击退出按钮，执行退出登录
      被动退出：
        token 失效：（超出了token的有效期，失去了服务器对用户校验身份的条件）
            1.前端获取的token过期（前端处理）
            2.后端生成的token过期（后端处理）
        单点登录：               （后端处理）
            在你已经登陆的情况下，你或者是别人在别的设备上再次登录。
            你当前的登录会被顶下来
    总结：
      1.前端只能处理主动退出和 前端token失效
        也是要你执行前端的退出操作
      2.如果是后端token失效 和 单点登录
        以特定的状态码来通知前端
        code 401 后端token失效
        code 405 单点登录
        也是要你执行前端的退出操作

    3.退出登陆的逻辑
      1.清理掉用户的缓存数据
      2.清理用户的权限
      3.返回到登录页面

    4.主动退出(前端)

    5.token失效（前端）
        1.用户登录得到token 的时候记录时间
        2.指定token生效时间 2小时
        3.再调用接口的时候 需要带token ,需要判断这个token是否在有效期内

    6.token 失效（后端）和 单点登录
      后台会返回特定的状态码 -- 执行退出
*/
