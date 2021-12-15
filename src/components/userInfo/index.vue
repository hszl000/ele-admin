<template>
  <div class="user-info-box" id="user-print-box">
    <!-- 标题 -->
    <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
    <!-- 头部渲染 -->
    <div class="header">
      <!-- 头部数据 -->
      <el-descriptions :column="2" border>
        <!-- 姓名 -->
        <el-descriptions-item :label="$t('msg.userInfo.name')">{{
          props.userData.username
        }}</el-descriptions-item>
        <!-- 性别 -->
        <el-descriptions-item :label="$t('msg.userInfo.sex')">{{
          props.userData.gender
        }}</el-descriptions-item>
        <!-- 民族 -->
        <el-descriptions-item :label="$t('msg.userInfo.nation')">{{
          props.userData.nationality
        }}</el-descriptions-item>
        <!-- 联系方式 -->
        <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{
          props.userData.mobile
        }}</el-descriptions-item>
        <!-- 住址 -->
        <el-descriptions-item :label="$t('msg.userInfo.province')">{{
          props.userData.address
        }}</el-descriptions-item>
        <!-- 开通时间 使用过滤器过滤时间 -->
        <el-descriptions-item :label="$t('msg.userInfo.date')">{{
          $filters.dateFilter(props.userData.openTime)
        }}</el-descriptions-item>
        <!-- 开通时间 使用过滤器过滤时间 -->
        <el-descriptions-item :label="$t('msg.userInfo.remark')">
          <el-tag
            v-for="(tag, index) in props.userData.remark"
            :key="index"
            size="mini"
            class="remark"
            >{{ tag }}</el-tag
          >
        </el-descriptions-item>
      </el-descriptions>
      <!-- 用户头像 -->
      <el-image
        :src="props.userData.avatar"
        class="avatar"
        :preview-src-list="[props.userData.avatar]"
      ></el-image>
    </div>
    <!-- 主体 -->
    <div class="body">
      <el-descriptions :column="1" border>
        <!-- 经历 -->
        <el-descriptions-item :label="$t('msg.userInfo.experience')">
          <ul>
            <li v-for="(item, index) in props.userData.experience" :key="index">
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
          <span class="font">{{ props.userData.major }}</span>
        </el-descriptions-item>
        <!-- 荣耀 -->
        <el-descriptions-item :label="$t('msg.userInfo.glory')">
          <span class="font">{{ props.userData.glory }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 底部 -->
    <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
