// 登录页的密码校验
export const passswordValidate = () => {
  return (rule, value, callback) => {
    // 获取到输入的值，再做验证 至少是六位
    if (value.length < 6) {
      callback(new Error('密码至少6位')) // on
    } else {
      callback() // ok
    }
  }
}
