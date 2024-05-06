<template>
  <el-radio-group class="v-radio" placeholder="请选择" v-bind="$attrs">
    <el-radio
      v-for="option in (props.options as LabelValue[])"
      :key="option.value"
      :label="option.value"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
// 声明额外的选项
export default {
  name: 'v-radio',
  // inheritAttrs: false 传入数据不会覆盖本组件原有的属性，并获取到父组件传入的同名属性
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { LabelValue } from '@/type/common';

const props = defineProps({
  options: {
    type: Array,
    default: () => [] as LabelValue[],
  },
});

</script>

<style lang="less" scoped>
.v-radio {
  width: 100%;
}
</style>
