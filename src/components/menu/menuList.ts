export interface menuType {
  title: string;
  index: string;
  path?: string;
  name?: string;
  child?: menuType[];
}

interface modules {
  [key:string]: {
    default: menuType[]
  };
}

// const modules: modules = import.meta.glob('./data/*.ts', { eager: true });
// const list:menuType[] = []

// console.groupCollapsed('自动获取菜单数据');
// Object.keys(modules).forEach((filePath:  string) => {
//   const component = modules[filePath];
//   console.log(`${filePath} :>> `, component.default);
//   list.push.apply(list, component.default)
// })
// console.groupEnd()

// const menuList: menuType[] = [
//   {
//     title: 'helloworld',
//     index: 'helloworld',
//     path: '/helloworld',
//   },
//   {
//     title: '404',
//     index: '404',
//     path: '/404',
//   },
//   {
//     title: 'test',
//     index: 'test',
//     child: [
//       {
//         title: 'test1',
//         index: 'test1',
//         path: '/test1',
//         child: [
//           {
//             title: 'test1-1',
//             index: 'test1-1',
//             path: '/test1-1',
//           },
//         ],
//       },
//       {
//         title: 'test2',
//         index: 'test2',
//         path: '/test2',
//       },
//     ],
//   },
//   ...list,
// ];

// export default menuList;
