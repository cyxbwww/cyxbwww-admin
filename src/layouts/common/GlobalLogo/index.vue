<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden">
    <n-avatar round src="/src/assets/img/logo.png" />
    <h2 v-show="showTitle" class="pl-8px text-16px transition duration-300 ease-in-out">博客管理后台</h2>
  </router-link>
</template>

<script setup lang="ts">
import { routePath } from '@/router';

defineOptions({ name: 'GlobalLogo' });

interface Props {
  /** 显示名字 */
  showTitle: boolean;
}

defineProps<Props>();

const routeHomePath = routePath('root');
</script>

<style scoped></style>
