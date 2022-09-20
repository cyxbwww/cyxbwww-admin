<template>
  <dark-mode-container>
    <h1 v-if="!app.siderCollapse" class="text-18px text-primary font-bold">博客管理后台</h1>
    <n-scrollbar class="flex-1-hidden">
      <n-menu
        :value="activeKey"
        :collapsed="app.siderCollapse"
        :collapsed-width="theme.sider.collapsedWidth"
        :collapsed-icon-size="22"
        :options="menus"
        :expanded-keys="expandedKeys"
        :indent="18"
        :inverted="theme.sider.inverted"
        @update:value="handleUpdateMenu"
        @update:expanded-keys="handleUpdateExpandedKeys"
      />
    </n-scrollbar>
  </dark-mode-container>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { useAppStore, useRouteStore, useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';

const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();

const menus = computed(() => routeStore.menus as GlobalMenuOption[]);

const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);
const expandedKeys = ref<string[]>([]);

function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as GlobalMenuOption;
  routerPush(menuItem.routePath);
}

function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}
</script>

<style lang="scss" scoped>
h1 {
  padding: 10px 16px 6px;
  cursor: pointer;
}
</style>
