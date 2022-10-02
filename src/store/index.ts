/**
 * @description pinia
 * @author luomingfeng
 * @date 2022/3/10 0:10
 */

import type { App } from 'vue';
import { resetSetupStore } from './plugins';

export function setupStore(app: App) {
  const store = createPinia();
  store.use(resetSetupStore);

  app.use(store);
}

export * from './modules';
export * from './subscribe';
