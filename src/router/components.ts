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
];

export default routes;
