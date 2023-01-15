<template>
  <div class="lightText pd-5 mg-t-5 mg-b-5" :style="styleData[type]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'base',
  },
});

const styleData = {
  base: {
    background: '#ecf5ff',
    color: '#409eff',
    borderLeft: '3px solid #409eff',
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
