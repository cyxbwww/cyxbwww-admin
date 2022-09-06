/**
 * @Description vite配置
 * @Author luomingfeng
 * @Date 2022/3/10 22:06
 */
import { defineConfig, loadEnv } from 'vite';
import { getRootPath, getSrcPath, createViteProxy, setupVitePlugins } from './build';

// https://vitejs.cn/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;

  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath
      }
    },
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/scss/global.scss" as *;'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8888,
      proxy: createViteProxy(viteEnv)
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false
      }
    }
  };
});
