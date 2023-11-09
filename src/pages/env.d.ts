/// <reference types="vite/client" />

// declare module '*.vue' {
//   import { ComponentOptions } from 'vue';
//   const componentOptions: ComponentOptions;
//   export default componentOptions;
// }

declare module '*.vue' {
  import { defineComponent, ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module 'sortablejs';
declare module 'pdfh5';
declare module 'element-plus/dist/locale/zh-cn.mjs';

declare interface Window {
  BrokerPermissionInstance: any;
  modeler: any;
}
