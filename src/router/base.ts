import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/helloworld',
    meta: {
      title: '首页',
    },
  },
  {
    path: '/helloworld',
    name: 'helloworld',
    meta: {
      title: '首页',
    },
    component: () => import('@/pages/HelloWorld.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
    },
    component: () => import('@/pages/404.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    meta: {
      title: '测试2',
    },
    component: () => import('@/pages/test2.vue')
  }
];

export default routes;
