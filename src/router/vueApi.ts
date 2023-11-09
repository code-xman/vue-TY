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
        name: 'Slot',
        meta: {
          title: 'vue插槽',
        },
        component: () => import('@/pages/vueApi/slot/index.vue')
      },
      {
        path: 'provideInject',
        name: 'ProvideInject',
        meta: {
          title: 'vue传参方法',
        },
        component: () => import('@/pages/vueApi/provideInject/index.vue')
      },
      {
        path: 'useFunction',
        name: 'UseFunction',
        meta: {
          title: '使用引入的fn',
        },
        component: () => import('@/pages/vueApi/useFunction/index.vue')
      },
      {
        path: 'useHooks',
        name: 'UseHooks',
        meta: {
          title: '自定义hook',
        },
        component: () => import('@/pages/vueApi/useHooks/index.vue')
      },
      {
        path: 'piniaTest',
        name: 'PiniaTest',
        meta: {
          title: '使用Pinia',
        },
        component: () => import('@/pages/vueApi/piniaTest/index.vue')
      },
    ],
  }
];

export default routes;
