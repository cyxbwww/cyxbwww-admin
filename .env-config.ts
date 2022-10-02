/**
 * @description 请求环境配置
 * @author luomingfeng
 * @date 2022/4/16 0:08
 */

/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>;

/** 不同请求服务的环境配置 */
const serviceEnvConfig: ServiceEnv = {
  dev: {
    url: 'http://localhost:7001',
    proxy: '/api'
  },
  test: {
    url: 'http://localhost:7001',
    proxy: '/api'
  },
  pre: {
    url: 'http://localhost:7001',
    proxy: '/api'
  },
  prod: {
    url: 'http://localhost:7001',
    proxy: '/api'
  }
};

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv) {
  const { VITE_ENV_TYPE = 'dev' } = env;
  return {
    http: serviceEnvConfig[VITE_ENV_TYPE]
  };
}
