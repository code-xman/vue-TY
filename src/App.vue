<template>
  <el-config-provider :z-index="elAttr.zIndex" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// element
const elAttr = {
  zIndex: 3000,
};
</script>

<!-- 修改全局的样式 -->
<style lang="less">
@import '@/common/style/changeElement.less';
</style>
