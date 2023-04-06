<template>
  <el-menu class="menu" :unique-opened="true">
    <MenuSub
      v-for="(item, index) in menuList"
      :key="item.index"
      :index="item.index"
      :title="item.title"
      :path="item.path"
      :child="item.child"
    >
    </MenuSub>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import menuList from './menuList';
import MenuSub from './MenuSub.vue';
</script>

<style lang="less" scoped>
.el-menu.el-menu--vertical.menu {
  width: 200px;
  padding-left: 10px;
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
      max-width: 100%;
      min-width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0;
    }
    .el-menu.el-menu--inline {
      .el-sub-menu, .el-menu-item {
        padding-left: 20px;
      }
    }
  }
}
</style>
