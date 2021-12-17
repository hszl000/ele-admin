import store from '@/store/index.js'

const checkoutButton = (el, binding) => {
  const {
    permission: { points }
  } = store.getters.userInfo
  // 有权限 --- 不处理
  // 无权限 --- 删除此节点
  if (!points.includes(binding.value)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}

export default {
  mounted(el, binding) {
    checkoutButton(el, binding)
  },
  updated(el, binding) {
    checkoutButton(el, binding)
  }
}
