<template>
  <div class="piniaTest">
    <A></A>
    <el-divider direction="vertical" />
    <B></B>
  </div>
</template>

<script setup lang="ts">
import A from './A.vue';
import B from './B.vue';

</script>

<style lang="less" scoped>
.piniaTest {
  height: 100%;
  display: flex;
  .el-divider--vertical {
    height: 100%;
  }
  .part{
    flex: 1;
  }
}
</style>