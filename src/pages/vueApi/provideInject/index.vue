<template>
  <el-scrollbar height="100%">
    <div class="provideInject">
      <LightText>
        父级组件采用 provide('dataname', { a, b }) 的方法传递数据；若a,
        b是响应式的数据，那么传输的数据就是响应式的。
      </LightText>
      <el-button @click="addA">+1</el-button>
      {{ a }}
      <el-button @click="addB">+1</el-button>
      {{ b }}
      <A></A>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import LightText from '@/components/text/lightText.vue';
import A from './a.vue';

const a = ref(0);
let b = 0;

const addA = () => {
  a.value += 1;
};
const addB = () => {
  b += 1;
};

provide('data', { a, b });
</script>

<style lang="less" scoped></style>
