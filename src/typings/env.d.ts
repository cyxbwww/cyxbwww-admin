declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<object, object, any>;
  export default component;
}

/**
 * env环境类型
 * - dev: 开发环境
 * - test: 测试环境
 * - pre: 预生产环境
 * - prod: 生产环境
 */
type EnvType = 'dev' | 'test' | 'prod';

interface ImportMetaEnv {
  // 项目基本地址
  readonly VITE_BASE_URL: string;
  // vite环境类型
  readonly VITE_ENV_TYPE?: EnvType;
  // 开启请求代理
  readonly VITE_HTTP_PROXY?: 'true' | 'false';
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   * */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic';
  // 是否开启打包文件大小结果分析
  readonly VITE_VISUALIZER?: 'true' | 'false';
}
