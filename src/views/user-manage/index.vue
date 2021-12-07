<template>
  <div class="user-manage-container">
    <el-card class="header">
      <!-- 导入 excel 按钮 -->
      <el-button type="primary" @click="onInportExcel">{{
        $t('msg.excel.importExcel')
      }}</el-button>
      <!-- 导出  按钮 -->
      <el-button type="success" @click="onExportExcel">{{
        $t('msg.excel.exportExcel')
      }}</el-button>
    </el-card>
    <!-- table -->
    <el-card class="table-card">
      <!-- table 渲染 -->
      <el-table :data="tableData" border style="width: 100%" class="table">
        <!-- # -->
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
          align="center"
        ></el-table-column>
        <!-- 联系方式 -->
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
          align="center"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
              class="avatar"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')" align="center">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="tag in row.role" :key="tag.id" size="mini">
                {{ tag.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 开通时间 -->
        <el-table-column :label="$t('msg.excel.openTime')" align="center">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!--  -->
        <el-table-column
          :label="$t('msg.excel.action')"
          width="300px"
          align="center"
          :resizable="true"
          fixed="right"
        >
          <template #default="{ row }">
            <el-button size="mini" type="success">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button size="mini" type="primary">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button size="mini" type="warning" @click="removeDate(row)">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagenation 分页展示 -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :currentpage="page"
        :page-sizes="[1, 5, 10, 20, 30, 50]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- excel 导出 模态显示 -->
    <export-excel
      :dialogShow="dialogShow"
      @closeDialog="close"
      :fileName="fileName"
      :data="dataFormate(exportData)"
      :header="Object.keys(USER_RELATION)"
      :message="$t('msg.excel.exportSucceed')"
    >
      <template #default>
        <!-- 选择下载的文件类型 -->
        <el-select
          v-model="excelType"
          placeholder="Select"
          class="sel"
          @change="changeExportType"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </template>
    </export-excel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUser, getAllUser, deleteUserById } from '@/api/user-manage.js'
import ExportExcel from '@/components/ExportExcel/index.vue'
import { USER_RELATION } from '@/common/common.js'
import dateFilter from '@/Filters/dateFilter.js'
import { useI18n } from 'vue-i18n/index'
import { watchLang } from '@/utils/i18n.js'
import { ElMessage, ElMessageBox } from 'element-plus'
// #region 导入逻辑
// 使用路由
const router = useRouter()

// 表格相关数据
const tableData = ref([])

// excel的导入 （需要跳转到导入页面）
const onInportExcel = () => {
  // 跳转到导入页面
  router.push('/user/import')
}

// 分页相关数据
const size = ref(5) // 展示的数据
const page = ref(1) //
const total = ref(0) // 总条目数

// 改变页展示数据的大小
const sizeChange = (currentSize) => {
  size.value = currentSize
  // 请取数据
  getManageUser()
}
// 改变当前页码
const currentChange = (currentPage) => {
  page.value = currentPage
  // 请取数据
  getManageUser()
}
// 获取用户数据
const getManageUser = async () => {
  const data = await getUser({
    // 请求数据传参格式
    page: page.value,
    size: size.value
  })
  // 接收参数
  tableData.value = exportData.value = data.list
  total.value = data.total
}
getManageUser()
// #endregion

// #region 导出业务
const i18n = useI18n()
// 导出相关业务
const dialogShow = ref(false)
// 打开模态框
const onExportExcel = () => {
  dialogShow.value = true
  // 默认显示第一页
  fileName.value = `${i18n.t('msg.excel.defaultName')}(${page.value})`
  // 默认选中当前页
  excelType.value = 1
}
// 关闭模态框
const close = () => {
  dialogShow.value = false
}

// 下拉框相关数据
const excelType = ref(1)
const options = ref([
  {
    id: 1,
    label: '当前页'
  },
  {
    id: 2,
    label: '全部数据'
  }
])
// 收集要下载的数据
const exportData = ref([])
// 收集文件名称
const fileName = ref(i18n.t('msg.excel.defaultName'))
// 下拉框改变
const changeExportType = async (value) => {
  if (value === 1) {
    // 请求当前页
    fileName.value = `${i18n.t('msg.excel.defaultName')}(${page.value})`
  } else {
    fileName.value = i18n.t('msg.excel.defaultName')
    // 请求全部数据
    const { list } = await getAllUser()
    exportData.value = list
  }
}

// 转换数据格式
const dataFormate = (data) => {
  return data.map((item) => {
    return Object.keys(USER_RELATION).map((key) => {
      if (USER_RELATION[key] === 'role') {
        // 处理用户角色
        const roles = item[USER_RELATION[key]]
        if (roles.length > 0) {
          return JSON.stringify(roles.map((role) => role.title))
        } else {
          return '[]'
        }
      } else if (USER_RELATION[key] === 'openTime') {
        // 处理时间
        return dateFilter(item[USER_RELATION[key]])
      } else {
        return item[USER_RELATION[key]]
      }
    })
  })
}

// 监听中英文切换 (封装好的 语言切换监听方法)
watchLang((lang) => {
  fileName.value = i18n.t('msg.excel.defaultName')
})

// 删除表格数据
const removeDate = (row) => {
  ElMessageBox.confirm(
    `${i18n.t('msg.excel.dialogTitle1')}:  ${row.username}${i18n.t(
      'msg.excel.dialogTitle2'
    )}`,
    i18n.t('msg.excel.remove'),
    {
      confirmButtonText: i18n.t('msg.excel.remove'),
      cancelButtonText: i18n.t('msg.excel.close'),
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUserById(row._id)
      // 删除完成重新请求数据
      getManageUser()
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
// #endregion

// 跳转详情
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  margin-bottom: 22px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.table-card {
  // max-height: calc(100vh - 96px - 22px);
}
.sel {
  margin-top: 20px;
  width: 100%;
}
</style>
