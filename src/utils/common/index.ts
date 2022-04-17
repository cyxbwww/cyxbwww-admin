import { EnumDataType } from '@/enum'

export function isNumber(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.number
}
export function isString(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.string
}
export function isBoolean(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.boolean
}
export function isNull(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.null
}
export function isUndefined(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.undefined
}
export function isObject(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.object
}
export function isArray(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.array
}
export function isDate(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.date
}
export function isRegExp(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.regexp
}
export function isSet(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.set
}
export function isMap(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.map
}

// 打印log
export function consoleLog(message?: any, ...optionalParams: any[]) {
  console.log(message, ...optionalParams)
}

// 打印警告
export function consoleWarn(message?: any, ...optionalParams: any[]) {
  console.warn(message, ...optionalParams)
}

// 打印错误
export function consoleError(message?: any, ...optionalParams: any[]) {
  console.error(message, ...optionalParams)
}

// 执行策略模式
export function exeStrategyActions(actions: Common.StrategyAction[]) {
  actions.some((item) => {
    const [flag, action] = item
    if (flag) {
      action()
    }
    return flag
  })
}
