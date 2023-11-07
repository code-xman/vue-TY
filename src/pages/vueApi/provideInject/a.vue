<template>
  <div class="a mt-10">
    <LightText>子组件通过inject(dataname)来获取数据。</LightText>
    <LightText type="warning">
      注：父级传入的非响应式数据，在子组件里inject后，在当前会变为响应式的数据。
    </LightText>
    A组件: a: {{ data?.a }} b: {{ data?.b }}
    <el-button @click="minus">-1</el-button>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue';
import LightText from '@/components/text/lightText.vue';

interface InjectA {
  a: Ref<number>;
  b: number;
}
const data = inject<InjectA>('data');

const minus = () => {
  if (data) {
    data.a.value -= 1;
    data.b -= 1;
  }
};
</script>

<style lang="less" scoped></style>
