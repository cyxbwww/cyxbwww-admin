/**
 * @description 路由页面
 * @author luomingfeng
 * @date 2022/4/28 16:36
 */
import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { transformAuthRoutesToVueRoutes, transformRouteNameToRoutePath } from '@/utils';
import { createRouterGuard } from './guard';
import { constantRoutes } from './routes';

export const router = createRouter({
  history: createWebHistory(),
  routes: transformAuthRoutesToVueRoutes(constantRoutes)
});

export async function setupRoute(app: App) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}

/** 路由名称 */
export const routeName = (key: AuthRoute.RouteKey) => key;
/** 路由路径 */
export const routePath = (key: Exclude<AuthRoute.RouteKey, 'not-found-page'>) => transformRouteNameToRoutePath(key);

export * from './routes';
export * from './modules';
