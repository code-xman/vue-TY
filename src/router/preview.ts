import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/preview/pdf',
    name: 'previewPDF',
    component: () => import('@/pages/preview/PDF.vue')
  },
];

export default routes;
