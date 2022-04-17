/**
 * @Description 用户相关
 * @Author luomingfeng
 * @Date 2022/4/17 15:18
 */

import { defineStore } from 'pinia'
import { getUserInfo, getToken } from '@/utils'
import { fetchLogin } from '@/service/api'

interface AuthState {
  // 用户信息
  userInfo: Auth.UserInfo
  // 用户token
  token: string
  // 登录的加载状态
  loading: boolean
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loading: false,
  }),
  getters: {
    // 是否登录
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    // 登录
    async login(params: object) {
      this.loading = true
      const { data } = await fetchLogin(params)
      if (data) {
        // todo
      }
      this.loading = false
    },
  },
})
