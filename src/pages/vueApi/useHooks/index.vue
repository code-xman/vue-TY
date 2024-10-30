<template>
  <el-scrollbar height="100%">
    <div class="useHooks">
      <div class="mb-5">A: {{ A || '-' }}</div>
      A: <el-input v-model="A" class="mb-5" /> newA:
      <el-input v-model="newA" class="mb-5" />
      <el-button type="primary" class="mb-5" @click="updated">
        修改A的值
      </el-button>
      <el-button
        type="primary"
        class="mb-5 sendBtn"
        :disabled="disabled"
        @click="sendFn"
      >
        {{ sendBtnText }}
      </el-button>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useState, useCountDown } from './hooks';

defineOptions({ name: 'useHooks' });

const [A, setA] = useState('');
const newA = ref('');
const { sendBtnText, disabled, timer, sendFn } = useCountDown(10);

const updated = () => {
  (setA as (value: any) => void)(newA.value);
};

onBeforeUnmount(() => {
  timer.value && clearTimeout(timer.value);
  console.log('clearTimeout');
});
</script>

<style lang="less" scoped>
.sendBtn {
  width: 110px;
}
</style>
