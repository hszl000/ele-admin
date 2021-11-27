<template>
  <div :class="{ show: isShow }" class="header-search">
    <!-- 图标 -->
    <svg-icon iconName="search" iconClass="search" @click.stop="toggleShow" />
    <!-- select 下拉选项 -->
    <el-select
      v-model="search"
      placeholder="Select"
      class="header-search-select"
      filterable
      remote
      :remote-method="querySearch"
      @change="onSelectChaneg"
      ref="searchSelectRef"
      default-first-option
    >
      <el-option
        v-for="{ item } in searchResult"
        :key="item.path"
        :label="item.title.join(' > ')"
        :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
// 引入加工后的动态路由方法
import { filterRouter, generateFuse } from '@/utils/router.js'
// 引入模糊检索插件
import Fuse from 'fuse.js'
// 封装好的 watch 监听语言变化
import { watchLang } from '@/utils/i18n.js'
// 切换标志
const isShow = ref(false)
// 收集搜索框内容
const search = ref('')
// 获取ref input
const searchSelectRef = ref(null)
// 搜索切换方法
const toggleShow = () => {
  isShow.value = !isShow.value
  if (isShow.value) {
    // 展开自动聚焦
    searchSelectRef.value.focus()
  } else {
    // 关闭 清空搜索框
    search.value = ''
    // 清空上次检索的 option
    searchResult.value = []
    // 失焦
    searchSelectRef.value.blur()
  }
}
// 接收过滤格式化完的路由格式
const searchResult = ref([])
// 检索方法 (用到节流了)
const querySearch = (query) => {
  // 调用 fuse.search(query) 进行搜索query
  searchResult.value = fuse.search(query)
}
// 选中option触发方法
const onSelectChaneg = ({ title, path }) => {
  // 选中与 input 框内容同步
  search.value = title.join(' > ')
  // 执行路由跳转
  router.push(path)
}

const router = useRouter()
// 准备数据源
// 因为以后路由要变化，所以 通过 router.getRoutes() 获取动态的路由
// router.getRoutes() 有一个弊端，就是子路由重复出现在以及路由里，所以要对其进行加工
let list = computed(() => {
  // 1.去重
  const filterRoutes = filterRouter(router.getRoutes())
  console.log(filterRoutes, '去完重的数据')
  // 2.格式化路由 条件 1.具有 meta && meta.title 2.过滤掉动态路由
  return generateFuse(filterRoutes)
})

// 初始化 fuse.js --> 模糊搜索的工具
let fuse
// 模糊检索 规则
const initFuse = (list) => {
  fuse = new Fuse(list, {
    shouldSort: true, // 是否按照优先级进行排序
    minMatchCharLength: 1, // 搜索的字符有效匹配长度
    keys: [
      {
        name: 'path', // 搜索的字段
        weight: 0.7 // 若果多条搜索方式同时命中同一条数据，权重优先级高的记录
      },
      {
        name: 'title',
        weight: 0.3
      }
    ]
  })
}
initFuse(list.value) // 传入要检索的数据源 --计算出的 list 是 ref 属性要 .value

// 封装监听 language 的切换动作
watchLang((lang) => {
  console.log('重新计算数据源', lang)
  list = computed(() => {
    // 1.去重
    const filterRoutes = filterRouter(router.getRoutes())
    console.log(filterRoutes, '去完重的数据')
    // 2.格式化路由 条件 1.具有 meta && meta.title 2.过滤掉动态路由
    return generateFuse(filterRoutes)
  })
  // 重新执行 检索
  initFuse(list.value)
})

// 问题 1: 收起的时候 清除 search 和 option 残留数据
// 问题 2: 点击屏幕将任意地方 都将 search 搜索框收起
// const onClose = () => {
//   console.log('关闭')
//   toggleShow()
// }

// 监听 isShow的状态 （千万记得冒泡事件）
watch(isShow, (newValue) => {
  if (newValue) {
    // 如果 isShow 为 true 的状态下 再去绑定事件
    document.body.addEventListener('click', toggleShow)
  } else {
    // 如果 isShow 为 false 的状态下 再去取消绑定事件
    document.body.removeEventListener('click', toggleShow)
  }
})
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  align-items: center;
  .search {
    padding: 15px;
    cursor: pointer;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.28s;
    width: 0;
    overflow: hidden;
    :deep(.el-input__inner) {
      background: transparent;
      outline: none;
      border: none;
      box-shadow: none;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
      display: inline-block;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
    }
  }
}
</style>
