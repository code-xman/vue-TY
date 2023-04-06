import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/table/sortTable',
    meta: {
      title: '表格拖动排序',
    },
    component: () => import('@/pages/table/sortTable.vue')
  },
];

export default routes;
