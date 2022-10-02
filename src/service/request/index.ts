/**
 * @description axios请求
 * @author luomingfeng
 * @date 2022/4/15 20:49
 */
import { getServiceEnvConfig } from '~/.env-config';
import { createRequest } from './request';

const { http } = getServiceEnvConfig(import.meta.env);
const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createRequest({
  baseURL: isHttpProxy ? http.proxy : http.url,
  timeout: 60000
});
