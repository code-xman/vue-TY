<template>
  <div class="part part-a flex column">
    <el-scrollbar class="flex-1">
      <h1>A</h1>
      <LightText>
        pinia里的 state ，可以直接使用 store.state 的形式进行获取
      </LightText>
      <div>base.count: {{ baseStore.count }}</div>
      <LightText>
        pinia里的 getter ，可以直接使用 store.getter 的形式进行获取
      </LightText>
      <div>(base.count)*2: {{ baseStore.doubleCount }}</div>
      <div>base.count+other.count: {{ baseStore.amountCount }}</div>
      <LightText> 可以对 store.state 直接进行赋值 </LightText>
    </el-scrollbar>
    <div class="bt-1 pt-8">
      <el-button @click="add">base+1</el-button>
      <el-button @click="increment">使用store的自加</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LightText from '@/components/text/lightText.vue';
import { useBaseStore } from '@/store/base';

const baseStore = useBaseStore();

const add = () => {
  baseStore.count++;
};

const increment = () => {
  baseStore.increment();
};
</script>

<style lang="less" scoped></style>
