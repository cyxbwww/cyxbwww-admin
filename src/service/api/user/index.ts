import { request } from '@/service/request'

/**
 * @Description 登录
 * @Author luomingfeng
 */
export async function fetchLogin(data: object) {
  return request.post('/user/login', data)
}
