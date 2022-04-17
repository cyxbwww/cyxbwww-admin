import { AxiosInstance, AxiosRequestConfig } from 'axios'
import CustomAxiosInstance from './instance'

type RequestMethod = 'get' | 'post' | 'put' | 'delete'

interface RequestParam {
  url: string
  method?: RequestMethod
  data?: any
  axiosConfig?: AxiosRequestConfig
}

export function createRequest(axiosConfig: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(axiosConfig)

  async function asyncRequest<T>(param: RequestParam) {
    const { axiosConfig, data, url, method = 'get' } = param
    const { instance } = customInstance
    return await getRequestResponse(instance, method, url, data, axiosConfig)
  }

  function get<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'get', axiosConfig: config })
  }

  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'post', data, axiosConfig: config })
  }

  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'put', data, axiosConfig: config })
  }

  function handleDelete<T>(url: string, config: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'delete', axiosConfig: config })
  }

  return {
    get,
    post,
    put,
    delete: handleDelete,
  }
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
    : await instance[method](url, data, config)
}
