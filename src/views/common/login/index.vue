<!--
 * @Description 登录页
 * @Author luomingfeng
 * @Date 2022/3/21 23:34
-->
<template>
  <div class="container relative wh-full">
    <n-card class="login" size="large">
      <div>
        <header>
          <n-gradient-text :size="28">博客管理后台</n-gradient-text>
        </header>
        <main>
          <h3 class="text-18px text-primary font-medium">账密登录</h3>
          <n-form ref="formRef" size="large" :model="model" :rules="rules" :show-label="false">
            <n-form-item path="phone">
              <n-input v-model:value="model.phone" placeholder="请输入手机号码" />
            </n-form-item>
            <n-form-item path="password">
              <n-input
                v-model:value="model.password"
                type="password"
                show-password-on="click"
                placeholder="请输入密码"
              />
            </n-form-item>
            <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">
              确定
            </n-button>
          </n-form>
        </main>
      </div>
    </n-card>
    <login-bg></login-bg>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import LoginBg from './LoginBg/index.vue'
import { REGEXP_PHONE, REGEXP_PWD } from '@/config'

const model = reactive({
  phone: '',
  password: '',
})
const rules: FormRules = {
  phone: [
    { required: true, message: '请输入手机号码' },
    { pattern: REGEXP_PHONE, message: '手机号码格式错误', trigger: 'input' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { pattern: REGEXP_PWD, message: '密码为8-18位数字/字符/符号，至少2种组合', trigger: 'input' },
  ],
}
const formRef = ref<(HTMLElement & FormInst) | null>(null)

function handleSubmit(e: MouseEvent) {
  if (!formRef.value) return
  e.preventDefault()

  formRef.value.validate((errors) => {
    if (!errors) {
      // todo
      console.log('登录')
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  @include flex;
  background-color: rgba(24, 160, 88, 0.1);

  .login {
    width: 425px;
    @include rounded(20px);
    @include z-index(1);

    h3 {
      font-weight: normal;
      color: $main-color;
    }
  }
}
</style>
