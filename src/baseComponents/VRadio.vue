<template>
  <el-radio-group class="v-radio" placeholder="请选择" v-bind="$attrs">
    <template
      v-for="option in (props.options as LabelValue[])"
      :key="option.value"
    >
      <component :is="tag" :label="option.value" :border="type === 'border'">
        {{ option.label }}
      </component>
    </template>
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
import { markRaw, shallowRef, watch } from 'vue';
import { ElRadio, ElRadioButton } from 'element-plus';
import { LabelValue } from '@/type/common';

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  options: {
    type: Array,
    default: () => [] as LabelValue[],
  },
});

const tag = shallowRef(<any>ElRadio);

watch(
  () => props.type,
  () => {
    switch (props.type) {
      case 'button':
        tag.value = ElRadioButton;
        break;

      case 'border':
        tag.value = ElRadio;
        break;

      default:
        tag.value = ElRadio;
        break;
    }
  }
);
</script>

<style lang="less" scoped>
.v-radio {
  width: 100%;
}
</style>
