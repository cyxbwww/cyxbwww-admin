import type { Router } from 'vue-router';
import { createPermissionGuard } from './permission';

// 路由守卫
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next, router);
  });
  router.afterEach(to => {
    // 设置 document title
    document.title = to.meta.title;
  });
}
