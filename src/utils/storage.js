// 本地存储数据
// 存储
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  // 有可能是个对象的字符串
  try {
    // 是一个对象字符串
    return JSON.parse(value)
  } catch (err) {
    // 不是一个对象的字符串
    return value
  }
}

// 删除
export const deleteItem = (key) => {
  window.localStorage.removeItem(key)
}

// 清空
export const clearItem = () => {
  window.localStorage.clear()
}
