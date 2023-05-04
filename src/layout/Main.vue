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
      <Menu />
      <div class="flex-1 box-border mg-10">
        <!-- <el-scrollbar height="100%"> -->
        <router-view />
        <!-- </el-scrollbar> -->
      </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Menu from '@/components/menu/index.vue';
const route = useRoute();

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
</style>