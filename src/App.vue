<template>
  <el-config-provider :locale="store.getters.language === 'zh' ? zhCn : en">
    <router-view />
  </el-config-provider>
</template>

<script setup>
// 引入 vuex
import { useStore } from 'vuex'
// 引入中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// 引入英文包
import en from 'element-plus/lib/locale/lang/en'
// 生成情景样式  替换样式 （由于是网络请求的样式 element 没有存在vuex中， 刷新会丢失，所以当页面重新加载的时候都会根据主色重新 请求 生成 并运用情景色）
import { generateNewStyle, writeStyleToHeaderTag } from '@/utils/theme.js'
const store = useStore()
// 生成的情景色 (由于他返回的是promise所以要 。then)
generateNewStyle(store.getters.theme_color).then((res) => {
  // 写入head中
  writeStyleToHeaderTag(res)
})
</script>
<style lang="scss" scoped></style>
