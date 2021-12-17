<!-- 个人中心 -->
<template>
  <div>
    {{ store.getters.hasUserInfo }}
    <div class="">个人中心</div>
    <p>{{ $t('msg.login.title') }}</p>
    <el-pagination
      v-model:currentPage="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
      <el-button>中文</el-button>
    </el-row>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const currentPage1 = 1
</script>

<style lang="scss" scoped></style>
