// token的变量
export const TOKEN = 'token'
// 用户数据的变量
export const USER_INFO = 'user_info'
// token登陆时间的变量
export const TIME_STAMP = 'time_stamp'
// 2小时（计算毫秒）
export const TIME_OUT = 2 * 68 * 60 * 60 * 1000
// 侧边栏收缩
export const SIDEBAROPENED = 'sideBarOpened'
// 设置国际化变量
export const LANGUAGE = 'language'
// 主题色变量
export const MYCOLOR = 'theme_color'
// 添加顶部导航的变量
export const TAG_VIEWS = 'tag_views'
// 角色变量
export const ROLE = 'role'
// 权限变量
export const PERMISSION = 'permission'
// 加工后权限变量
export const PERMISSION_ = 'permission_'
// excel 替换规则
export const USER_RELATION = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
  // 头像: 'avatar'
}
// el-color-picker 默认颜色
export const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
  '#1D561D'
]

export const colorMap = {
  '#3a8ee6': 'shade-1',
  '#409eff': 'primary',
  '#53a8ff': 'light-1',
  '#66b1ff': 'light-2',
  '#79bbff': 'light-3',
  '#8cc5ff': 'light-4',
  '#a0cfff': 'light-5',
  '#b3d8ff': 'light-6',
  '#c6e2ff': 'light-7',
  '#d9ecff': 'light-8',
  '#ecf5ff': 'light-9',
  '#0d84ff': 'light-3'
}

export const colorTables = {
  'shade-1': 'color(primary shade(10%))',
  'light-1': 'color(primary tint(10%))',
  'light-2': 'color(primary tint(20%))',
  'light-3': 'color(primary tint(30%))',
  'light-4': 'color(primary tint(40%))',
  'light-5': 'color(primary tint(50%))',
  'light-6': 'color(primary tint(60%))',
  'light-7': 'color(primary tint(70%))',
  'light-8': 'color(primary tint(80%))',
  'light-9': 'color(primary tint(90%))',
  subMenuHover: 'color(primary tint(70%))',
  subMenuBg: 'color(primary tint(80%))',
  menuHover: 'color(primary tint(90%))',
  menuBg: 'color(primary)'
}
