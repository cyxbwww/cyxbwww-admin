/**
 * @Description 初始化事件总线
 * @Author luomingfeng
 * @Date 2022/2/21 23:34
 */

import router from '@/router/router'

export const intialize = async (app: any) => {
  app.use(router)
  console.trace('router已挂载')
}
