<template>
  <div class="basic-layout">
    <header class="basic-layout__header" :class="{ min: app.siderCollapse }">
      <global-header />
    </header>
    <div class="basic-layout__tab" :class="{ min: app.siderCollapse }">
      <global-tab />
    </div>
    <aside class="basic-layout__sider" :class="{ min: app.siderCollapse }">
      <global-sider />
    </aside>
    <main class="basic-layout__content" :class="{ min: app.siderCollapse }">
      <global-content />
    </main>
    <footer class="basic-layout__footer" :class="{ min: app.siderCollapse }">
      <global-footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { GlobalFooter, GlobalContent, GlobalHeader, GlobalSider, GlobalTab } from '../common';

const app = useAppStore();
</script>
<style lang="scss" scoped>
.basic-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__header {
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    padding-left: 220px;
    width: 100%;
    height: 56px;
    transition-property: padding-left;

    &.min {
      padding-left: 56px;
    }
  }

  &__tab {
    position: fixed;
    z-index: 999;
    top: 56px;
    left: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    padding-left: 220px;

    &.min {
      padding-left: 56px;
    }
  }

  &__sider {
    position: fixed;
    z-index: 1003;
    top: 0;
    left: 0;
    bottom: 0;
    width: 220px;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);

    &.min {
      width: 56px;
    }
  }

  &__content {
    flex-grow: 1;
    padding: 100px 0 0 220px;
    width: 100%;
    box-sizing: border-box;
    transition-property: padding-left;
    overflow: visible;

    &.min {
      padding-left: 56px;
    }
  }

  &__footer {
    position: static;
    z-index: 998;
    left: 0;
    bottom: 0;
    flex-shrink: 0;
    padding-left: 220px;
    width: 100%;
    height: 48px;

    &.min {
      padding-left: 56px;
    }
  }
}
</style>
