/**
 * @description 网络代理
 * @author luomingfeng
 * @date 2022/4/16 0:29
 */

import type { ProxyOptions } from 'vite';
import { getEnvConfig } from '../../.env-config';

export function createViteProxy(viteEnv: ImportMetaEnv) {
  if (viteEnv.VITE_HTTP_PROXY === 'N') return undefined;

  const { http } = getEnvConfig(viteEnv);
  const proxy: Record<string, string | ProxyOptions> = {
    [http.proxy]: {
      target: http.url,
      changeOrigin: true
    }
  };

  return proxy;
}
