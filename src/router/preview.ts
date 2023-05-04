import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/preview',
    name: 'Preview',
    meta: {
      title: '预览',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: 'pdf',
        name: 'PDF',
        meta: {
          title: '预览PDF',
        },
        component: () => import('@/pages/preview/PDF.vue'),
      },
    ],
  },
];

export default routes;
