import { request } from '@/service/request';

/** 获取用户列表 */
export const fetchUserList = async data => {
  return request.post<ApiUserManagement.User[] | null>('/user/getUserList', data);
};

/** 添加用户 */
export const fetchCreateUser = async data => {
  return request.post<ApiUserManagement.User[] | null>('/user/createUser', data);
};

/** 更新用户 */
export const fetchUpdateUser = async data => {
  return request.post<ApiUserManagement.User[] | null>('/user/updateUser', data);
};
