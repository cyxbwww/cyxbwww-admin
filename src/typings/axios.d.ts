import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    // 是否显示加载中
    loading?: boolean;
    // 是否转换application/json
    isJson?: boolean;
    // 是否转换application/x-www-form-urlencoded
    isFormUrlencoded?: boolean;
    // 是否转换multipart/form-data
    isFormData?: boolean;
    // 是否加密
    encrypt?: boolean;
  }
}
