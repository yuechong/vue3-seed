import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(), //按需加载
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [fileURLToPath(new URL('./src/assets/svg', import.meta.url))],
      // 指定symbolId格式
      symbolId: 'icon-[name]'

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096, //4kb
    cssCodeSplit: true, //启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/ant-design-vue')) {
            return 'ant-design-vue';
          }
          if (id.includes('node_modules/echarts')) {
            return 'echarts';
          }
          if (id.includes('node_modules')) {
            return 'vendor'; //代码分割为第三方包
          }
          // view
          if (id.includes('views/')) {
            // console.log('id',id);
            return 'views'; //代码分割为业务视图
          }
          
        
        }
        // manualChunks: {
        //   vendor:['pinia','topbar','vue','vue-router'],
        //   axios: ['axios'],
        //   'zxing':['@zxing/library'],
        //   // html2canvas: ['html2canvas'],
        //   'ant-design-vue': ['ant-design-vue']
        // }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: '8082',
    proxy: {
      '^/api/': {
        target: 'http://47.116.14.106:8808/',
        // target: 'http://10.0.0.18:8808/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
      // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      // '/socket.io': {
      //   target: 'ws://localhost:5174',
      //   ws: true
      // }
    }
    // https: {
    //   key: fs.readFileSync('localhost.key'),
    //   cert: fs.readFileSync('localhost.cert')
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // loaderOptions: {
    //   less: {
    //     lessOptions: {
    //       modifyVars: {
    //         // 这里可以自定义 antd 的主题样式
    //         // 例如修改主题颜色
    //         'primary-color': '#1DA57A',
    //       },
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
    preprocessorOptions: {
      less: {
        math: 'always', // 括号内才使用数学计算
        javascriptEnabled: true
      }
    }
  }
});
