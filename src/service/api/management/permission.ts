import { request } from '@/service/request';

/** 获取权限列表 */
export const fetchPermissionList = async data => {
  return request.post('/permission/getPermissionList', data);
};
