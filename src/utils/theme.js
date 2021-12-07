// 这里的请求不需要走封装过的 axios
import axios from 'axios'
import { colorMap, colorTables } from '@/common/common.js'
// 基于主色填充不同程度的白色
import color from 'css-color-function'
// 引入16进制
import rgbHex from 'rgb-hex'
/**
 * 生成最终的样式
 */
export const generateNewStyle = async (primary) => {
  if (!primary) return
  // 1.获取所有的 element 样式 >> https://unpkg.com/element-plus@1.2.0-beta.3/dist/index.css
  const originalStyle = await getDriginalStyle()
  // 2.分析原始样式  找出需要替换的颜色 做标记
  let newStyle = getStyleTemplate(originalStyle)
  // console.log(newStyle, '-----') // 做完标记了
  // 3.根据主色生成对应的情景色
  const newColors = generateColors(primary)
  // 4.在newStyle的模板中将标记都替换成生成的情景色
  Object.keys(newColors).forEach((key) => {
    newStyle = newStyle.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + newColors[key]
    )
  })
  return newStyle
}

// 获取本地的 element 版本
const getDriginalStyle = async () => {
  // // 获取到element当前的版本
  // const version = require('element-plus/package.json').version
  // // 组装成请求本版本的在线路径
  // const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  // // 发送请求，得到请求的元样式
  // const { data } = await axios(url)

  // 由于网路原因，请求本地资源
  const { data } = await axios('/element-plus.css')
  return data
}
// 将原文件做标记
const getStyleTemplate = (Style) => {
  // 得到common.js中子集匹配好的 样式标记对象
  Object.keys(colorMap).forEach((key) => {
    // 拿到  '#3a8ee6': 'shade-1', 标记
    const value = colorMap[key] // 这里拿到value  '#3a8ee6': 'shade-1',
    // 正则把原样式包里的样式替换 成 标记
    Style = Style.replace(new RegExp(key, 'gi'), value)
  })
  return Style
}
// 生成情景色
export const generateColors = (primary) => {
  // 根据主色生成对应的情景色
  const colors = {
    primary
  }
  Object.keys(colorTables).forEach((key) => {
    // 将主色应用到 color 函数中  //  'shade-1': 'color(primary shade(10%))',
    // color(primary shade(10%)) 将替换成 color(#012829 shade(10%))
    const value = colorTables[key].replace(new RegExp(/primary/g), primary)
    // 生成 16 进制的颜色()()() # + 1a3d3e // 这里借助两个插件
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  // console.log(colors, '000000---') // 生成后的对象格式
  return colors
}
/**
 * 将生成的样式写入到 header 标签中
 */
export const writeStyleToHeaderTag = (newStyle) => {
  // 生成 style标签
  const style = document.createElement('style')
  // 将新生成的样式放进 style 标签中
  style.innerHTML = newStyle
  // 将标签放到 head 让其生效
  document.head.appendChild(style)
}
