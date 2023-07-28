import { request } from '@/service/request';

/** 获取角色列表 */
export const fetchRoleList = async () => {
  return request.post<ApiRoleManagment.Role[] | null>('/role/getRoleList');
};
