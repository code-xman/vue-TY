import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    name: 'Index',
    redirect: '/helloworld',
    meta: {
      title: '首页',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        redirect: '/helloworld',
        meta: {
          title: '首页',
        },
      },
      {
        path: '/helloworld',
        name: 'helloworld',
        meta: {
          title: '首页',
        },
        component: () => import('@/pages/HelloWorld.vue'),
      },
      {
        path: '/404',
        name: '404',
        meta: {
          title: '404',
        },
        component: () => import('@/pages/404.vue'),
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '测试',
    },
    component: () => import('@/layout/Main.vue'),
    children: [
      {
        path: '/test1',
        name: 'test1',
        meta: {
          title: '测试1',
        },
        children: [
          {
            path: '/test1/test1-1',
            name: 'test1-1',
            meta: {
              title: '测试1-1',
            },
            component: () => import('@/pages/test/test1.vue'),
          },
        ],
      },
      {
        path: '/test2',
        name: 'test2',
        meta: {
          title: '测试2',
        },
        component: () => import('@/pages/test/test2.vue'),
      },
    ],
  }
];

export default routes;
