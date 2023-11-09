import { ref, } from 'vue';
import { defineStore } from 'pinia';

//  Setup Stores
export const useOtherStore = defineStore('other', () => {
  // ref --> state
  const count = ref<number>(100);

  // 重置方法
  const $reset = () => {
    count.value = 100;
  };
  return {
    count,
    $reset,
  };
});
