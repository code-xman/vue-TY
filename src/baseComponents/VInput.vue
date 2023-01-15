<template>
  <el-input class="v-input" placeholder="请输入" clearable v-bind="$attrs" ></el-input>
</template>
<script lang="ts">
// 声明额外的选项
export default {
  name: 'v-input',
  // inheritAttrs: false 传入数据不会覆盖本组件原有的属性，并获取到父组件传入的同名属性
  inheritAttrs: false,
};
</script>

<script setup lang="ts"></script>

<style lang="less" scoped></style>
