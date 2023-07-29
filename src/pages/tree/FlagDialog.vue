<template>
  <el-dialog
    v-model="visible"
    class="FlagDialog"
    title="标识"
    :width="600"
    :close-on-click-modal="false"
    @close="closeFn"
  >
    <div class="overflow-hide scroll_thin content">
      <el-select v-model="flagVal.field" placeholder="请选择">
        <el-option
          v-for="item in fields"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="flagVal.value" placeholder="请选择">
        <el-option
          v-for="item in values"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
import { ref, watch, PropType } from 'vue';
import { RuleObj, VariableType } from './type';
import { LabelValue } from '@/type/common';

// test
const valuesObj: { [key: string]: LabelValue[] } = {
  PackageDeduction: [
    {
      label: '是',
      value: '01',
    },
    {
      label: '否',
      value: '02',
    },
  ],
  RemainingNotarizationTimes: [
    {
      label: '一次',
      value: '01',
    },
    {
      label: '两次',
      value: '02',
    },
  ],
};

const emit = defineEmits(['update:modelValue', 'updateVariable', 'onClose']);
const props = defineProps({
  // 弹出状态
  modelValue: Boolean,
  // 数据
  flagData: Object as PropType<VariableType | null>,
});

const visible = ref(<boolean>false);

const flagVal = ref(<VariableType>{});

/** 字段选项 */
const fields = ref(<LabelValue[]>[]);
/** 值选项 */
const values = ref(<LabelValue[]>[]);

const handleCancel = () => {
  visible.value = false;
};

const handleConfirm = () => {
  const fieldName = fields.value.find(
    (f) => f.value === flagVal.value.field
  )?.label;

  const valueName = values.value.find(
    (f) => f.value === flagVal.value.value
  )?.label;
  emit('updateVariable', {
    type: 'flag',
    data: { ...flagVal.value, fieldName, valueName },
  });
  visible.value = false;
};

const closeFn = () => {
  emit('onClose');
};

const init = async () => {
  try {
    // TODO: 获取字段及对应值的options
    fields.value = [
      {
        label: '是否套餐抵扣',
        value: 'PackageDeduction',
      },
      {
        label: '公证剩余次数',
        value: 'RemainingNotarizationTimes',
      },
    ];
    if (props.flagData?.vid) {
      flagVal.value = { ...props.flagData } as VariableType;
    } else {
      flagVal.value = {
        vid: new Date().getTime(),
        fieldName: '',
        field: '',
        value: '',
        varFieldType: '02',
      };
    }
  } catch (error) {}
};

watch(
  () => flagVal.value.field,
  () => {
    values.value = valuesObj[flagVal.value.field];
  }
);

watch(
  () => props.modelValue,
  async () => {
    visible.value = props.modelValue;

    if (props.modelValue) {
      await init();
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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .el-select {
    width: 40%;
  }
}
</style>
