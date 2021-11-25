<template>
  <div class="login_box">
    <div class="login-container">
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginRef"
      >
        <div class="title-container">
          <h3 class="title">{{ $t('msg.login.title') }}</h3>
          <!-- 国际化语言切换 -->
          <select-lang class="select-lang" />
        </div>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon iconName="user" iconClass="user" />
          </span>
          <el-input
            :placeholder="$t('msg.login.username')"
            name="username"
            type="text"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon iconName="pass" iconClass="user" />
          </span>
          <el-input
            :placeholder="$t('msg.login.password')"
            name="password"
            v-model="loginForm.password"
            :type="passShow ? 'password' : 'text'"
          ></el-input>
          <!-- 查看密码 -->
          <span class="svg-container" @click="passChange">
            <svg-icon :iconName="passShow ? 'lookNot' : 'look'" />
          </span>
        </el-form-item>
        <!-- 服务条款 -->
        <div>
          <span style="color: gray">{{ $t('msg.login.rulesTitle') }}</span>
          <el-link type="primary">{{ $t('msg.login.rules') }}</el-link>
        </div>
        <!-- 按钮 -->
        <div class="button" style="margin-top: 30px; margin-bottom: 20px">
          <!-- 登录按钮 -->
          <el-button type="primary" style="width: 100%" @click="loginFn">{{
            $t('msg.login.loginBtn')
          }}</el-button>
          <!-- 重置按钮 -->
          <el-button type="reset" style="width: 100%" @click="resetForm">{{
            $t('msg.login.resetBtn')
          }}</el-button>
        </div>
        <!-- 记住下次登陆 -->
        <p>
          <el-checkbox :label="$t('msg.login.save')"></el-checkbox>
        </p>
        <!-- 账号 tips -->
        <el-scrollbar class="tips">
          <div v-html="$t('msg.login.desc')"></div>
        </el-scrollbar>
      </el-form>
    </div>
  </div>
</template>

<script setup>
// 引入vue内置函数
import { ref, watch } from 'vue'
// 引入密码验证规则函数
import { passswordValidate, usernameValidate } from './rules.js'
// 引入store对象(vuex)
import { useStore } from 'vuex'
// 获取路由
import { useRouter } from 'vue-router'
// 引入中英文切换组件
import SelectLang from '@/components/SelectLang/index.vue'
// 收集表单数据
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 查看密码标志
const passShow = ref(true)
// 标志取反
const passChange = () => {
  passShow.value = !passShow.value
}
// 表单验证
const loginFormRules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      // message: i18n.t('msg.login.usernameRule') // 没有响应式
      validator: usernameValidate()
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: passswordValidate()
    }
  ]
}
// 此ref绑定的是form表单 -- 如果放在组件拿到的就是组件对象
const loginRef = ref(null)
// 登陆逻辑函数
const store = useStore()
const router = useRouter()
const loginFn = () => {
  // 还要验证一次表单的数据是否合法
  loginRef.value.validate((validate) => {
    // 此处执行两此 -- 因为校验了两次
    if (!validate) return // 一个没有通过
    // 验证通过执行登录逻辑 -- 调用定义好的actions
    store
      .dispatch('user/login', loginForm.value) // 异步请求 ok no
      .then((res) => {
        // 只有在1登陆成功的情况员工下 执行路由跳转
        router.push('/')
      })
    // 不处理失败，因为上层已经处理
  })
}

// 重置按钮
const resetForm = () => {
  // 通过ref获取到表单数据
  const dataObj = loginRef.value.model
  for (const i in dataObj) {
    dataObj[i] = ''
  }
}
// 检测语言变化重新校验表单规则
watch(
  () => store.getters.language,
  () => {
    // 中英文切换了 重新验证规则
    loginRef.value.validateField('username') // 检验单个
    loginRef.value.validateField('password') // 检验单个
  }
)
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$ligit_gray: #eee;
$cursor: #fff;
:deep(.defaultSvgClass) {
  // 修改svg样式
  // 通过fill填充颜色
  fill: $cursor;
}
:root {
  --border-focus: 1px solid #409eff;
}
.login_box {
  background: url('../../assets/login.jpeg');
  background-size: 100% 100%;
  font-family: 宋体;
}
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;

  .login-form {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-75%, -50%);
    width: 300px;
    max-width: 100%;
    padding: 20px;
    margin: 0 auto;
    // overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      .el-form-item__content:focus {
        border-color: var(--el-color-danger);
      }
      .el-form-item__content:focus-within {
        //修改父元素样式
        border: 1px solid #409eff;
        transition: border 500ms linear 0s;
      }
      .el-form-item__content {
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        border-radius: 5px;
        .el-input__inner {
          background: transparent;
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $cursor;
          caret-color: $cursor;
        }

        .svg-container {
          padding: 6px 5px 5px 15px;
          color: $dark_gray;
          vertical-align: middle;
          display: flex;
        }
      }
    }
    .title-container {
      position: relative;
      .title {
        text-align: center;
        margin-bottom: 30px;
        font-size: 26px;
        color: $ligit_gray;
        font-weight: bold;
      }
      :deep(.select-lang) {
        position: absolute;
        top: -6px;
        right: 0px;
        border-radius: 4px;
        transition: background 0.28s;
        .is-pure {
          opacity: 0.5;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
    :deep(.el-checkbox__inner) {
      background: rgba(0, 0, 0, 0.1);
    }
    .button {
      display: flex;
      opacity: 0.8;
    }
    .tips {
      position: absolute;
      top: 0;
      left: -100%;
      margin-left: 30px;
      width: 260px;
      max-width: 100%;
      height: 26px;
      overflow-y: hidden;
      background: rgba(250, 243, 243, 0.5);
      border-radius: 10px;
      line-height: 30px;
      padding: 20px;
      transition: height 0.28s;
      font-size: 12px;
      &:hover {
        height: calc(100% - 40px);
        overflow-y: auto;
      }
    }
  }
}
</style>
