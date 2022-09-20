<template>
  <dark-mode-container class="global-sider flex-col-stretch h-full">
    <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden pt-14px" :class="{ 'is-left': showTitle }">
      <n-avatar round src="/src/assets/img/logo.png" />
      <h2 v-show="showTitle" class="pl-8px text-16px transition duration-300 ease-in-out">博客管理后台</h2>
    </router-link>
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
import { routePath } from '@/router';
import { useAppStore, useRouteStore, useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';

const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();
const routeHomePath = routePath('root');

const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix');

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
.global-sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);

  .is-left {
    margin-left: -28px;
  }
}
</style>
