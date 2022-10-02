/**
 * @description axios请求
 * @author luomingfeng
 * @date 2022/4/15 20:49
 */
import { getEnvConfig } from '~/.env-config';
import { createRequest } from './request';

const { http } = getEnvConfig(import.meta.env);
const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createRequest({
  baseURL: isHttpProxy ? http.proxy : http.url,
  timeout: 60000
});
