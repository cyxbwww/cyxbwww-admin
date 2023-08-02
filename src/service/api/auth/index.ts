import { request } from '@/service/request';

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export async function fetchLogin(userName: string, password: string) {
  return request.post<ApiAuth.UserInfo>('/auth/login', { userName, password });
}

/** 获取用户路由数据 */
export async function fetchUserRoutes(data) {
  return request.post<ApiRoute.Route>('/route/getUserRoutes', data);
}
