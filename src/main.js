import { createApp } from 'vue';
// pinia
import { createPinia } from 'pinia'
// element 全局引入 --> 自动按需引入
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// css
// import './style.css';

// element 样式
import 'element-plus/dist/index.css';
// import 'element-plus/es/components/message/style/css'
// 全局共用样式
import '@/common/style/index.less';
// app
import App from './App.vue';
// 路由
import router from '@/router';

// 自动注册的公用组件
import myUI from './baseComponents';

// mock
import '../mock/index';

// drag
import drag from 'v-drag';

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(myUI)
  .use(drag, {
    // global configuration
  })
  .mount('#app');
