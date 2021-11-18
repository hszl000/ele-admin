// node 加载的 commonjs
// 导出一个配置对象 作为webpack的配置
const path = require('path') // 导入node 一个默认模块  解析目录相关的

function getPath(src) {
  // __dirname //当前文件的绝对路径
  return path.join(__dirname, src)
}

module.exports = {
  // 配置svg-sprite-loader 解析指定目录
  chainWebpack(config) {
    // config 就是webpack 默认配置对象
    // 1.获取webpack 对 svg 的解析的loader
    config.module
      .rule('svg')
      // 2.禁用loader 对 svg 的解析
      .exclude.add(getPath('src/icons/svg')) // exclude 除了哪个目录
      .end()
    // 3.配置新的loader 对svg的解析
    // 新增一个名字叫 icons 的 rule规则
    config.module
      .rule('icons') // 新政一个名字叫icons的rule规则
      .test(/\.svg$/) // 解析什么文件
      // loader 解析的目录
      .include.add(getPath('src/icons/svg')) // 处理哪个目录下
      .end() // 返回上一层

      // 使用什么 loader 解析匹配的文件
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  // 配置代理服务器
  devServer: {
    proxy: {
      // 只代理以api开头的网络请求
      '/api': {
        // 代理目网址
        target: 'https://api.imooc-admin.lgdsunday.club',
        // 是否开启代理
        changeOrigin: true
        // 重写url方式 -- 这里没有启用：原因是后端服务器已经配置加入了api
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}
