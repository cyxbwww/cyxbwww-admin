/**
 * @Description 封装axios请求类
 * @Author luomingfeng
 * @Date 2022/4/15 21:20
 */
import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import {
  handleBackendError,
  handleServiceResult,
  handleAxiosError,
  transformRequestData,
} from '@/utils'

/**
 * @param axiosConfig - axios配置
 * @param backendConfig - 后端返回的数据配置
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance
  backendConfig: Service.BackendResultConfig

  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'message',
      successCode: 0,
    }
  ) {
    this.instance = axios.create(axiosConfig)
    this.backendConfig = backendConfig
    this.setInterceptor()
  }

  // 设置拦截器
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config) => {
        const handleConfig = { ...config }
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as string
          handleConfig.data = await transformRequestData(
            handleConfig.data,
            contentType
          )
          // 设置token
          handleConfig.headers.Authorization =
            localStorage.getItem('token') ?? ''
        }
        return handleConfig
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError)
        return handleServiceResult(error, null)
      }
    )

    this.instance.interceptors.response.use(
      async (response) => {
        const backend = response.data
        const { codeKey, dataKey, successCode } = this.backendConfig
        // 请求成功
        if (backend[codeKey] === successCode) {
          return handleServiceResult(null, backend[dataKey])
        }

        const error = handleBackendError(backend, this.backendConfig)
        return handleServiceResult(error, null)
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError)
        return handleServiceResult(error, null)
      }
    )
  }
}
