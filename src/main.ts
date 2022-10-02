/**
 * @description 入口文件
 * @author luomingfeng
 * @date 2022/3/10 0:04
 */

import { setupAssets } from '@/plugins';
import { setupRoute } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';

async function setupApp() {
  // 引入静态资源
  setupAssets();

  const app = createApp(App);

  // 挂载pinia状态
  setupStore(app);

  // 挂载路由
  await setupRoute(app);

  app.mount('#app');
}

setupApp();
