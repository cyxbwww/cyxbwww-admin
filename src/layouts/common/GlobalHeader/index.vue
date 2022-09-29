<template>
  <dark-mode-container class="global-header flex-y-center h-full">
    <div class="flex-1-hidden flex-y-center h-full">
      <menu-collapse />
      <global-breadcrumb v-if="theme.header.crumb.visible" />
    </div>
    <div class="flex justify-end h-full">
      <github-site />
      <full-screen />
      <user-avatar />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store';
import { FullScreen, GithubSite, GlobalBreadcrumb, MenuCollapse, UserAvatar } from './components';

defineOptions({ name: 'GlobalHeader' });

const theme = useThemeStore();
</script>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
