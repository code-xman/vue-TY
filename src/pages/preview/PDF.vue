<template>
  <div class="flex-all column">
    <el-input
      v-model="url"
      placeholder="请输入地址"
      class="input_url"
    ></el-input>
    <div ref="licenseViewPdfRef" class="flex-1 contents"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
// import Pdfh5 from 'pdfh5';
// import 'pdfh5/css/pdfh5.css';

const url = ref(
  // 'http://img.tongrong365.org.cn/202303031646yWVl.pdf?e=1678290783&token=TNumftdWsZryZUcuD9HkgN8DXtDPlVHZgWbpRo8S:ipvdlvz4iMtSE-AuM6p7GZ7yR0k='
);

watch(
  () => url.value,
  (src) => {
    if (!src) return;
    nextTick(() => {
      // pdfh5.value = new Pdfh5(licenseViewPdfRef.value, {
      //   pdfurl: src,
      //   scale: 2.0,
      //   scrollEnable: true,
      //   zoomEnable: true,
      //   background: {
      //     color: '#fff',
      //   },
      // });
    });
  },
  {
    // immediate: true,
  }
);

const pdfh5 = ref(null);
const licenseViewPdfRef = ref(null);
</script>

<style lang="less" scoped>
.input_url {
  padding: 0 8px;
}
.contents {
  box-sizing: border-box;
  padding: 8px;
  :deep {
    .loadEffect {
      top: 50px;
    }
    .viewerContainer {
      box-shadow: darkgrey 0px 1px 3px 0px;
      &::-webkit-scrollbar {
        width: 4px;
      }
      // 滚动条内嵌滑块
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(42, 42, 42, 0.2);
        box-shadow: inset 0 0 5px rgba(42, 42, 42, 0.2);
        -webkit-box-shadow: inset 0 0 5px rgba(42, 42, 42, 0.2);
      }
      // 滚动条边角
      &::-webkit-scrollbar-corner {
        border-radius: 0;
        background: rgba(42, 42, 42, 0.2);
        box-shadow: inset 0 0 5px rgba(42, 42, 42, 0.2);
        -webkit-box-shadow: inset 0 0 5px rgba(42, 42, 42, 0.2);
      }
      .pageContainer {
        box-shadow: none;
      }
    }
  }
}
</style>
