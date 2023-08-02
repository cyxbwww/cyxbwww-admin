import { request } from '@/service/request';

/** 获取路由列表 */
export const fetchRouteList = async () => {
  return request.post<ApiRouteManagement.Route[] | null>('/route/getRouteList');
};

/** 添加路由 */
export const fetchCreateRoute = async data => {
  return request.post<ApiRouteManagement.Route[] | null>('/route/createRoute', data);
};

/** 更新路由 */
export const fetchUpdateRoute = async data => {
  return request.post<ApiRouteManagement.Route[] | null>('/route/updateRoute', data);
};

/** 删除路由 */
export const fetchDeleteRoute = async data => {
  return request.post<ApiRouteManagement.Route[] | null>('/route/deleteRoute', data);
};
