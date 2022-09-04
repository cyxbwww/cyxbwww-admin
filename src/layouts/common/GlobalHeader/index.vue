<template>
  <dark-mode-container class="global-header flex justify-end h-full">
    <n-dropdown :options="options" @select="handleDropdown">
      <hover-container class="flex-center cursor-pointer px-12px">
        <n-avatar round :size="36" src="/favicon.ico" />
        <span class="pl-8px text-16px font-medium">{{ auth.userInfo.userName }}</span>
      </hover-container>
    </n-dropdown>
  </dark-mode-container>
</template>

<script setup lang="ts">
import type { DropdownOption } from 'naive-ui';
import { useAuthStore } from '@/store';
import { iconifyRender } from '@/utils';

const auth = useAuthStore();

const options: DropdownOption[] = [
  {
    label: '用户中心',
    key: 'user-center',
    icon: iconifyRender('carbon:user-avatar')
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: iconifyRender('carbon:logout')
  }
];

type DropdownKey = 'user-center' | 'logout';

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === 'logout') {
    window.$dialog?.info({
      title: '提示',
      content: '您确定要退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        auth.resetAuthStore();
      }
    });
  }
}
</script>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
