<template>
  <!-- $attrs加在谁身上谁就能得到父组件绑定的属性 -->
  <el-dropdown
    v-bind="$attrs"
    class="theme"
    trigger="click"
    @command="showSelectColor(true)"
  >
    <!-- 换肤图标 -->
    <div>
      <el-tooltip :content="$t('msg.theme.themeChange')">
        <svg-icon iconName="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <!-- 下拉选项 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{
          $t('msg.theme.themeColorChange')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出模态框 -->
  <select-color
    :showSelectVariable="showSelectVariable"
    @showSelectColor="showSelectColor"
  />
</template>

<script setup>
// 引入选色模态框
import SelectColor from './components/SelectColor.vue'
import { ref } from 'vue'

const showSelectVariable = ref(false)
// 控制 模态框展示方法(根据传的参数控制开关)
const showSelectColor = (val) => {
  showSelectVariable.value = val
}
</script>

<style lang="scss" scoped>
.theme {
  .theme-svg {
    padding: 15px;
  }
}
</style>
