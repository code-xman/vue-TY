import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/components/lightText',
    name: 'componentsLightText',
    meta: {
      title: '高亮文字',
    },
    component: () => import('@/components/text/show.vue')
  },
  {
    path: '/components/showTree',
    name: 'componentsShowTree',
    meta: {
      title: '树型结构',
    },
    component: () => import('@/components/tree/showTree.vue')
  },
];

export default routes;
