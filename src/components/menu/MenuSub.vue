<template>
  <el-sub-menu v-if="hasChild" :index="props.index">
    <template #title>
      <div class="menu-item">{{ props.title }}</div>
    </template>
    <MenuSub
      v-for="(item, index) in props.child"
      :key="item.index"
      v-bind="$attrs"
      :index="item.index"
      :title="item.title"
      :path="item.path"
      :name="item.name"
      :child="item.child"
    ></MenuSub>
  </el-sub-menu>
  <el-menu-item v-else :index="props.index">
    <template #title>
      <el-tooltip
        effect="dark"
        placement="top"
        class="box-item"
        :show-after="1000"
        :content="props.title"
      >
        <div
          class="menu-item"
          @click="
            () =>
              toPage({
                label: props.title,
                value: props.name,
              })
          "
        >
          {{ props.title }}
        </div>
      </el-tooltip>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { getCurrentInstance, useAttrs, computed } from 'vue';
import { useRouter } from 'vue-router';
import { menuType } from './menuList';
import { LabelValue } from '@/type/common';
const props = withDefaults(
  defineProps<{
    index: string;
    title: string;
    path: string;
    name: string;
    child: menuType[];
  }>(),
  {
    index: '',
    title: '',
    path: '',
    name: '',
    child: () => [],
  }
);
// self --> this
// const self = getCurrentInstance();

const attrs: { onRouteChange?: (rote: LabelValue) => void } = useAttrs();

const hasChild = computed(() => props.child?.length > 0);

// 路由
const router = useRouter();
const toPage = (rote: LabelValue) => {
  // console.log('rote :>> ', rote,);
  router.push({ name: rote.value as string });
  attrs.onRouteChange?.(rote);
};
</script>

<style lang="less" scoped>
.menu-item {
  width: 100%;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
