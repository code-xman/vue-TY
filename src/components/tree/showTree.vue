<template>
  <div class="showTree flex-all column">
    <el-scrollbar class="flex-1">
      <Tree ref="treeRef" />
    </el-scrollbar>
    <Btns class="flex-0 right" :btnList="btnList"></Btns>
  </div>
</template>

<script setup lang="ts">
import Tree from './Tree.vue';
import Btns from '@/components/button/boxBottomBtn.vue';
import { btnItem } from '@/components/button/type';
import { ref, DefineComponent } from 'vue';

const treeRef = ref(<DefineComponent | null>null)

const btnList: btnItem[] = [
  {
    key: 'getData',
    name: '获取数据',
    click: () => {
      console.log('treeRef.value.data :>> ', treeRef.value?.data);
    },
  }
];

</script>

<style lang="less" scoped>

</style>