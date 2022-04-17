import qs from 'qs'
import { AxiosError } from 'axios'
import {
  NO_ERROR_MSG_CODE,
  ERROR_MSG_DURATION,
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG,
  ERROR_STATUS,
} from '@/config'
import { EnumContentType } from '@/enum'
import { consoleWarn, exeStrategyActions } from '@/utils'

type ErrorStatus = keyof typeof ERROR_STATUS

// 错误消息栈，防止同一错误同时出现
const errorMsgStack = new Map<string | number, string>([])

/**
 * @Description 统一失败和成功的请求结果的数据类型
 * @param error
 * @param data
 */
export async function handleServiceResult<T>(
  error: Service.RequestError | null,
  data: any
) {
  if (error) {
    const fail: Service.FailedResult = {
      error,
      data: null,
    }
    return fail
  }
  const success: Service.SuccessResult<T> = {
    error: null,
    data,
  }
  return success
}

/**
 * @Description 处理后端返回的错误(业务错误)
 * @param backendResult - 后端接口的响应数据
 * @param config - 后端返回的数据配置
 */
export function handleBackendError(
  backendResult: Record<string, any>,
  config: Service.BackendResultConfig
) {
  const { codeKey, msgKey } = config
  const error: Service.RequestError = {
    type: 'backend',
    code: backendResult[codeKey],
    msg: backendResult[msgKey],
  }

  showErrorMsg(error)

  return error
}

/**
 * @Description 处理axios请求失败的错误
 * @param axiosError - 错误
 */
export function handleAxiosError(axiosError: AxiosError) {
  const error: Service.RequestError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG,
  }

  const actions: Common.StrategyAction[] = [
    [
      // 网络错误
      !window.navigator.onLine || axiosError.message === 'Network Error',
      () => {
        Object.assign(error, {
          code: NETWORK_ERROR_CODE,
          msg: NETWORK_ERROR_MSG,
        })
      },
    ],
    [
      // 超时错误
      axiosError.code === REQUEST_TIMEOUT_CODE &&
        axiosError.message.includes('timeout'),
      () => {
        Object.assign(error, {
          code: REQUEST_TIMEOUT_CODE,
          msg: REQUEST_TIMEOUT_MSG,
        })
      },
    ],
    [
      // 请求不成功的错误
      Boolean(axiosError.response),
      () => {
        const errorCode: ErrorStatus =
          (axiosError.response?.status as ErrorStatus) || 'DEFAULT'
        const msg = ERROR_STATUS[errorCode]
        Object.assign(error, { code: errorCode, msg })
      },
    ],
  ]

  exeStrategyActions(actions)

  showErrorMsg(error)

  return error
}

/**
 * @Description 显示错误信息
 * @param error
 */
function showErrorMsg(error: Service.RequestError) {
  if (!error.msg) return
  if (!NO_ERROR_MSG_CODE.includes(error.code)) {
    if (!hasErrorMsg(error)) {
      addErrorMsg(error)
      consoleWarn(error.code, error.msg)
      window.$message?.error(error.msg, { duration: ERROR_MSG_DURATION })
      setTimeout(() => {
        removeErrorMsg(error)
      }, ERROR_MSG_DURATION)
    }
  }
}

function hasErrorMsg(error: Service.RequestError) {
  return errorMsgStack.has(error.code)
}

function addErrorMsg(error: Service.RequestError) {
  errorMsgStack.set(error.code, error.msg)
}

function removeErrorMsg(error: Service.RequestError) {
  errorMsgStack.delete(error.code)
}

/**
 * @Description 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export async function transformRequestData(
  requestData: any,
  contentType?: string
) {
  // application/json类型不处理
  let data = requestData
  // form类型转换
  if (contentType === EnumContentType.formUrlencoded) {
    data = qs.stringify(requestData)
  }
  // form-data类型转换
  if (contentType === EnumContentType.formData) {
    const key = Object.keys(requestData)[0]
    const file = requestData.data[key]
    data = await transformFile(file, key)
  }
  return data
}

/**
 * @Description 接口为上传文件的类型时数据转换
 * @param file - 文件
 * @param key - 文件的属性名
 */
async function transformFile(file: File, key: string) {
  const formData = new FormData()
  await formData.append(key, file)
  return formData
}
