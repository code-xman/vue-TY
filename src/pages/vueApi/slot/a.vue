<template>
  <div class="a">
    A:{{num}}
    <el-button @click="add">+1</el-button>
    <slot>插槽备用内容</slot>
    <!-- 具名插槽-a1 -->
    <slot name="a1" :data="data" :num="num"></slot>
    <!-- 具名插槽-a2 -->
    <slot name="a2"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = {
  a: '子组件A的数据'
}
const num = ref(0)
const add = () => {
  num.value += 1
}
</script>

<style lang="less" scoped></style>
