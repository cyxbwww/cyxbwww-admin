<template>
  <n-drawer :show="app.settingDrawerVisible" display-directive="show" :width="330" @mask-click="app.closeSettingDrawer">
    <n-drawer-content title="主题配置" :native-scrollbar="false">
      <dark-mode />
    </n-drawer-content>
  </n-drawer>
  <drawer-button v-if="showButton" />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { DarkMode, DrawerButton } from './components';

defineOptions({ name: 'SettingDrawer' });

const app = useAppStore();

const showButton = import.meta.env.DEV;
</script>

<style scoped></style>
