import i18n from '@/i18n/index.js'

// i18n 封装侧边导航title
export const getTitle = (title) => {
  return i18n.global.t(`msg.route.${title}`)
}
