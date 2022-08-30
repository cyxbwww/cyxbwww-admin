<!--
 * @Description 登录页
 * @Author luomingfeng
 * @Date 2022/3/21 23:34
-->
<template>
  <div class="relative flex-center wh-full" :style="{ backgroundColor: bgColor }">
    <n-card class="z-4 !w-auto rounded-20px shadow-sm" size="large" :bordered="false">
      <div class="w-300px sm:w-360px">
        <header>
          <n-gradient-text :size="28">博客后台管理</n-gradient-text>
        </header>
        <main class="pt-20px">
          <h3 class="text-18px text-primary font-medium">{{ activeModule.label }}</h3>
          <div class="pt-24px">
            <transition name="fade-slide" mode="out-in" appear>
              <component :is="activeModule.component" />
            </transition>
          </div>
        </main>
      </div>
    </n-card>
    <login-bg :theme-color="bgThemeColor" />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { EnumLoginModule } from '@/enum';
import { useThemeStore } from '@/store';
import { getColorPalette, mixColor } from '@/utils';
import { LoginBg, PwdLogin, CodeLogin, Register, ResetPwd } from './components';

interface Props {
  // 登录模块分类
  module: EnumType.LoginModuleKey;
}

interface LoginModule {
  key: EnumType.LoginModuleKey;
  label: EnumLoginModule;
  component: Component;
}

const props = defineProps<Props>();
const theme = useThemeStore();

const modules: LoginModule[] = [
  { key: 'pwd-login', label: EnumLoginModule['pwd-login'], component: PwdLogin },
  { key: 'code-login', label: EnumLoginModule['code-login'], component: CodeLogin },
  { key: 'register', label: EnumLoginModule.register, component: Register },
  { key: 'reset-pwd', label: EnumLoginModule['reset-pwd'], component: ResetPwd }
];

const activeModule = computed(() => {
  const active: LoginModule = { ...modules[0] };
  const findItem = modules.find(item => item.key === props.module);
  if (findItem) {
    Object.assign(active, findItem);
  }
  return active;
});

const bgThemeColor = computed(() => (theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor));

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';
  const ratio = theme.darkMode ? 0.5 : 0.2;
  return mixColor(COLOR_WHITE, theme.themeColor, ratio);
});
</script>

<style lang="scss" scoped></style>
