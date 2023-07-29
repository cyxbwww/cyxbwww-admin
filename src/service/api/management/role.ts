import { request } from '@/service/request';

/** 获取角色列表 */
export const fetchRoleList = async data => {
  return request.post<ApiRoleManagment.Role[] | null>('/role/getRoleList', data);
};

/** 添加角色 */
export const fetchCreateRole = async data => {
  return request.post<ApiRoleManagment.Role[] | null>('/role/createRole', data);
};

/** 更新角色 */
export const fetchUpdateRole = async data => {
  return request.post<ApiRoleManagment.Role[] | null>('/role/updateRole', data);
};

/** 删除角色 */
export const fetchDeleteRole = async data => {
  return request.post<ApiRoleManagment.Role[] | null>('/role/deleteRole', data);
};
