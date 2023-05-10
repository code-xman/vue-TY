<template>
  <div class="test2">
    <el-button @click="getData">getOptions</el-button>
    <el-cascader
      :props="props"
      collapse-tags
      collapse-tags-tooltip
      clearable
      @change="cascaderChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ApiGetOptions } from '@/api/test';
import type {
  CascaderProps,
  CascaderOption,
  CascaderValue,
} from 'element-plus';

const getData = async () => {
  const res = await ApiGetOptions();
  console.log('res :>> ', res);
};

const props: CascaderProps = {
  multiple: true,
  lazy: true,
  async lazyLoad(node, resolve) {
    const { level } = node;
    const res = await ApiGetOptions();
    const nodes: CascaderOption[] = res.data?.map(
      (item) =>
        ({
          ...item,
          leaf: level >= 2,
        } as CascaderOption)
    );
    resolve(nodes);
  },
};

const cascaderChange = (value: CascaderValue) => {
  console.log('value :>> ', value);
};
</script>

<style lang="less" scoped></style>
