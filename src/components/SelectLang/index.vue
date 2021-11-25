<template>
  <el-dropdown trigger="click" @command="selectLang">
    <!-- 图标 -->
    <svg-icon iconName="language" iconClass="select-lang" />
    <!-- 下拉选项 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          command="zh"
          :disabled="store.getters.language === 'zh' ? true : false"
          >中文</el-dropdown-item
        >
        <el-dropdown-item
          command="en"
          :disabled="store.getters.language === 'en' ? true : false"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n/index'
import { ElMessage } from 'element-plus'
const store = useStore()
const i18n = useI18n()
const selectLang = (lang) => {
  // 修改vuex 中的 language
  store.commit('app/setLanguage', lang)
  // i18n 中的 locale
  i18n.locale.value = lang // 相当于更改了 i18n/index.js中的 locale语言变量
  // 切换语言成功提示
  ElMessage({
    type: 'success',
    message: i18n.t('msg.toast.switchLangSuccess')
  })
}
</script>

<style lang="scss" scoped>
.select-lang {
  padding: 15px;
}
</style>
