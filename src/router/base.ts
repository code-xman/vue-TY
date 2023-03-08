import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/helloworld',
  },
  {
    path: '/helloworld',
    name: 'helloworld',
    component: () => import('@/pages/HelloWorld.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404.vue')
  }
];

export default routes;
