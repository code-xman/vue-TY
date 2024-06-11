<template>
  <el-form
    ref="form"
    class="flex flex-wrap baseForm"
    :model="valObj"
    :rules="formRule"
  >
    <el-form-item
      v-for="(item, index) in props.formList"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
      :label-width="labelWidth"
      :style="`width: ${item.width || '50%'}`"
    >
      <!-- <component
        :is="item.tag"
        v-bind="item.attrs"
        v-on="item.events || {}"
        v-model="valObj[item.name]"
        @change="(val) => valChange(val, item.name)"
      ></component> -->
      <BaseFormItem
        :tag="item.tag"
        :bind="item.attrs"
        :on="item.events || {}"
        :model="valObj[item.name]"
        :children="item.children"
        @valChange="(val) => valChange(val, item.name)"
      ></BaseFormItem>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormItem } from './type';

import { cloneDeep } from 'lodash';
import { reactive, ref, watch, watchEffect } from 'vue';
import { FormInstance, FormItemRule, FormRules, ElMessage } from 'element-plus';
import BaseFormItem from '@/baseComponents/BaseFormItem.vue';

interface FormItemError {
  field: string;
  fieldValue: any;
  message: string;
}

const emit = defineEmits(['update:valueObj']);
const props = withDefaults(
  defineProps<{
    /** 表单各项配置，注意不能为ref/reactive定义的对象 */
    formList: FormItem[];
    valueObj: {
      [key: string]: any;
    };
    labelWidth?: string;
    rules?: FormRules;
  }>(),
  {
    formList: () => [],
    valueObj: () => ({}),
    labelWidth: '100px',
  }
);

/** form的ref */
const form = ref<FormInstance>();
/** form的value */
const valObj = ref(cloneDeep(props.valueObj));
/** from的rules */
const formRule = ref(<FormRules>{ ...props.rules });

/** 为需要 required 的字段添加必填校验 */
watch(
  [() => props.formList, () => props.rules],
  () => {
    /** required的字段 */
    const requiredItems = props.formList.filter(
      (item: FormItem) => item.required
    );
    const keys = Object.keys({ ...props.rules });
    formRule.value = { ...props.rules };
    requiredItems.forEach((item: FormItem) => {
      /** 必填校验 */
      const requiredRule: FormItemRule = {
        required: true,
        message: `请填写${item.label}`,
        trigger: ['blur', 'change'],
      };

      if (keys.includes(item.name)) {
        formRule.value[item.name] = [
          ...(formRule.value[item.name] as FormItemRule[]),
          requiredRule,
        ];
      } else {
        formRule.value[item.name] = [requiredRule];
      }
    });
    form.value?.clearValidate();
    // console.log('formRule.value :>> ', formRule.value);
  },
  { immediate: true, deep: true }
);

/** props.valueObj变化，同步更新valObj */
watch(
  () => props.valueObj,
  () => {
    valObj.value = cloneDeep(props.valueObj);
    form.value?.clearValidate();
  }
);

/**  value改变同步更新 */
const valChange = (val: any, name: string) => {
  // console.log('val :>> ', val);
  valObj.value[name] = val;
  emit('update:valueObj', valObj.value);
};

/** 向外部暴露validate方法 */
const validate = () => {
  if (!form) return;
  // 需要return此Promise，否则外部无法知道验证结果
  return new Promise((resolve, reject) => {
    // 进行验证，valid 验证结果  error 错误信息
    form.value?.validate((valid, error) => {
      if (!valid) {
        reject(error);
      } else {
        resolve(valid);
      }
    });
  })
    .then((res) => res)
    .catch((error: string | { [key: string]: FormItemError[] }) => {
      if (typeof error === 'string') {
        ElMessage.warning(error);
        return false;
      }

      const keys = Object.keys(error);
      ElMessage.warning(error[keys[0]][0].message);
      return false;
    });
};

defineExpose({
  form,
  validate,
});
</script>

<style lang="less" scoped>
:deep(.el-form-item) {
  box-sizing: border-box;
  padding: 5px 20px;
  .el-input,
  .el-input-number,
  .el-select {
    width: 100%;
  }
  .el-input-number {
    .el-input__inner {
      text-align: left;
    }
  }
}
</style>
