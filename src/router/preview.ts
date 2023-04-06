import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/preview/pdf',
    name: 'previewPDF',
    meta: {
      title: '预览PDF',
    },
    component: () => import('@/pages/preview/PDF.vue')
  },
];

export default routes;
