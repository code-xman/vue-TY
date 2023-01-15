import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/form/showBaseForm',
    component: () => import('@/components/form/showBaseForm.vue')
  },
  {
    path: '/form/form-1',
    component: () => import('@/pages/form/form-1.vue')
  },
];

export default routes;
