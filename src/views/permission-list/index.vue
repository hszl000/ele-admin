<!-- 权限啊列表 -->
<template>
  <div>
    <el-card class="button-bottom">
      <el-button type="primary" @click="toggle">{{
        isShowChildren
          ? $t('msg.role.toggleTitle2')
          : $t('msg.role.toggleTitle1')
      }}</el-button>
    </el-card>
    <!-- 封装插槽 table   isCard属性是询问你父组件是否有card -->
    <theme-table :cds="cds" :isCard="false">
      <template #isCard="{ headerStyleObj }">
        <el-table
          :data="permissionData"
          border
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          :default-expand-all="isShowChildren"
          :tree-props="{ children: 'children' }"
          :header-cell-style="headerStyleObj"
          ref="table"
        >
          <el-table-column
            prop="permissionName"
            :label="$t('msg.permission.name')"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="permissionMark"
            :label="$t('msg.permission.mark')"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="permissionDesc"
            :label="$t('msg.permission.desc')"
          ></el-table-column>
        </el-table>
      </template>
    </theme-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useStore } from 'vuex'
// 所有权限列表
import { getAllPermissions } from '@/api/permission.js'
import ThemeTable from '@/components/ThemeTable/index.vue'

// const store = useStore()
/**
 * 权限分类
 * {
 *  { --> 页面权限（一级）--> 1.能在左边的菜单看到这个选项 2.可以点击进入当前组件
 *    {} --> 该页面中的操作权限（二级）--> 1.可以看到 页面中的操作按钮，并点击执行对应的业务
 *  }
 * }
 */
// 请求所有的权限列表
const permissionData = ref([])
const initPermission = async () => {
  permissionData.value = await getAllPermissions()
}
initPermission()
const cds = [initPermission]

// 展开收起二级菜单
const isShowChildren = ref(false)
const table = ref(null)

// 二级菜单收起 or 展开
const toggle = () => {
  isShowChildren.value = !isShowChildren.value
  permissionData.value.forEach((row) => {
    // toggleRowExpansion 此方法需要获取到每一行数据，所以遍历
    table.value.toggleRowExpansion(row, isShowChildren.value)
  })
}
</script>

<style lang="scss" scoped>
.button-bottom {
  margin-bottom: 20px;
}
</style>
