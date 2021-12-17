<template>
  <div>
    <el-card>
      <el-input placeholder="请输入文章标题"></el-input>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="markdown" name="first">markdown</el-tab-pane>
        <el-tab-pane label="富文本" name="second">富文本</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = () => {}
</script>

<style lang="scss" scoped></style>
