<!-- 用户详情数据 -->
<template>
  <div class="user-info-container">
    <!-- 打印card -->
    <el-card class="print-box">
      <el-button type="primary" v-print="printObj">{{
        $t('msg.userInfo.print')
      }}</el-button>
    </el-card>
    <!-- 用户详情 -->
    <el-card>
      <div class="user-info-box" id="user-print-box">
        <!-- 标题 -->
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <!-- 头部渲染 -->
        <div class="header">
          <!-- 头部数据 -->
          <el-descriptions :column="2" border>
            <!-- 姓名 -->
            <el-descriptions-item :label="$t('msg.userInfo.name')">{{
              userData.username
            }}</el-descriptions-item>
            <!-- 性别 -->
            <el-descriptions-item :label="$t('msg.userInfo.sex')">{{
              userData.gender
            }}</el-descriptions-item>
            <!-- 民族 -->
            <el-descriptions-item :label="$t('msg.userInfo.nation')">{{
              userData.nationality
            }}</el-descriptions-item>
            <!-- 联系方式 -->
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{
              userData.mobile
            }}</el-descriptions-item>
            <!-- 住址 -->
            <el-descriptions-item :label="$t('msg.userInfo.province')">{{
              userData.address
            }}</el-descriptions-item>
            <!-- 开通时间 使用过滤器过滤时间 -->
            <el-descriptions-item :label="$t('msg.userInfo.date')">{{
              $filters.dateFilter(userData.openTime)
            }}</el-descriptions-item>
            <!-- 开通时间 使用过滤器过滤时间 -->
            <el-descriptions-item :label="$t('msg.userInfo.remark')">
              <el-tag
                v-for="(tag, index) in userData.remark"
                :key="index"
                size="mini"
                class="remark"
                >{{ tag }}</el-tag
              >
            </el-descriptions-item>
          </el-descriptions>
          <!-- 用户头像 -->
          <el-image
            :src="userData.avatar"
            class="avatar"
            :preview-src-list="[userData.avatar]"
          ></el-image>
        </div>
        <!-- 主体 -->
        <div class="body">
          <el-descriptions :column="1" border>
            <!-- 经历 -->
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in userData.experience" :key="index">
                  <span class="font"
                    >{{ $filters.dateFilter(item.startTime, 'YYYY-MM') }} 至
                    {{ $filters.dateFilter(item.endTime, 'YYYY-MM') }}</span
                  >
                  <span class="font">{{ item.title }}</span>
                  <span class="font">{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <!-- 专业 -->
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              <span class="font">{{ userData.major }}</span>
            </el-descriptions-item>
            <!-- 荣耀 -->
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              <span class="font">{{ userData.glory }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 底部 -->
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'
import { userDetailById } from '@/api/user-manage.js'

// 接收参数（路由 or props）
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 获取用户信息
const userData = ref({})
const getUserDetail = async () => {
  userData.value = await userDetailById(props.id)
  console.log(userData.value)
}
getUserDetail()

// 打印规则
const printObj = {
  id: 'user-print-box', // 指定打印的区域
  popTitle: 'element-admin' // 标题
}

// 监听参数变化，（解决查看多个用户数据相同情况）
watch(
  () => props.id,
  () => {
    getUserDetail()
  }
)
</script>

<style lang="scss" scoped>
.user-info-container {
  .print-box {
    text-align: right;
    margin-bottom: 20px;
  }
}
// 但因插件解析不了 打印元素外部的样式（所以将其抽离出来）
.user-info-box {
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    flex: 1;
    :deep(.el-descriptions) {
      flex: 1;
    }
    .avatar {
      width: 190px;
      box-sizing: border-box;
      padding: 20px 30px;
      border: 1px solid #ccc;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    .font {
      font-size: 12px;
    }
    ul {
      list-style: none;
      li span {
        margin-right: 60px;
        // font-size: 12px;
      }
    }
  }
  .foot {
    margin-top: 40px;
    text-align: right;
  }
}
</style>
