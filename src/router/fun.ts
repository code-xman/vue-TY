import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/Fun',
    name: 'Fun',
    meta: {
      title: '功能',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: 'drag',
        name: 'Drag',
        meta: {
          title: '拖拽',
        },
        component: () => import('@/pages/fun/Drag/index.vue'),
      },
      {
        path: 'customForm',
        name: 'CustomForm',
        meta: {
          title: '自定义表单',
        },
        component: () => import('@/pages/fun/DomDrag/index.vue')
      },
    ],
  },
];

export default routes;
