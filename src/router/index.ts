/**
 * @Description 路由页面
 * @Author luomingfeng
 * @Date 2022/4/28 16:36
 */
import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { transformAuthRoutesToVueRoutes } from '@/utils';
import { createRouterGuard } from './guard';
import { constantRoutes } from './constant';

export const router = createRouter({
  history: createWebHistory(),
  routes: transformAuthRoutesToVueRoutes(constantRoutes)
});

export async function setupRoute(app: App) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}

// 路由名称
export const routeName = (key: AuthRoute.RouteKey) => key;

export * from './constant';
export * from './modules';
