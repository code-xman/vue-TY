<template>
  <el-scrollbar class="A">
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
import { ElInput, FormRules, ElSelect, ElDatePicker } from 'element-plus';
import VSelect from '@/baseComponents/VSelect.vue';
import { FormItem } from '@/components/form/type';
import BaseForm from '@/components/form/baseForm.vue';

const baseFormRef = ref(<DefineComponent | null>null);
const formAttr = {
  labelPosition: 'right',
};

const formList: FormItem[] = [
  {
    name: 'name',
    label: '姓名',
    tag: ElInput,
    required: true,
    attrs: {
      clearable: true,
    },
  },
  {
    name: 'age',
    label: '年龄',
    tag: ElInput,
    required: true,
    attrs: {
      type: 'number',
      max: 100,
      min: 0,
    },
  },
  {
    name: 'sex',
    label: '性别',
    tag: VSelect,
    required: true,
    attrs: {
      clearable: true,
      options: [
        {
          label: '男',
          value: 'man',
        },
        {
          label: '女',
          value: 'woman',
        },
      ],
    },
  },
  {
    name: 'birth',
    label: '出生日期',
    tag: ElDatePicker,
    attrs: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

/** age验证规则 */
const validateAge = (rule: any, value: any, callback: any) => {
  const val = Number(value);
  if (val < 0 || val > 100) {
    callback(new Error('输入的年龄不符合要求'));
  }
  callback();
};

const rules: FormRules = {
  name: [{ required: true, message: '请填写姓名' }],
  age: [
    { required: true, message: '请填写年龄' },
    { validator: validateAge, trigger: ['change', 'blur'] },
  ],
  sex: [{ required: true, message: '请选择性别' }],
};

const restData = {
  name: '',
  age: '',
  sex: '',
  birth: '',
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
.A {
  padding-top: 8px;
  background-color: #f0f9eb;
}
</style>
