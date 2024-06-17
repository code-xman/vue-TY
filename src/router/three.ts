import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/three',
    name: 'Three',
    meta: {
      title: 'ThreeJS',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: 'demo1',
        name: 'Demo1',
        meta: {
          title: 'Demo1',
        },
        component: () => import('@/pages/three/Demo1.vue'),
      },
      {
        path: 'demo2',
        name: 'Demo2',
        meta: {
          title: 'Demo2',
        },
        component: () => import('@/pages/three/Demo2.vue'),
      },
    ],
  },
];

export default routes;
