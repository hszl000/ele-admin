<template>
  <div class="">
    <!-- 动态列 -->
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel" :min="1">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
          />
        </el-checkbox-group>
      </div>
    </el-card>
    <!-- 文章排名表格 -->
    <el-card>
      <theme-table :cbs="cbs">
        <template #default="{ headerStyleObj }">
          <el-table
            :data="tableData"
            :header-cell-style="headerStyleObj"
            border
            style="width: 100%"
            ref="tableRef"
          >
            <!-- 排名 -->
            <el-table-column
              v-for="(item, index) in tableLabels"
              :key="index"
              :show-overflow-tooltip="item.prop !== 'action'"
              :label="item.label"
              :prop="item.prop"
            >
              <template #default="{ row }" v-if="item.prop === 'publicDate'">
                {{ $filters.relativeTime(row.publicDate) }}
              </template>
              <template #default="{ row }" v-else-if="item.prop === 'action'">
                <el-button
                  @click="showArticle(row)"
                  size="mini"
                  type="primary"
                  >{{ $t('msg.article.show') }}</el-button
                >
                <el-button
                  @click="removeArticle(row)"
                  size="mini"
                  type="danger"
                  >{{ $t('msg.article.remove') }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </theme-table>
      <!--分页 -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[1, 5, 10, 20, 30, 50]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// 获取文章列表  ，  删除文章
import { getArticleList, removeArticleById } from '@/api/article.js'
import ThemeTable from '@/components/ThemeTable/index.vue'
// ------------- 动态列业务 --------------
// checkbox 选择的数据 --- 所有数据 --- 要展示的表格数据
import { selectDynamicLabel, dynamicData, tableLabels } from './hooks/dynamic'

import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
// ------------- 拖拽业务 ----------------
import { tableRef, initSortable } from './hooks/sortable'

onMounted(() => {
  initSortable(tableData, getArticle)
})

const i18n = useI18n()
const router = useRouter()
// #region 表格渲染
// 分页相关
const page = ref(1)
const size = ref(5)
const total = ref(0)
// 改变当前页
const pageChange = (page_) => {
  page.value = page_
  // 重新请求数据
  getArticle()
}
// 改变页大小
const sizeChange = (size_) => {
  size.value = size_
  // 重新请求数据
  getArticle()
}

// 表格数据
const tableData = ref([])
// 获取文章列表
const getArticle = async () => {
  const data = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = data.list
  total.value = data.total
}
getArticle()

// 查看文章
const showArticle = (row) => {
  // 跳转文章详情 并把当前 id 传递过去
  router.push('/article/' + row._id)
}
// 删除文章
const removeArticle = async (row) => {
  console.log(row, '0000000000000')
  ElMessageBox.confirm(
    `${i18n.t('msg.article.dialogTitle1')}:   《 ${row.title} 》${i18n.t(
      'msg.article.dialogTitle2'
    )}`,
    i18n.t('msg.excel.remove'),
    {
      confirmButtonText: i18n.t('msg.excel.remove'),
      cancelButtonText: i18n.t('msg.excel.close'),
      type: 'warning'
    }
  )
    .then(async () => {
      await removeArticleById(row._id)
      // 删除完成重新请求数据
      getArticle()
      ElMessage({
        type: 'success',
        message: i18n.t('msg.excel.removeSuccess')
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.t('msg.excel.close') + i18n.t('msg.excel.remove')
      })
    })
}

// 语言切换重新请求数据
const cbs = [getArticle]

// 进入 keep-live 缓存组件时调用 onActivated
onActivated(getArticle)
// #endregion
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  .dynamic-box {
    display: flex;
    align-items: center;
    .title {
      margin-right: 20px;
      font-size: 14px;
      font-weight: 800;
    }
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
