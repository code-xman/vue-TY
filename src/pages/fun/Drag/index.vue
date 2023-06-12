<template>
  <el-button @click="reset">重置</el-button>
  <div v-if="showDrag" v-drag id="drag"></div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

const showDrag = ref(<boolean>true);

const reset = () => {
  showDrag.value = false;
  nextTick(() => {
    showDrag.value = true;
  });
};
</script>

<style lang="less" scoped>
#drag {
  width: 100px;
  height: 100px;
  background-color: #548654;
}
</style>
