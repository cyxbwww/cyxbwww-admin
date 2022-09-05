<template>
  <dark-mode-container class="global-header flex-y-center h-full">
    <div class="flex-1-hidden flex-y-center h-full">
      <menu-collapse />
    </div>
    <div class="flex justify-end h-full">
      <user-avatar />
    </div>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { MenuCollapse, UserAvatar } from './components';
</script>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
