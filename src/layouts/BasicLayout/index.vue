<template>
  <basic-layout
    :mode="mode"
    :fixed-header-and-tab="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :sider-visible="siderVisible"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :sider-collapse="app.siderCollapse"
    :add-main-overflow-hidden="addMainOverflowHidden"
    :fixed-footer="theme.footer.fixed"
    @update:sider-collapse="app.setSiderCollapse"
  >
    <template #header>
      <global-header v-bind="headerProps" />
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
  <setting-drawer />
</template>

<script setup lang="ts">
import BasicLayout from '@cyxbwww/basic-layout';
import { useAppStore, useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import { useBoolean } from '@/hooks';
import { GlobalFooter, GlobalContent, GlobalHeader, GlobalSider, GlobalTab, SettingDrawer } from '../common';

defineOptions({ name: 'BasicLayout' });

const app = useAppStore();
const theme = useThemeStore();

const { mode, headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();
const { bool: addMainOverflowHidden, setBool: setAddMainOverflowHidden } = useBoolean();
</script>
<style lang="scss" scoped></style>
