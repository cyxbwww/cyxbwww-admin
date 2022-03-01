/**
 * @Description 路由页面
 * @Author luomingfeng
 * @Date 2022/2/21 23:43
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/common/login/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
