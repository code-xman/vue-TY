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
        path: 'showTree1',
        name: 'ShowTree1',
        meta: {
          title: '树型结构1',
        },
        component: () => import('@/components/tree/showTree.vue'),
      },
      {
        path: 'showTree2',
        name: 'ShowTree2',
        meta: {
          title: '树型结构2',
        },
        component: () => import('@/pages/tree/showTree2.vue'),
      },
    ],
  },
];

export default routes;
