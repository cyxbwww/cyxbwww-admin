/**
 * @Description 请求环境配置
 * @Author luomingfeng
 * @Date 2022/4/16 0:08
 */
type ServiceEnv = Record<
  EnvType,
  {
    // 请求地址
    url: string;
    // 代理地址
    proxy: string;
  }
>;

// 环境配置
const serviceEnvConfig: ServiceEnv = {
  dev: {
    url: 'http://localhost:7001',
    proxy: '/api'
  },
  test: {
    url: 'http://localhost:7001',
    proxy: '/api'
  },
  prod: {
    url: 'http://localhost:7001',
    proxy: '/api'
  }
};

// 获取环境配置
export function getEnvConfig(env: ImportMetaEnv) {
  const { VITE_ENV_TYPE = 'dev' } = env;
  return {
    http: serviceEnvConfig[VITE_ENV_TYPE]
  };
}
