<template>
  <el-scrollbar class="B">
    <BaseForm
      ref="baseFormRef"
      v-bind="formAttr"
      :formList="formList"
      :rules="rules"
      v-model:valueObj="valueObj"
    ></BaseForm>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, DefineComponent } from 'vue';
import { FormRules } from 'element-plus';
import { FormItem } from '@/components/form/type';
import BaseForm from '@/components/form/baseForm.vue';

const baseFormRef = ref(<DefineComponent | null>null);
const formAttr = {
  labelPosition: 'right',
};

const formList: FormItem[] = [
  {
    name: 'companyName',
    label: '公司名称',
    tag: 'ElInput',
    required: true,
    attrs: {
      clearable: true,
    },
  },
  {
    name: 'year',
    label: '工作年限',
    tag: 'ElInput',
    required: true,
    attrs: {
      type: 'number',
      max: 100,
      min: 0,
    },
  },
  {
    name: 'companyNum',
    label: '公司编号',
    tag: 'ElInput',
    required: true,
    attrs: {
      clearable: true,
    },
  },
  {
    name: 'position',
    label: '职位',
    tag: 'VSelect',
    required: true,
    attrs: {
      clearable: true,
      options: [
        {
          label: '上单',
          value: 'top',
        },
        {
          label: '打野',
          value: 'jun',
        },
        {
          label: '中单',
          value: 'mid',
        },
        {
          label: '射手',
          value: 'adc',
        },
        {
          label: '辅助',
          value: 'sup',
        },
      ],
    },
  },
];

const rules: FormRules = {
  companyName: [{ required: true, message: '请填写公司名称' }],
  year: [{ required: true, message: '请填写工作年限' }],
  companyNum: [{ required: true, message: '请填写公司编号' }],
  position: [{ required: true, message: '请填写职位' }],
};

const restData = {
  companyName: '',
  year: '',
  companyNum: '',
  position: '',
};

const valueObj = ref({ ...restData });

/** 验证表单 */
const validate = async () => {
  const validateRes = await baseFormRef.value?.validate();
  return validateRes;
};

// 暴露给外部的数据
defineExpose({
  valueObj,
  validate,
});
</script>

<style lang="less" scoped>
.B {
  background-color: #fdf6ec;
}
</style>
