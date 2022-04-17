/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * env环境类型
 * - dev: 后台开发环境
 * - test: 后台测试环境
 * - prod: 后台生产环境
 */
type EnvType = 'dev' | 'test' | 'prod'

interface ImportMetaEnv {
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string
  /** 项目名称 */
  readonly VITE_APP_NAME: string
  /** 项目标题 */
  readonly VITE_APP_TITLE: string
  /** 项目描述 */
  readonly VITE_APP_DESC: string
  /** vite环境类型 */
  readonly VITE_ENV_TYPE?: EnvType
  /** 开启请求代理 */
  readonly VITE_HTTP_PROXY?: 'true' | 'false'
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_VISUALIZER?: 'true' | 'false'
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
