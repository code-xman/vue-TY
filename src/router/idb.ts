import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/IDB/test',
    name: 'IDB_test',
    meta: { title: '前端数据库 IndexedDB', },
    component: () => import('@/pages/IDB/test.vue')
  },
];

export default routes;