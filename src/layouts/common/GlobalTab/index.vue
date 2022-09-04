<template>
  <dark-mode-container class="global-tab flex-y-center w-full pl-16px"> tab </dark-mode-container>
</template>

<script setup lang="ts">
import { useTabStore } from '@/store';
const route = useRoute();
const tab = useTabStore();

function init() {
  tab.iniTabStore(route);
}

watch(
  () => route.fullPath,
  () => {
    tab.addTab(route);
    tab.setActiveTab(route.fullPath);
  }
);

// 初始化
init();
</script>

<style scoped></style>
