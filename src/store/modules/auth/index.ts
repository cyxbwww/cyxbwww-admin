/**
 * @description 用户相关
 * @author luomingfeng
 * @date 2022/4/17 15:18
 */

import { router as globalRouter } from '@/router';
import { useRouteStore } from '@/store';
import { fetchLogin } from '@/service';
import { setUserInfo, setToken, getUserInfo, getToken, clearAuthStorage } from '@/utils';
import { useRouterPush } from '@/composables';
import { useTabStore } from '../tab';

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo;
  /** 用户token */
  token: string;
  /** 登录的加载状态 */
  loading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loading: false
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    /** 登录 */
    async login(username: string, password: string) {
      this.loading = true;

      const { toLoginRedirect } = useRouterPush(false);
      const { data } = await fetchLogin(username, password);

      this.loading = false;

      if (data) {
        const { token, userInfo } = data;
        // 储存 token 和 userInfo
        setToken(token);
        setUserInfo(userInfo);

        // 更新状态
        Object.assign(this, { userInfo, token });

        // 跳转登录后的地址
        toLoginRedirect();

        // 欢迎提示
        window.$notification?.success({
          title: '登录成功!',
          content: `欢迎回来，${userInfo.userName}!`,
          duration: 3000
        });

        return;
      }

      // 不成功则重置状态
      await this.resetAuthStore();
    },
    /** 重置auth状态 */
    async resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(globalRouter.currentRoute);

      resetTabStore();
      resetRouteStore();

      clearAuthStorage();
      this.$reset();
      if (route.meta.requiresAuth) {
        toLogin();
      }
    }
  }
});
