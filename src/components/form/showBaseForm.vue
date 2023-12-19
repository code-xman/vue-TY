<template>
  <el-scrollbar height="100%">
    <div class="showBaseFom">
      <BaseForm
        v-bind="formAttr"
        :formList="formList"
        v-model:valueObj="valueObj"
      ></BaseForm>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { FormItem } from '@/components/form/type';
import BaseForm from './baseForm.vue';

const formAttr = {
  labelPosition: 'right',
};

/**
 * 两种tag都可以，‘v-input’为二次封装组件，ElInput为element组件，
 * 两种tag都可以使用下面两种方法：
 * 1. 使用字符串需要全局引入，
 * 2. 使用组件，则需要单独引入当前组件，
 */
const formList:FormItem[] = [
  {
    name: 'name',
    label: '姓名',
    tag: 'ElInput',
    attrs: {
      clearable: false,
    },
  },
  {
    name: 'age',
    label: '年龄',
    tag: 'VInput',
    attrs: {
      maxlength: 3,
      type: 'number',
      min: 0,
    },
  },
  {
    name: 'graduate',
    label: '是否毕业',
    tag: 'ElSwitch',
    attrs: {
      clearable: false,
    },
  },
  {
    name: 'type',
    label: '分类',
    tag: 'ElInput',
    attrs: {
      disabled: true,
    },
  },
  {
    name: 'id',
    label: '唯一编码',
    tag: 'ElInput',
    attrs: {
      readonly: true,
    },
  },
  {
    name: 'blur',
    label: '测试失焦',
    tag: 'ElInput',
    events: {
      blur: (event: any) => {
        console.log('event.target.value :>> ', event.target.value);
      },
    },
  },
];

const valueObj = ref({
  name: '',
  age: '',
  graduate: false,
  type: '暂不填写，后续统一分类',
  id: 'asjhd123adf81rlkj94',
  blur: '',
});
</script>

<style lang="less" scoped></style>
