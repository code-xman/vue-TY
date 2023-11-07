<template>
  <div class="header">
    <img class="logo" src="@/assets/logo-full.svg" />
    <div class="home item">步客科技 Demo 服务平台</div>
    <div v-if="route.meta.title" class="title" disabled>
      {{ route.meta.title || '' }}
    </div>
    <div class="flex-1"></div>
    <div class="item">个人中心</div>
    <div class="item">操作</div>
  </div>
  <div class="container flex-1 flex">
    <Menu @routeChange="routeChange" />
    <div class="flex-1 flex column overflow-hide">
      <div class="flex tags scroll_thin">
        <el-tag
          v-for="tag in tags"
          :key="tag.label"
          round
          class="tag"
          size="large"
          :closable="tag.value !== 'home'"
          :effect="route.name === tag.value ? 'dark' : 'light'"
          @click="() => clickFn(tag)"
          @close="() => closeFn(tag)"
        >
          <div class="dot"></div>
          {{ tag.label }}
        </el-tag>
      </div>
      <div class="flex-1 box-border m-10">
        <!-- <el-scrollbar height="100%"> -->
        <router-view />
        <!-- </el-scrollbar> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Menu from '@/components/menu/index.vue';
import { LabelValue } from '@/type/common';

// 路由
const router = useRouter();
const route = useRoute();

const tags = ref(<LabelValue[]>[
  {
    label: '首页',
    value: 'home',
  }
]);

const routeChange = (rote: LabelValue) => {
  // console.log('rote :>> ', rote);
  const flag = tags.value.find((t) => t.value === rote.value);
  if (!flag) {
    tags.value.push(rote);
  }
};

const clickFn = (tag: LabelValue) => {
  router.push({ name: tag.value as string });
};
const closeFn = (tag: LabelValue) => {
  tags.value = tags.value.filter((item) => item.value !== tag.value);
  if (route.name === tag.value) {
    router.push({name: 'home'})
  }
};
</script>

<style lang="less" scoped>
@import '@/common/style/const.less';
.header {
  display: flex;
  align-items: center;
  height: 56px;
  padding-right: 16px;
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  background-color: #526aec;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0) 50%
  );
  .logo {
    max-height: 100%;
    max-width: 100%;
  }

  .item {
    padding: 0 16px;
    cursor: pointer;
  }

  .home {
    font-weight: bold;
    font-size: 18px;
  }
  .title {
    width: 140px;
    padding: 0 16px;
    font-weight: 600;
  }
}
.container {
  overflow: hidden;
  // :deep(.el-scrollbar__view) {
  //   height: 100%;
  // }
}
.tags {
  border-bottom: 1px solid #eee;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  .tag {
    margin: 4px;
    min-width: 72px;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    :deep(.el-tag__content) {
      display: flex;
      align-items: center;

      .dot {
        margin-right: 8px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--el-tag-text-color);
      }
    }
  }
}
</style>
