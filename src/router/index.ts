/**
 * @Description 路由页面
 * @Author luomingfeng
 * @Date 2022/2/21 23:43
 */

import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/common/login/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export async function setupRoute(app: App) {
  app.use(router)
  await router.isReady()
}
