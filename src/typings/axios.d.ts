import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** 是否显示加载中 */
    loading?: boolean;
  }
}
