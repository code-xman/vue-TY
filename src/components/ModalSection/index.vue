<template>
  <div class="ModalSection">
    <div class="top bb-1 p-10 flex center">
      <div class="title flex-1">{{ props.title }}</div>
      <el-icon
        class="expand p-5"
        :class="{ isExpand }"
        @click="isExpand = !isExpand"
      >
        <ArrowDownBold />
      </el-icon>
    </div>
    <el-collapse-transition>
      <div v-show="isExpand" class="content m-10">
        <slot />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowDownBold } from '@element-plus/icons-vue';
defineOptions({ name: 'ModalSection' });

const props = defineProps({
  title: String,
});

const isExpand = ref<boolean>(true);
</script>

<style lang="less" scoped>
.ModalSection {
  border: 1px solid var(--ty-color-border);
  .top {
    position: sticky;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .expand {
      cursor: pointer;
      transform: rotate(-90deg);
      transition: all 0.5s ease;
      &.isExpand {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
