<template>
  <hover-container
    tooltip-content="GitHub"
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="handleClickLink"
  >
    <icon-mdi-github class="text-20px" />
  </hover-container>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store';

defineOptions({ name: 'GithubSite' });

const theme = useThemeStore();
function handleClickLink() {
  window.open('https://github.com/cyxbwww/vue-blog-manager', '_blank');
}
</script>

<style scoped></style>
