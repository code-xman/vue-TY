<template>
  <el-scrollbar height="100%">
    <div class="vueSlot">VUE插槽</div>
    <LightText> 使用A组件,tag-A里的内容会放入A组件的插槽里面。 </LightText>
    <A> A插槽内容 </A>
    <A> 插槽里可以放不同的内容 </A>

    <LightText>tag-A中可以访问当前组件作用域中的变量。</LightText>
    <A> 大家好，我是{{ asd.name }}, 今年{{ asd.age }}岁，是个{{ asd.sex }}。</A>

    <LightText>可以在Tag-slot中填写备份内容</LightText>
    <A></A>

    <LightText>
      父组件#name-子组件name="name"一一对应，将对应的内容放入对应的插槽。
      多个插槽请放入template中
    </LightText>
    <A>
      <template #default><p>默认插槽，名字为default</p></template>
      <template #a1><p>具名插槽-a1</p></template>
      <template #a2><p>具名插槽-a2</p></template>
    </A>

    <LightText>
      子组件的slot绑定的attr，可以通过“#‘插槽名’=‘自定义props名字’”获取，
      自定义props名字.*** 进行使用
    </LightText>
    <A>
      <template #a1="data1">
        <p>{{ data1.data.a }}</p>
        <p>{{ data1.num }}</p>
      </template>
    </A>
    <LightText>
      可以对slot传来的数据进行结构，结构后的数据依然是响应式数据
    </LightText>
    <A>
      <template #a1="{ data, num }">
        <p>{{ data.a }}</p>
        <p>{{ num }}</p>
      </template>
    </A>

    <LightText> 使用B组件，B组件没有slot，所以插槽内容并不会显示。 </LightText>
    <B> B插槽内容 </B>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import LightText from '@/components/text/lightText.vue';
import A from './a.vue';
import B from './b.vue';

const asd = reactive({
  name: '阿斯顿',
  age: 415,
  sex: 'man',
});
</script>

<style lang="less" scoped></style>
