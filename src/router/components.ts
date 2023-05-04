import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/components',
    name: 'Components',
    meta: {
      title: '组件',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: 'lightText',
        name: 'LightText',
        meta: {
          title: '高亮文字',
        },
        component: () => import('@/components/text/show.vue'),
      },
      {
        path: 'showTree',
        name: 'ShowTree',
        meta: {
          title: '树型结构',
        },
        component: () => import('@/components/tree/showTree.vue'),
      },
    ],
  },
];

export default routes;
