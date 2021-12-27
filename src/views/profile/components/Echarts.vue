<template>
  <el-col :xs="24" :sm="12" :span="12">
    <el-card class="box-card">
      <template #header>
        <div>
          <span>{{ data.titles }}</span>
          <el-button type="text" class="text" style="float: right"
            >查看详情 ></el-button
          >
        </div>
      </template>
      <div class="echarts-box text">
        <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
        <div :id="`main${props.index}`" style="width: 100%; height: 100%"></div>
      </div>
    </el-card>
  </el-col>
</template>

<script setup>
import { onMounted, defineProps } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
console.log(props.data)
const echartsFn = () => {
  const dom = document.querySelector(`#main${props.index}`)
  const myChart = echarts.init(dom)

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(props.data)
  // 监听屏幕的大小变化
  window.addEventListener('resize', () => {
    // 调用echarts身上的resize方法（适应屏幕大小）
    window.onresize = myChart.resize()
  })
}

onMounted(() => {
  echartsFn()
})
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  height: 100%;
  .text {
    font-size: 14px;
  }
  .echarts-box {
    padding: 18px 0;
    height: 280px;
  }
}
</style>
