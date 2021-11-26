<template>
  <el-config-provider :locale="store.getters.language === 'zh' ? zhCn : en">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { useStore } from 'vuex'
// 由于版本问题不能直接
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
// 生成情景样式  替换样式
import { generateNewStyle, writeStyleToHeaderTag } from '@/utils/theme.js'
const store = useStore()
// 生成的情景色 (由于他返回的是promise所以要 。then)
generateNewStyle(store.getters.theme_color).then((res) => {
  writeStyleToHeaderTag(res)
})
// 写入head中
</script>
<style lang="scss" scoped>
// #app .hideSidebar .el-submenu > .el-submenu__title {
//   padding: 20px !important;
// }
</style>
