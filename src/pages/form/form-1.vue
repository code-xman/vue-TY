<template>
  <div class="form-1 flex-all column">
    <el-scrollbar class="flex-1">
      <BaseForm
        ref="baseFormRef"
        v-bind="formAttr"
        :formList="formList"
        :rules="rules"
        v-model:valueObj="valueObj"
      ></BaseForm>
    </el-scrollbar>
    <Btns class="flex-0 right" :btnList="btnList"></Btns>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref, defineComponent, h } from 'vue';
import {
  ElInput,
  FormRules,
  ElButton,
  FormInstance,
  ElMessage,
  ElSelect,
  ElDatePicker,
} from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import VSelect from '@/baseComponents/VSelect.vue';
import { FormItem } from '@/components/form/type';
import BaseForm from '@/components/form/baseForm.vue';
import Btns from '@/components/button/boxBottomBtn.vue';
import { btnItem } from '@/components/button/type';

const baseFormRef = ref();
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
    name: 'oldName',
    label: '曾用名',
    tag: ElInput,
    children: {
      prepend: () => (
        <ElButton
          onClick={() => {
            console.log('这个选填是prepend');
          }}
        >
          选填
        </ElButton>
      ),
      append: () =>
        h(
          'ElButton',
          {
            onClick: () => {
              console.log('这个选填是append');
            },
          },
          '选填'
        ),
    },
  },
  {
    name: 'type',
    label: '分类',
    tag: ElInput,
    attrs: {
      disabled: true,
    },
  },
  {
    name: 'id',
    label: '唯一编码',
    tag: ElInput,
    attrs: {
      readonly: true,
    },
  },
  {
    name: 'blur',
    label: '测试失焦',
    tag: ElInput,
    events: {
      blur: (event: any) => {
        console.log('event.target.value :>> ', event.target.value);
      },
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

const restData = {
  name: '',
  age: '',
  oldName: '',
  type: '暂不填写，后续统一分类',
  id: 'asjhd123adf81rlkj94',
  blur: '',
  sex: '',
  birth: '',
};

const testData = {
  name: '张三',
  age: '23',
  oldName: '格雷福斯',
  type: '暂不填写，后续统一分类',
  id: 'asjhd123adf81rlkj94',
  blur: '',
  sex: 'man',
  birth: '',
};

const valueObj = ref({ ...restData });
/** age验证规则 */
const validateAge = (rule: any, value: any, callback: any) => {
  const val = Number(value);
  if (val < 0 || val > 100) {
    callback(new Error('输入的年龄不符合要求'));
  }
  callback();
};
/** 表单验证规则 */
const rules: FormRules = {
  // name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
  age: [
    // { required: true, message: '请填写年龄', trigger: 'blur' },
    { validator: validateAge, trigger: ['change', 'blur'] },
  ],
  // sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
};

const btnList: btnItem[] = [
  {
    key: 'validate',
    name: '验证表单',
    click: async () => {
      // 调用baseForm的验证方法validate，对表单进行验证
      const validateRes = await baseFormRef.value?.validate();
      if (validateRes) {
        ElMessage({
          message: '通过验证',
          type: 'success',
          showClose: true,
        });
      } else {
        ElMessage({
          message: '验证失败',
          type: 'warning',
          showClose: true,
        });
      }
    },
  },
  {
    key: 'restValidate',
    name: '重置表单',
    click: () => {
      valueObj.value = { ...restData };
      baseFormRef.value?.form.resetFields();
    },
  },
  {
    key: 'setValueObj',
    name: '设置数据',
    click: () => {
      valueObj.value = { ...testData };
    },
  },
  {
    key: 'getValue',
    name: '获取数据',
    attr: {
      type: 'primary',
    },
    click: () => {
      // 调用baseForm的验证方法validate，对表单进行验证
      const validateRes = baseFormRef.value?.validate();
      if (validateRes) {
        console.log('valueObj :>> ', valueObj.value);
      }
    },
  },
];
</script>

<style lang="less" scoped></style>
