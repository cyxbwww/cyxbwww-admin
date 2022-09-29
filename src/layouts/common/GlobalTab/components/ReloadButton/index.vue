<template>
  <hover-container class="w-64px h-full" tooltip-content="重新加载" placement="bottom-end" @click="handleRefresh">
    <icon-mdi-refresh class="text-22px" />
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';

defineOptions({ name: 'ReloadButton' });

const app = useAppStore();

function handleRefresh() {
  app.reloadPage();
}
</script>

<style scoped></style>
