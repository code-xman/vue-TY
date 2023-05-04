import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/IDB',
    name: 'IDB',
    meta: {
      title: '前端数据库',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: 'test',
        name: 'Test',
        meta: { title: 'IDB_test' },
        component: () => import('@/pages/IDB/test.vue'),
      },
    ],
  },
];

export default routes;
