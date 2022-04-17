/**
 * @Description 路由页面
 * @Author luomingfeng
 * @Date 2022/2/21 23:43
 */

import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './constant'

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

export async function setupRoute(app: App) {
  app.use(router)
  await router.isReady()
}
