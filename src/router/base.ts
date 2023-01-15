import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/helloworld',
  },
  {
    path: '/helloworld',
    component: () => import('@/pages/HelloWorld.vue')
  },
  {
    path: '/404',
    component: () => import('@/pages/404.vue')
  }
];

export default routes;
