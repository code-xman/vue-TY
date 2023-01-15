export default {
  install(app) {
    // Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块; eager-静态直接导入
    const modules = import.meta.glob('./*.vue', { eager: true });

    console.groupCollapsed('自动注册的全局组件');

    Object.keys(modules).forEach((filePath) => {
      // const name = filePath.replace(/^\.\//, '').replace(/\..+$/, '')
      const component = modules[filePath];
      // 注册
      app.component((component.default || component).name, component.default || component);
      
      console.log((component.default || component).name, component.default || component)
    });

    console.groupEnd();
  },
};
