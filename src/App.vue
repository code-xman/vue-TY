<template>
  <el-config-provider :z-index="elAttr.zIndex" :locale="zhCN">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'element-plus/lib/locale/lang/zh-cn';
// element
const elAttr = {
  zIndex: 3000,
};
</script>

<!-- 修改全局的样式 -->
<style lang="less">
@import '@/common/style/changeElement.less';
</style>
