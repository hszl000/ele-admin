import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 引入样式的入口文件
import './styles/index.scss'

// 注册加载svg的处理
import initSvgIcon from '@/icons/index.js'

// 用户鉴权
import './permission.js'
const app = createApp(App)
installElementPlus(app)
initSvgIcon(app)
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
