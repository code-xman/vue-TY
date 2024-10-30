<template>
  <div class="test1">
    <div class="div1" style="background: lightgreen"></div>
    <div class="div2" style="background: lightblue">
      <div v-for="(item, index) in list" :key="item.key">{{item.value}}</div>
      <el-button @click="changeList">修改</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const list = ref([
  {value: 1, key: '1'},
  {value: 2, key: '1'},
  {value: 3, key: '1'},
  {value: 4, key: '1'},
])

const changeList = () => {
  list.value.push({value: 5, key: '1'});
  list.value.reverse();
};
</script>

<style lang="less" scoped>
.test1 {
  height: 100%;
}
.div1 {
  float: left;
  width: 10%;
  height: 100%;
}
.div2 {
  border: 2px solid #750a0a;
  height: 100%;
  overflow: auto;
}
</style>