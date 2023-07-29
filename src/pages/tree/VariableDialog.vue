<template>
  <el-dialog
    v-model="visible"
    class="VariableDialog"
    title="变量"
    :width="600"
    :close-on-click-modal="false"
  >
    <div class="overflow-hide scroll_thin content">
      <div v-for="item in varis" :key="item.field" class="vari-box">
        <span class="label">{{ item.fieldName }}</span>
        <span class="value">{{ item.field }}</span>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Ref, ref, inject, watch, PropType } from 'vue';
import { ApiGetVariable } from '@/api/test';
import { RuleObj, VariableType } from './type';

const ruleObj = (inject<() => RuleObj>('ruleObj') as () => RuleObj)();
const emit = defineEmits(['update:modelValue', 'updateVariable']);
const props = defineProps({
  // 弹出状态
  modelValue: Boolean,
  // 数据
  varisData: Array as PropType<VariableType[]>,
});

const varis = ref(<VariableType[]>[]);

const visible = ref(<boolean>false);

const handleCancel = () => {
  visible.value = false;
};

const handleConfirm = () => {
  emit('updateVariable', {type: 'vari', data: varis.value});
  visible.value = false;
};

const init = async () => {
  try {
    if (props.varisData?.length === 0) {
      const res = await ApiGetVariable();
      varis.value = res.data.map((item) => {
        ruleObj.attrNum.value += 1;
        return {
          vid: new Date().getTime().toString(),
          field: `attr_${ruleObj.attrNum.value}`,
          oldField: item.value as string,
          fieldName: item.label,
          varFieldType: '01',
        };
      });
    } else {
      varis.value = [...(props.varisData || [])];
    }
  } catch (error) {}
};

watch(
  () => props.modelValue,
  async () => {
    visible.value = props.modelValue;

    if (props.modelValue) {
      await init();
    } else {
      varis.value = [];
    }
  }
);

watch(
  () => visible.value,
  () => {
    if (!visible.value) {
      emit('update:modelValue', false);
    }
  }
);
</script>

<style lang="less" scoped>
.content {
  .vari-box {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    .label,
    .value {
      width: 40%;
      height: 32px;
      line-height: 32px;
      opacity: 0.82;
    }
    .label {
      border: 1px solid var(--el-color-primary-light-3);
      color: var(--el-color-primary);
    }
    .value {
      border: 1px solid var(--el-color-primary);
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}
</style>
