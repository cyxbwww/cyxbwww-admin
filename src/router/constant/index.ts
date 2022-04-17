import { RouteRecordRaw } from 'vue-router'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    name: 'root',
    path: '/',
    redirect: '/dasboard',
    meta: {
      title: 'Root',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/common/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
]
