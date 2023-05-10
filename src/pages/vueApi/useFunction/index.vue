<template>
  <div class="useFunction">
    <LightText type="success">vue3不像vue2那样需要先将引入的方法进行声明，其可以直接使用</LightText>
    <LightText type="base">外部引入的方法可直接绑定在template的元素上</LightText>
    <el-button type="primary" @click="aFn">调用 aFn</el-button>
    <LightText type="base">外部引入的方法可在template直接使用</LightText>
    <div>{{ format(val) }}</div>
  </div>
</template>

<script setup lang="ts">
import LightText from '@/components/text/lightText.vue';
import { aFn, format, } from './fn';

const val = '123456'

</script>

<style lang="less" scoped>

</style>