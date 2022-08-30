import { EnumStorageKey } from '@/enum';
import { getLocal, setLocal, removeLocal } from '@/utils';

// 设置token
export function setToken(token: string) {
  setLocal(EnumStorageKey.token, token);
}

// 获取token
export function getToken() {
  return getLocal<string>(EnumStorageKey.token) || '';
}

// 去除token
export function removeToken() {
  removeLocal(EnumStorageKey.token);
}

// 获取用户信息
export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    userId: '',
    userName: '',
    userRole: 'user'
  };
  return getLocal<Auth.UserInfo>(EnumStorageKey['user-info']) || emptyInfo;
}

// 设置用户信息
export function setUserInfo(userInfo: Auth.UserInfo) {
  setLocal(EnumStorageKey['user-info'], userInfo);
}

// 去除用户信息
export function removeUserInfo() {
  removeLocal(EnumStorageKey['user-info']);
}

// 去除用户相关缓存
export function clearAuthStorage() {
  removeToken();
  removeUserInfo();
}
