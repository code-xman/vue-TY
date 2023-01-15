import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/components/lightText',
    component: () => import('@/components/text/show.vue')
  },
];

export default routes;
