<template>
  <div>
    <el-row :gutter="20">
      <Echarts
        v-for="(item, index) in data"
        :key="index"
        :data="item"
        :index="index"
        class="ech"
      />
    </el-row>
  </div>
</template>

<script setup>
import Echarts from './components/Echarts.vue'
import data from './data/echartsData'
</script>

<style lang="scss" scoped>
.ech {
  margin-bottom: 20px;
}
</style>
