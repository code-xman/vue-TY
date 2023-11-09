<template>
  <div class="part part-b flex column">
    <el-scrollbar class="flex-1">
      <h1>B</h1>
      <div>base.count: {{ baseStore.count }}</div>
      <div>other.count: {{ otherStore.count }}</div>
    </el-scrollbar>
    <div class="bt-1 pt-8">
      <el-button @click="add">other+100</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBaseStore } from '@/store/base';
import { useOtherStore } from '@/store/other';

const baseStore = useBaseStore();
const otherStore = useOtherStore();

const add = () => {
  otherStore.count += 100;
};

const reset = () => {
  baseStore.$reset();
  otherStore.$reset();
}
</script>

<style lang="less" scoped>

</style>