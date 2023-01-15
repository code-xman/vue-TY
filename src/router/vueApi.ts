import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/vueApi/slot',
    component: () => import('@/pages/vueApi/slot/index.vue')
  },
  {
    path: '/vueApi/provideInject',
    component: () => import('@/pages/vueApi/provideInject/index.vue')
  },
];

export default routes;
