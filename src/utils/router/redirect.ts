import type { RouteLocationRaw } from 'vue-router';
import { router as globalRouter, routeName } from '@/router';

export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter;
  const route = globalRouter.currentRoute;

  // 路由跳转
  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to);
      window.open(routerData.href, '_blank');
    } else {
      router.push(to);
    }
  }

  // 返回上一级路由
  function routerBack() {
    router.go(-1);
  }

  // 跳转首页
  function toHome(newTab = false) {
    routerPush({ name: 'root' }, newTab);
  }

  // 登录页切换其他模块
  function toLoginModule(module: EnumType.LoginModuleKey) {
    const { query } = route.value;
    routerPush({ name: routeName('login'), params: { module }, query });
  }

  // 登录成功后跳转重定向的地址
  function toLoginRedirect() {
    const { query } = route.value;
    if (query?.redirect) {
      routerPush(query.redirect as string);
    } else {
      toHome();
    }
  }

  return {
    routerPush,
    routerBack,
    toHome,
    toLoginModule,
    toLoginRedirect
  };
}
