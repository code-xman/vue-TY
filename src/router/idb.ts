import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/IDB/test',
    name: 'IDB_test',
    meta: { title: 'IDB test', },
    component: () => import('@/pages/IDB/test.vue')
  },
];

export default routes;