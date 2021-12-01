import { setItem, getItem } from '@/utils/storage.js'
import { TAG_VIEWS } from '@/common/common.js'
export default {
  namespaced: true,
  state: {
    tagViewList: getItem(TAG_VIEWS) || []
  },
  mutations: {
    addTagViewList(state, route) {
      // 如果存在路由，不能push
      const isFind = state.tagViewList.find((item) => item.path === route.path)
      if (!isFind) {
        state.tagViewList.push(route)
        setItem(TAG_VIEWS, state.tagViewList)
      }
    },
    // 随语言切换更新 tagViewList 中的(指定的索引)每一个title
    // 方式一：
    // changeTitle(state, { index, route }) {
    //   state.tagViewList[index] = route
    //   setItem(TAG_VIEWS, state.tagViewList)
    // }
    // 方式二：
    changeTitle(state, newTagViewList) {
      state.tagViewList = newTagViewList
      setItem(TAG_VIEWS, state.tagViewList)
    },
    /*
      关闭业务
      params:paylod:(type: "index"||"right"||"other",index:'index')
    */
    closeTag(state, { type, index }) {
      if (type === 'index') {
        // 删除当前
        state.tagViewList.splice(index, 1)
      } else if (type === 'right') {
        // 删除右侧 (不算自己，右侧全部删除)
        state.tagViewList.splice(index + 1, state.tagViewList.length - 1)
      } else if (type === 'other') {
        // 删除其他
        state.tagViewList = [state.tagViewList[index]]
      }
      // 执行本地储存
      setItem(TAG_VIEWS, state.tagViewList)
    }
  }
}
