<template>
  <div class="show">
    <el-button-group>
      <el-button @click="changeType('base')">base</el-button>
      <el-button @click="changeType('success')">success</el-button>
      <el-button @click="changeType('warning')">warning</el-button>
      <el-button @click="changeType('error')">error</el-button>
      <el-button @click="changeType('info')">info</el-button>
    </el-button-group>
    <LightText :type="type">当前类型是：{{type}}</LightText>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import LightText, { LightTextType } from '@/components/text/lightText.vue';

const type = ref<LightTextType>('base')
const changeType = (txtType: LightTextType) => {
  type.value = txtType
}

</script>

<style lang="less" scoped></style>
