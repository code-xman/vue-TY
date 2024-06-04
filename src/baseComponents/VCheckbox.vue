<template>
  <el-checkbox-group
    class="v-checkbox flex flex-wrap"
    placeholder="请选择"
    v-bind="$attrs"
  >
    <template
      v-for="option in (props.options as LabelValue[])"
      :key="option.value"
    >
      <component :is="tag" :label="option.value" :border="type === 'border'">
        {{ option.label }}
      </component>
    </template>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { ElCheckbox, ElCheckboxButton } from 'element-plus';
import { LabelValue } from '@/type/common';

defineOptions({
  name: 'v-checkbox',
  // inheritAttrs: false 传入数据不会覆盖本组件原有的属性，并获取到父组件传入的同名属性
  inheritAttrs: false,
});

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

const tag = shallowRef(<any>ElCheckbox);

watch(
  () => props.type,
  () => {
    switch (props.type) {
      case 'button':
        tag.value = ElCheckboxButton;
        break;

      case 'border':
        tag.value = ElCheckbox;
        break;

      default:
        tag.value = ElCheckbox;
        break;
    }
  }
);
</script>

<style lang="less" scoped>
.v-checkbox {
  width: 100%;
  // 上下加一点margin，否则border模式换行后会粘在一起
  .el-checkbox.is-bordered {
    margin-top: 2px;
    margin-bottom: 2px;
  }
}
</style>
