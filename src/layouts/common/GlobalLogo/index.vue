<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden pt-14px" :class="{ 'is-left': showTitle }">
    <n-avatar round src="/src/assets/img/logo.png" />
    <h2 v-show="showTitle" class="pl-8px text-16px transition duration-300 ease-in-out">博客管理后台</h2>
  </router-link>
</template>

<script setup lang="ts">
import { routePath } from '@/router';
import { useAppStore, useThemeStore } from '@/store';

defineOptions({ name: 'GlobalLogo' });

const app = useAppStore();
const routeHomePath = routePath('root');
const theme = useThemeStore();

const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix');
</script>

<style scoped></style>
