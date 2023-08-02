import { request } from '@/service/request';

/** 获取权限列表 */
export const fetchPermissionList = async data => {
  return request.post<ApiPermissionManagement.Permission[] | null>('/permission/getPermissionList', data);
};

/** 添加权限 */
export const fetchCreatePermission = async data => {
  return request.post<ApiPermissionManagement.Permission[] | null>('/permission/createPermission', data);
};

/** 更新权限 */
export const fetchUpdatePermission = async data => {
  return request.post<ApiPermissionManagement.Permission[] | null>('/permission/updatePermission', data);
};

/** 删除权限 */
export const fetchDeletePermission = async data => {
  return request.post<ApiPermissionManagement.Permission[] | null>('/permission/deletePermission', data);
};
