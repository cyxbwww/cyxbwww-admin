/**
 * @Description 入口文件
 * @Author luomingfeng
 * @Date 2022/3/10 0:04
 */

import { createApp } from 'vue'
import { setupAssets, setupNaiveUI } from '@/plugins'
import { setupRoute } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'

async function setupApp() {
  // 引入静态资源
  setupAssets()

  const app = createApp(App)

  // 挂载pinia状态
  setupStore(app)

  // 按需引入naiveUI
  setupNaiveUI(app)

  // 挂载路由
  await setupRoute(app)

  app.mount('#app')
}

await setupApp()
