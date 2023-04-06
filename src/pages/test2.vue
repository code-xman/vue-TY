<template>
  <div class="test2">
    <el-button @click="getData">getOptions</el-button>
  </div>
</template>

<script setup lang="ts">
import { ApiGetOptions } from '@/api/test';

const getData = async () => {
  const res = await ApiGetOptions();
  console.log('res :>> ', res);
};

</script>

<style lang="less" scoped>

</style>