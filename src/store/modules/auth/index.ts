/**
 * @Description 用户相关
 * @Author luomingfeng
 * @Date 2022/4/17 15:18
 */

import { router as globalRouter } from '@/router';
import { routeName } from '@/router';
import { setUserInfo, setToken, getUserInfo, getToken, clearAuthStorage, useRouterPush } from '@/utils';
import { fetchLogin } from '@/service/api';

interface AuthState {
  // 用户信息
  userInfo: Auth.UserInfo;
  // 用户token
  token: string;
  // 登录的加载状态
  loading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loading: false
  }),
  getters: {
    // 是否登录
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    // 登录
    async login(params: object) {
      try {
        const { toLoginRedirect } = useRouterPush(false);
        this.loading = true;
        const {
          data: { userInfo, token }
        } = await fetchLogin(params);
        if (token) {
          // 储存 token 和 userInfo
          setToken(token);
          setUserInfo(userInfo);

          // 更新状态
          Object.assign(this, { userInfo, token });

          // 欢迎提示
          window.$notification?.success({
            title: '登录成功!',
            content: `欢迎回来，${userInfo.name}!`,
            duration: 3000
          });

          // 跳转登录后的地址
          await toLoginRedirect();
        } else {
          // 重置状态
          await this.resetAuthStore();
        }
      } finally {
        this.loading = false;
      }
    },
    // 重置状态
    async resetAuthStore() {
      const { routerPush } = useRouterPush(false);
      const route = unref(globalRouter.currentRoute);
      const { query } = route;

      clearAuthStorage();
      this.$reset();
      if (route.meta.requiresAuth) {
        await routerPush({
          name: routeName('login'),
          query: {
            redirect: query?.redirect as string
          }
        });
      }
    }
  }
});
