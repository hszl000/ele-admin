<template>
  <div class="app-main">
    <!-- 二级路由显示容器 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// 检测当前路由是否存在黑名单中
import { isNoTag } from '@/utils/tag.js'
// 中英文 title 转换
import { getTitle as getTitle_, watchLang } from '@/utils/i18n'
const route = useRoute()
const store = useStore()
// 获取title (将整个路由拿来判断)
const getTitle = (to) => {
  if (!to.meta || !to.meta.title) {
    // 如果不存在title 就以path最后一项作为 title
    const tem = to.path.split('/').reverse()
    return tem[0]
  } else {
    // 如果存在title
    return getTitle_(to.meta.title)
  }
}
// 监听当前路由的变化 (初始化也要执行),增加tag到指定位置
watch(
  route,
  (to, from) => {
    // 检测当前路由是否存在黑名单中 (如果存在 不合法，不执行)
    if (isNoTag(to.path)) return
    // 合法tag
    const { path, fullPath, meta, name, params, query } = to
    // 增加一个 tag 到vuex中
    store.commit('tag/addTagViewList', {
      path,
      fullPath,
      meta,
      name,
      params,
      query,
      title: getTitle(to) // 将整个路由传过去（去做加工）
    })
  },
  { immediate: true }
)
// 封装好的 watch监听 语言切换（更改顶部导航语言数据）
watchLang(() => {
  // 更新 vuex or localStorage
  // 方法一：这种方式 每循环一次都要调用一次 mutations,造成性能问题
  // store.getters.tagViewList.forEach((route, index) => {
  //   store.commit('tag/changeTitle', {
  //     index: index,
  //     // 只进行修改 中英文 title
  //     route: { ...route, title: getTitle(route) }
  //   })
  // })
  // 方法二：现在这边把数据处理完成，只调用一次mutations进行储存
  const tmpArr = store.getters.tagViewList.map((route) => {
    return { ...route, title: getTitle(route) }
    // return { ...route, title: getTitle_(route.meta.title) }
  })
  store.commit('tag/changeTitle', tmpArr)
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 96px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 96px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
