/**
 * @Description vite配置
 * @Author luomingfeng
 * @Date 2022/3/10 22:06
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 8888,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
})
