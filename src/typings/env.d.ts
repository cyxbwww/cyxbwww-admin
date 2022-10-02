/**
 * env环境类型
 * - dev: 开发环境
 * - test: 测试环境
 * - pre: 预生产环境
 * - prod: 生产环境
 */
type ServiceEnvType = 'dev' | 'test' | 'pre' | 'prod';

/** 后台服务的环境配置 */
interface ServiceEnvConfig {
  /** 请求地址 */
  url: string;
  /** 代理地址 */
  proxy: string;
}

interface ImportMetaEnv {
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** 后端服务的环境类型 */
  readonly VITE_ENV_TYPE?: ServiceEnvType;
  /** 开启请求代理 */
  readonly VITE_HTTP_PROXY?: 'Y' | 'N';
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   * */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic';
  /** 路由首页的路径 */
  readonly VITE_ROUTE_HOME_PATH: Exclude<AuthRoute.RoutePath, '/' | '/not-found-page' | '/:pathMatch(.*)*'>;
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_VISUALIZER?: 'Y' | 'N';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
