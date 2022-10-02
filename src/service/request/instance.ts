/**
 * @description 封装 axios 请求类
 * @author luomingfeng
 * @date 2022/5/1 11:37
 */
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import axios from 'axios';
import {
  getToken,
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData
} from '@/utils';

/**
 * @param axiosConfig - axios配置
 * @param backendConfig - 后端返回的数据配置
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance;
  backendConfig: Service.BackendResultConfig;

  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'message',
      successCode: 0
    }
  ) {
    this.instance = axios.create(axiosConfig);
    this.backendConfig = backendConfig;
    this.setInterceptor();
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async config => {
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as string;
          handleConfig.data = await transformRequestData(handleConfig.data, contentType);
          // 设置token
          handleConfig.headers.Authorization = getToken();
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );

    this.instance.interceptors.response.use(
      async response => {
        const { status } = response;

        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeKey, dataKey, successCode } = this.backendConfig;

          // 请求成功
          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend[dataKey]);
          }

          const error = handleBackendError(backend, this.backendConfig);
          return handleServiceResult(error, null);
        }

        const error = handleResponseError(response);
        return handleServiceResult(error, null);
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
