<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="username">
      <n-input v-model:value="model.username" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item path="password">
      <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="请输入密码" />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true" @click="toLoginModule('reset-pwd')">忘记密码？</n-button>
      </div>
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="authStore.loading"
        @click="handleSubmit"
      >
        确定
      </n-button>
      <div class="flex-y-center justify-between">
        <n-button class="flex-1" :block="true" @click="toLoginModule('code-login')">
          {{ EnumLoginModule['code-login'] }}
        </n-button>
        <div class="w-12px" />
        <n-button class="flex-1" :block="true" @click="toLoginModule('register')">
          {{ EnumLoginModule.register }}
        </n-button>
      </div>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import type { FormInst, FormRules } from 'naive-ui';
import { EnumLoginModule } from '@/enum';
import { useAuthStore } from '@/store';
import { useRouterPush, formRules } from '@/utils';

const authStore = useAuthStore();
const { login } = authStore;
const { toLoginModule } = useRouterPush();

const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive({
  username: '',
  password: ''
});
const rules: FormRules = {
  username: formRules.username,
  password: formRules.password
};
const rememberMe = ref(false);

function handleSubmit() {
  if (!formRef.value) return;
  formRef.value.validate(errors => {
    if (errors) return;
    const { username, password } = model;
    login(username, password);
  });
}
</script>

<style lang="scss" scoped></style>
