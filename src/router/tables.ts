import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/table',
    name: 'Table',
    meta: {
      title: '表格',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: 'sortTable',
        name: 'SortTable',
        meta: {
          title: '表格拖动排序',
        },
        component: () => import('@/pages/table/SortTable/index.vue')
      }
    ]
  }
];

export default routes;
