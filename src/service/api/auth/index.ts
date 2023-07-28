import { request } from '@/service/request';

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export async function fetchLogin(userName: string, password: string) {
  return request.post<ApiAuth.UserInfo>('/auth/login', { userName, password });
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export async function fetchUserRoutes(userId: string) {
  return request.get<ApiRoute.Route>('/menu', { params: { userId } });
}
