import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useOtherStore } from '@/store/other';

//  Setup Stores
export const useBaseStore = defineStore('base', () => {
  // 使用其他store的数据
  const otherStore = useOtherStore();

  // ref --> state
  const count = ref<number>(0);
  // computed --> getters
  const doubleCount = computed(() => count.value * 2);
  const amountCount  = computed(() => count.value + otherStore.count);

  // function --> actions
  const increment = () => {
    count.value++;
  };
  // 重置方法
  const $reset = () => {
    count.value = 0;
  };

  return {
    count,
    doubleCount,
    amountCount,
    increment,
    $reset,
  };
});
