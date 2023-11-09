<template>
  <div class="lightText p-5 mt-5 mb-5" :style="styleData[type]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
export type LightTextType = 'base' | 'success' | 'warning' | 'error' | 'info'; 

withDefaults(
  defineProps<{
    type?: LightTextType;
  }>(),
  {
    type: 'base'
  }
);
const styleData: {
  [key: string]: {
    background: string;
    color: string;
    borderLeft: string;
  };
} = {
  base: {
    background: 'var(--el-color-primary-light-9)',
    color: 'var(--el-color-primary)',
    borderLeft: '3px solid var(--el-color-primary)',
  },
  success: {
    background: '#f0f9eb',
    color: '#67C23A',
    borderLeft: '3px solid #67C23A',
  },
  warning: {
    background: '#fdf6ec',
    color: '#E6A23C',
    borderLeft: '3px solid #E6A23C',
  },
  error: {
    background: '#fef0f0',
    color: '#F56C6C',
    borderLeft: '3px solid #F56C6C',
  },
  info: {
    background: '#909399',
    color: '#f4f4f5',
    borderLeft: '3px solid #f4f4f5',
  },
};
</script>

<style lang="less" scoped></style>
