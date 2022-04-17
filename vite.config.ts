/**
 * @Description vite配置
 * @Author luomingfeng
 * @Date 2022/3/10 22:06
 */

import { defineConfig, loadEnv } from 'vite'
import { createViteProxy } from './src/config'
import { fileURLToPath } from 'url'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

function resolvePath(rootPath: string, basePath: string) {
  const root = fileURLToPath(new URL(rootPath, basePath))
  const src = `${root}src`

  return {
    root,
    src,
  }
}

// https://vitejs.cn/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const vitePath = resolvePath('./', import.meta.url)

  return {
    base: viteEnv.VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 8888,
      proxy: createViteProxy(viteEnv),
    },
    plugins: [
      vue(),
      Components({
        dirs: ['src/components'], // 按需加载的文件夹
        resolvers: [NaiveUiResolver()], // NaiveUI按需加载
      }),
    ],
    resolve: {
      alias: {
        '~': vitePath.root,
        '@': vitePath.src,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/scss/global.scss";',
        },
      },
    },
    build: {
      outDir: 'dist', //指定输出路径
      assetsDir: 'assets', //指定生成静态资源的存放路径
    },
  }
})
