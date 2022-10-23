import { request } from '@/service/request';

/** 获取用户列表 */
export const fetchUserList = async () => {
  return request.post<ApiUserManagement.User[] | null>('/user/getUserList');
};
