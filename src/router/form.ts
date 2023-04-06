import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/form/showBaseForm',
    name: 'formShowBaseForm',
    meta: {
      title: '基础表单',
    },
    component: () => import('@/components/form/showBaseForm.vue')
  },
  {
    path: '/form/form-1',
    name: 'formForm1',
    meta: {
      title: '表单一',
    },
    component: () => import('@/pages/form/form-1.vue')
  },
  {
    path: '/form/StepForm',
    name: 'StepForm',
    meta: {
      title: '步骤表单',
    },
    component: () => import('@/pages/form/StepForm.vue')
  },
];

export default routes;
