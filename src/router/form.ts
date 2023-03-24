import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/form/showBaseForm',
    name: 'formShowBaseForm',
    component: () => import('@/components/form/showBaseForm.vue')
  },
  {
    path: '/form/form-1',
    name: 'formForm1',
    component: () => import('@/pages/form/form-1.vue')
  },
  {
    path: '/form/StepForm',
    name: 'StepForm',
    component: () => import('@/pages/form/StepForm.vue')
  },
];

export default routes;
