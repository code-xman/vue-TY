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
    ],
  },
];

export default routes;
