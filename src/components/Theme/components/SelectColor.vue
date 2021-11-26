<template>
  <el-dialog
    :model-value="showSelectVariable"
    :title="$t('msg.theme.themeChange')"
    width="30%"
    @close="handleClose(true)"
  >
    <!-- 取色器 -->
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker v-model="color" :predefine="predefineColors" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose()">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { predefineColors } from '@/common/common.js'
import { generateNewStyle, writeStyleToHeaderTag } from '@/utils/theme.js'
const store = useStore()
// props参数
defineProps({
  showSelectVariable: {
    type: Boolean,
    required: true
  }
})
// 自定义事件
const emits = defineEmits(['showSelectColor'])
// 关闭
const handleClose = () => {
  emits('showSelectColor', false)
}

// 取色器取到的值 (主题色) 刷新不能掉，其他地方也要使用主题色 vuex localStorage
const color = ref(store.getters.theme_color)

// 确认切换按钮
const confirm = async () => {
  // 1.将颜色保存vuex
  store.commit('theme/setMyColor', color.value)
  // 2.替换element 和 本地的样式 让主题色生效
  /**
   * 1.获取所有的 element 的样式 （不同版本的样式是不一样的）
   * 2.将样式中的 情景颜色替换成
   *    color.value --》生成一系列1和他相近的情景色
   * 3.将替换完成的样式 插入到 header 中，利用 css 优先级让插入的样式生效
   */
  // 2-1.生成最终要替换的颜色
  const newStyle = await generateNewStyle(color.value)
  // 2-2 将替换完的样式 插入到 header中，利用 css 的优先级让插入的样式生效
  writeStyleToHeaderTag(newStyle)
  // 3.关闭diolog
  emits('showSelectColor', false)
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
