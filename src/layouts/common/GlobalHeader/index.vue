<template>
  <dark-mode-container class="global-header flex-y-center h-full" :inverted="theme.header.inverted">
    <global-logo v-if="showLogo" :show-title="true" class="h-full" :style="{ width: theme.sider.width + 'px' }" />
    <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
      <menu-collapse />
      <global-breadcrumb v-if="theme.header.crumb.visible" />
    </div>
    <header-menu v-else />
    <div class="flex justify-end h-full">
      <github-site />
      <full-screen />
      <user-avatar />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store';
import { GlobalLogo } from '@/layouts/common';
import { FullScreen, GithubSite, GlobalBreadcrumb, HeaderMenu, MenuCollapse, UserAvatar } from './components';

defineOptions({ name: 'GlobalHeader' });

interface Props {
  /** 显示logo */
  showLogo: GlobalHeaderProps['showLogo'];
  /** 显示头部菜单 */
  showHeaderMenu: GlobalHeaderProps['showHeaderMenu'];
  /** 显示菜单折叠按钮 */
  showMenuCollapse: GlobalHeaderProps['showMenuCollapse'];
}

withDefaults(defineProps<Props>(), {
  showLogo: false,
  showHeaderMenu: false,
  showMenuCollapse: true
});

const theme = useThemeStore();
</script>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
