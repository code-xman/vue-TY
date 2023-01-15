<template>
  <el-config-provider :z-index="elAttr.zIndex" :locale="zhCN">
    <el-menu
      class="header"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">LOGO</el-menu-item>
      <el-menu-item v-if="$route.meta.title" index="1" class="title" disabled>
        {{ $route.meta.title || '' }}
      </el-menu-item>
      <div class="flex-1"></div>
      <el-menu-item index="2">个人中心</el-menu-item>
      <el-sub-menu index="3">
        <template #title>操作</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="container flex-1 flex">
      <Menu />
      <div class="flex-1 box-border mg-10">
        <!-- <el-scrollbar height="100%"> -->
        <router-view />
        <!-- </el-scrollbar> -->
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'element-plus/lib/locale/lang/zh-cn';
import { defineComponent, ref } from 'vue';
import Menu from './components/menu/index.vue';
// element
const elAttr = {
  zIndex: 3000,
};
// 导航
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="less" scoped>
@import '@/common/style/const.less';

.header {
  height: 41px;
  // color: #fff;
  // background-color: @app-primary-color;
  .title {
    border-left: 1px solid var(--el-menu-border-color);
    width: 140px;
    cursor: default;
  }
  .el-menu-item.is-disabled {
    opacity: 1;
  }
}
.container {
  overflow: hidden;
  // :deep(.el-scrollbar__view) {
  //   height: 100%;
  // }
}
</style>

<!-- 修改全局的样式 -->
<style lang="less" >
@import '@/common/style/changeElement.less';
</style>
