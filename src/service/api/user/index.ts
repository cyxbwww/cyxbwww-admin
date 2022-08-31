import { request } from '@/service/request';

// 登录
export async function fetchLogin(username: string, password: string) {
  return request.post<ApiAuth.UserInfo>('/user/login', { username, password });
}

// 用户路由
export async function fetchUserRoutes(userId: string) {
  return request.post<ApiRoute.Route>('/user/getUserRoutes', { userId });
}
