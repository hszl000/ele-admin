import i18n from '@/i18n/index.js'
// 登录页的密码校验
export const passswordValidate = () => {
  return (rule, value, callback) => {
    // 获取到输入的值，再做验证 至少是六位
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule'))) // on
      /*
        模板中使用：$t()
        js中使用：t()
        js中使用：global.t()
      */
    } else {
      callback() // ok
    }
  }
}
// 登录页的账号校验（为了中英文切换被迫使用函数，每次重新调用）
export const usernameValidate = () => {
  return (rule, value, callback) => {
    // 获取到输入的值，再做验证 至少是六位
    if (value.length <= 0) {
      callback(new Error(i18n.global.t('msg.login.usernameRule'))) // on
    } else {
      callback() // ok
    }
  }
}
