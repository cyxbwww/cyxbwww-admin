<template>
  <basic-layout class="basic-layout">
    <template #header>
      <global-header />
    </template>
    <template #tab>
      <global-tab />
    </template>
    <template #sider>
      <global-sider />
    </template>
    <global-content />
    <template #footer>
      <global-footer />
    </template>
  </basic-layout>
</template>

<script setup lang="ts">
import BasicLayout from '@cyxbwww/basic-layout';
import { useAppStore } from '@/store';
import { GlobalFooter, GlobalContent, GlobalHeader, GlobalSider, GlobalTab } from '../common';

const app = useAppStore();
</script>
<style lang="scss" scoped></style>
