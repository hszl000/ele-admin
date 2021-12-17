// 文章排名业务
import Sortable from 'sortablejs'
import { ref } from 'vue'
import { updateArticleRanking } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n/index.js'

// table 组件的实例
export const tableRef = ref(null)

// 初始化插件 (当前表格数据，请求数据方法)
export const initSortable = (tableData, getArticle) => {
  // 拿到当前拖拽区域的 dom 区域
  const els = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper > table > tbody'
  ) // 拖拽行为触发的 dom 区域
  console.log(els)
  Sortable.create(els[0], {
    animation: 600,
    ghostClass: 'ghost',
    async onEnd(event) {
      const { oldIndex, newIndex } = event
      // 拖拽结束后发送请求
      const finalRanking = tableData.value[newIndex].ranking // 移动后的位置
      const initRanking = tableData.value[oldIndex].ranking // 初始化的位置
      if (finalRanking === initRanking) {
        // 如果拖动的位置没有改变
        return ElMessage.info(i18n.global.t('msg.article.beUnchanged'))
      }

      await updateArticleRanking({
        initRanking,
        finalRanking
      })
      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
      tableData.value = []
      // 拖拽完成重新请求接口
      getArticle && getArticle()
    }
  })
}
