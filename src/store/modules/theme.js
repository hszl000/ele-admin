import { setItem, getItem } from '@/utils/storage.js'
import { MYCOLOR } from '@/common/common.js'
export default {
  namespaced: true,
  state: {
    myColor: getItem(MYCOLOR) || '#1D561D'
  },
  mutations: {
    setMyColor(state, color) {
      // 设置vuex
      state.myColor = color
      // 设置本地储存
      setItem(MYCOLOR, color)
    }
  }
}
