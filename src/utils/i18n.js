import i18n from '@/i18n/index.js'
import { watch } from 'vue'
import store from '@/store/index.js'
import { ElMessage } from 'element-plus'
// i18n 封装侧边导航title
export const getTitle = (title) => {
  return i18n.global.t(`msg.route.${title}`)
}

// 监听中英文切换 重新执行（切换语言）
export const watchLang = (...cds) => {
  watch(
    () => store.getters.language,
    (newValue) => {
      try {
        // 是否所有数据都是函数
        cds.forEach((cd) => cd(newValue))
      } catch (err) {
        setTimeout(() => {
          ElMessage.error('cds 不符合校验规则')
        })
      }
    }
  )
}
