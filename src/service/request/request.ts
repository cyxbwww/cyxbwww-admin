import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import CustomAxiosInstance from './instance';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestParam {
  url: string;
  method?: RequestMethod;
  data?: any;
  config?: AxiosRequestConfig;
}

export function createRequest(axiosConfig: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(axiosConfig);

  async function asyncRequest<T>(param: RequestParam) {
    const { config, data, url, method = 'get' } = param;
    const { instance } = customInstance;
    return await getRequestResponse(instance, method, url, data, config);
  }

  function get<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'get', config: config });
  }

  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'post', data, config: config });
  }

  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'put', data, config: config });
  }

  function handleDelete<T>(url: string, config: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'delete', config: config });
  }

  return {
    get,
    post,
    put,
    delete: handleDelete
  };
}

async function getRequestResponse(
  instance: AxiosInstance,
  method: RequestMethod,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  return ['get', 'delete'].includes(method)
    ? await instance[method](url, config)
    : await instance[method](url, data, config);
}
