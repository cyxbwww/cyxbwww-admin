/**
 * @Description 获取用户信息
 * @Author luomingfeng
 * @Date 2022/4/17 15:23
 */
import { getLocal, setLocal, removeLocal } from '@/utils'
import { EnumStorageKey } from '@/enum'

export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    userId: '',
    userName: '',
    userPhone: '',
    userRole: 'test',
  }
  return getLocal<Auth.UserInfo>(EnumStorageKey['user-info']) || emptyInfo
}

// 设置token
export function setToken(token: string) {
  setLocal(EnumStorageKey.token, token)
}

// 获取token
export function getToken() {
  return getLocal<string>(EnumStorageKey.token) || ''
}

// 去除token
export function removeToken() {
  removeLocal(EnumStorageKey.token)
}
