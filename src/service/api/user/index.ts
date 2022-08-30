import { request } from '@/service/request';

// 登录
export async function fetchLogin(data: object) {
  return request.post('/user/login', data);
}

// 用户路由
export async function fetchUserRoutes(data: object) {
  return request.post('/user/menu', data);
}

// 发送验证码
export async function fetchSmsCode(userId: number | string) {
  console.log(userId);
  return request.post('/user/login');
}
