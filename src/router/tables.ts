import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/table/sortTable',
    component: () => import('@/pages/table/sortTable.vue')
  },
];

export default routes;
