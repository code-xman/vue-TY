<template>
  <div class="box-bottom-btn flex">
    <template v-for="btn in (btnList as btnItem[])" :key="btn.key">
      <el-button v-if="btn.show !== false" v-bind="btn.attr" @click="btn.click">
        {{ btn.name }}
      </el-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { btnItem } from './type';

defineProps({
  /** 按钮组；如果按钮有联动逻辑，最好使用ref/reactive进行定义 */
  btnList: {
    type: Array,
    default: () => [] as btnItem[],
  },
});
</script>

<style lang="less" scoped>
.box-bottom-btn {
  border-top: 1px solid #eee;
  padding: 10px 0 5px;
  &.center {
    justify-content: center;
  }
  &.right {
    justify-content: right;
  }
}
</style>
