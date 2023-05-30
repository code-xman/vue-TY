import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/form',
    name: 'Form',
    meta: {
      title: '表单',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: 'showBaseForm',
        name: 'ShowBaseForm',
        meta: {
          title: '基础表单',
        },
        component: () => import('@/components/form/showBaseForm.vue'),
      },
      {
        path: 'form-1',
        name: 'Form1',
        meta: {
          title: '表单一',
        },
        component: () => import('@/pages/form/form-1.vue'),
      },
      {
        path: 'stepForm',
        name: 'StepForm',
        meta: {
          title: '步骤表单',
        },
        component: () => import('@/pages/form/StepForm.vue'),
      },
      {
        path: 'formsValidate',
        name: 'FormsValidate',
        meta: {
          title: '多表单验证',
        },
        component: () => import('@/pages/form/formsValidate.vue'),
      }
    ],
  },
];

export default routes;
