import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
interface modules {
  [key:string]: {
    default: RouteRecordRaw[]
  };
}
const modules: modules = import.meta.glob('./*.ts', { eager: true });

console.groupCollapsed('自动注册的路由');

const routes: RouteRecordRaw[] =  []
Object.keys(modules).forEach((filePath:  string) => {
  const component = modules[filePath];
  console.log(`${filePath} :>> `, component.default);
  routes.push.apply(routes, component.default)
})

console.groupEnd()

// 实例化路由控制器
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
