/**
 * @Description pinia
 * @Author luomingfeng
 * @Date 2022/3/10 0:10
 */

import type { App } from 'vue'
import { createPinia } from 'pinia'

export function setupStore(app: App) {
  const store = createPinia()
  app.use(store)
}

export * from './modules'
