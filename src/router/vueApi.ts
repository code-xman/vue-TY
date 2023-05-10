import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/vueApi',
    name: 'VueApi',
    meta: {
      title: 'VueApi',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: 'slot',
        name: 'slot',
        meta: {
          title: 'vue插槽——slot',
        },
        component: () => import('@/pages/vueApi/slot/index.vue')
      },
      {
        path: 'provideInject',
        name: 'provideInject',
        meta: {
          title: 'vue传参方法——provideInject',
        },
        component: () => import('@/pages/vueApi/provideInject/index.vue')
      },
      {
        path: 'useFunction',
        name: 'useFunction',
        meta: {
          title: 'template使用引入的方法',
        },
        component: () => import('@/pages/vueApi/useFunction/index.vue')
      },
    ],
  }
];

export default routes;
