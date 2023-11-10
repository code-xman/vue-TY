<template>
  <div class="ModalSectionShow flex-all">
    <el-scrollbar class="flex-1">
      <ModalSection title="ModalSectionShow"> 
        <div>ModalSectionShow</div>
        <div>ModalSectionShow</div>
        <div>ModalSectionShow</div>
        <div>ModalSectionShow</div>
        <div>ModalSectionShow</div>
      </ModalSection>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import ModalSection from './index.vue';

defineOptions({ name: 'ModalSectionShow' });
</script>

<style lang="less" scoped>
</style>
