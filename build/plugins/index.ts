import type { PluginOption } from 'vite';
import vue from './vue';
import visualizer from './visualizer';
import unocss from './unocss';
import unplugin from './unplugin';

/**
 * @description vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins = [vue, ...unplugin(), unocss];

  if (viteEnv.VITE_VISUALIZER === 'Y') {
    plugins.push(visualizer);
  }

  return plugins;
}
