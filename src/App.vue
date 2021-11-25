<template>
  <ElConfigProvider :locale="store.getters.language === 'zh' ? zhCn : en">
    <router-view />
  </ElConfigProvider>
</template>

<script setup>
// 由于版本问题不能直接
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import store from '@/store/index.js'
</script>
<style lang="scss" scoped>
#app .hideSidebar .el-submenu > .el-submenu__title {
  padding: 20px !important;
}
</style>
