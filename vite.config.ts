import { defineConfig } from 'vite';
// element 自动按需引入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
      },
    },
  },
  // 开发服务
  server: {
    host: '0.0.0.0', // 如需内网共享访问，可设置为 0.0.0.0
    port: 8083, // 默认端口
    open: false, // 开发服务启动成功自动在浏览器中打开
  },
  plugins: [
    vue(),
    vueJsx(),
    // element 自动按需引入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
