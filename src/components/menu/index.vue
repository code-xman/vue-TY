<template>
  <el-menu class="menu" :unique-opened="true">
    <MenuSub
      v-for="(item, index) in menuList"
      :key="item.index"
      v-bind="$attrs"
      :index="item.index"
      :title="item.title"
      :path="item.path"
      :name="item.name"
      :child="item.child"
    >
    </MenuSub>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, RouteRecordRaw } from 'vue-router';
// import menuList from './menuList';
import { menuType } from './menuList';
import MenuSub from './MenuSub.vue';

// 路由
const router = useRouter();

// console.log('router :>> ', router.options.routes);

const menuList = ref(<any>[]);

const handleMenuData = (data: RouteRecordRaw[]): menuType[] => {
  const res: menuType[] = data.map(item => {
    return {
      title: item.meta?.title as string || '',
      index: item.name as string || '',
      name: item.name as string || '',
      path: item.path,
      child: handleMenuData(item.children || []),
    }
  })

  return res;
};

onMounted(() => {
  menuList.value = handleMenuData([...router.options.routes])
  // console.log('object :>> ', menuList.value);
})

</script>

<style lang="less" scoped>
.el-menu.el-menu--vertical.menu {
  min-width: 200px;
  width: 200px;
  padding: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  // &:hover {
  // overflow-y: auto;
  // }
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.1);
  }
  // &::-webkit-scrollbar-track {
  //   /*滚动条里面轨道*/
  //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   border-radius: 0;
  //   background: rgba(0, 0, 0, 0.1);
  // }


  .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0;
  }
  :deep(.el-sub-menu) {
    .el-sub-menu__title,
    .el-menu-item {
      margin-bottom: 4px;
      max-width: 100%;
      min-width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0;
      font-size: 14px;
      font-weight: 600;
    }
    .el-menu.el-menu--inline {
      .el-sub-menu, .el-menu-item {
        padding-left: 20px;
      }
    }

    &.is-active {
      .el-sub-menu__title {
        border-radius: 10px;
        background: var(--el-color-primary);
        color: #fff;
      }
    }
  }
}
</style>
