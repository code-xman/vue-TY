<!-- 规则分支 -->
<template>
  <div class="branch" :class="class">
    <div class="branch_content">
      <!-- 子级分支竖线补足线 -->
      <div v-if="son?.length > 0" class="plug-line"></div>
      <!-- 删除 -->
      <el-icon class="icon delete" color="#F56C6C" @click="handleDelete">
        <Remove />
      </el-icon>
      <!-- 比较主体 -->
      <el-cascader
        v-model="field"
        :options="options"
        clearable
        :show-all-levels="false"
        class="mg-r-5"
        @change="handleChange"
      />
      <template v-if="field[0] !== '02'">
        <!-- 比较符 -->
        <el-select
          v-model="includeType"
          placeholder="请选择"
          clearable
          class="mg-r-5"
        >
          <el-option
            v-for="item in includeTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 比较值类型 -->
        <el-select
          v-model="valueType"
          placeholder="请选择"
          style="width: 90px"
          clearable
        >
          <el-option
            v-for="item in valueOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 比较值 -->
        <el-select
          v-if="['01', '04'].includes(valueType)"
          v-model="value"
          placeholder="请选择"
          clearable
          :multiple="valueMultiple"
          collapse-tags
          collapse-tags-tooltip
          :class="{ valueMultiple }"
        >
          <el-option
            v-for="item in values"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <template v-else-if="['03'].includes(valueType)">
          <el-input v-model="value[0]" clearable placeholder="请输入区间下限" />
          <el-input v-model="value[1]" clearable placeholder="请输入区间上限" />
        </template>
        <el-input
          v-else
          v-model="value[0]"
          clearable
          placeholder="请输入"
          class="compare-value"
        />
      </template>
      <!-- 新增 -->
      <el-popover
        v-model:visible="popAddVisible"
        :width="162"
        trigger="hover"
        :show-after="500"
      >
        <template #reference>
          <el-icon class="icon add" color="#F56C6C">
            <CirclePlus />
          </el-icon>
        </template>
        <div class="btn-box">
          <el-button
            v-for="btn in btns"
            :key="btn.value"
            :type="btn.type"
            plain
            @click="btn.click"
          >
            {{ btn.text }}
          </el-button>
        </div>
      </el-popover>

      <!-- 变量 -->
      <div v-if="varis_v.length > 0" class="vari_v">
        <el-icon
          class="icon delete"
          color="#F56C6C"
          @click="() => deleteVari({ type: '01' })"
        >
          <Remove />
        </el-icon>
        <div class="block" @click="() => variClick({ type: 'vari' })">
          <!-- {{ varis_v.map((e) => e.field).join(', ') }} -->
          <el-tag v-for="item in varis_v" effect="dark" class="mx-2">
            {{ item.field }}
          </el-tag>
        </div>
      </div>
      <!-- 标识 -->
      <div v-for="item in varis_f" class="vari_f">
        <el-icon
          class="icon delete"
          color="#F56C6C"
          @click="() => deleteVari({ type: '02', id: item.vid })"
        >
          <Remove />
        </el-icon>
        <div
          class="block"
          @click="() => variClick({ type: 'flag', data: item })"
        >
          <span>{{ item.fieldName }}</span>
          <el-tag effect="dark" class="ml-5">
            {{ item.valueName }}
          </el-tag>
        </div>
      </div>
      <!-- 结果 -->
      <div v-if="results.length > 0" class="results">
        <el-icon class="icon delete" color="#F56C6C" @click="() => deleteRes()">
          <Remove />
        </el-icon>
        <div class="result">
          <div
            v-for="item in results"
            :key="item.rid"
            class="block"
            @click="resultFn"
          >
            <span>{{ item.fieldName }}</span>
            <span v-if="item.field"> = </span>
            <span v-for="vItem in item.variables">
              {{ vItem.fieldName }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 子级 -->
    <div v-if="son?.length > 0" class="branch_son">
      <branch
        v-for="(item, index) in son"
        :key="item.fid"
        v-bind="item"
        :class="{ lastOne: index === son?.length - 1 }"
        @on-delete="deleteBranch"
        @on-change="changeBranch"
      />
    </div>
  </div>

  <!-- 弹框--变量 -->
  <VariableDialog
    v-model="variableVisible"
    :varisData="varis_v"
    @updateVariable="updateVariable"
  />
  <!-- 弹框--标识 -->
  <FlagDialog
    v-model="flagVisible"
    :flagData="varis_f_sel"
    @updateVariable="updateVariable"
    @onClose="closeFlagFn"
  />
  <!-- 弹框--结果 -->
  <ResultDialog
    v-model="resultVisible"
    :resultsData="results"
    @updateVariable="updateResult"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType, nextTick, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Remove, CirclePlus } from '@element-plus/icons-vue';
import VariableDialog from './VariableDialog.vue';
import FlagDialog from './FlagDialog.vue';
import ResultDialog from './ResultDialog.vue';
import { BranchType, VariableType, ResultType } from './type';

// 删除icon-比较主体-比较符-比较值类型-比较值-新增icon-变量-标识-结果-子级

const props = defineProps({
  fid: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
  includeType: {
    type: String,
    default: '',
  },
  fieldType: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  valueType: {
    type: String,
    default: '',
  },
  children: {
    type: Array as PropType<BranchType[]>,
    default: () => [],
  },
  variables: {
    type: Array as PropType<VariableType[]>,
    default: () => [],
  },
  results: {
    type: Array as PropType<ResultType[]>,
    default: () => [],
  },
});

const emit = defineEmits(['on-delete', 'on-change']);

/** 比较主体 */
const options = [
  {
    value: '01',
    label: '字段集',
    children: [
      {
        value: 'contractAmount',
        label: '合同金额',
      },
      {
        value: 'contractSigningPlace',
        label: '合同签署地',
      },
    ],
  },
  {
    value: '02',
    label: '规则集',
    children: [
      {
        value: 'rule1',
        label: '规则一',
      },
      {
        value: 'rule2',
        label: '规则二',
      },
    ],
  },
];
/** 比较符 */
const includeTypes = [
  {
    label: '小于',
    value: 'lt',
  },
  {
    label: '小于等于',
    value: 'le',
  },
  {
    label: '等于',
    value: 'eq',
  },
  {
    label: '不等于',
    value: 'nq',
  },
  {
    label: '大于',
    value: 'gt',
  },
  {
    label: '大于等于',
    value: 'ge',
  },
  {
    label: '包含任一',
    value: 'containOne',
  },
  {
    label: '全部不包含',
    value: 'containNotAll',
  },
  {
    label: '在...之间',
    value: 'openClosed',
  },
];
/** 比较值类型 */
const valueTypes = [
  {
    label: '枚举',
    value: '01',
  },
  {
    label: '值',
    value: '02',
  },
  {
    label: '区间值',
    value: '03',
  },
  {
    label: '变量',
    value: '04',
  },
];
/** 比较值 */
const values = [
  {
    label: '数据1',
    value: '01',
  },
  {
    label: '数据2',
    value: '02',
  },
];
const btns = ref([
  {
    text: '变量',
    value: '01',
    type: 'success',
    click: () => variableFn(),
  },
  {
    text: '标识',
    value: '02',
    type: 'warning',
    click: () => flagFn(),
  },
  {
    text: '结果',
    value: '03',
    type: 'primary',
    click: () => resultFn(),
  },
  {
    text: '子级',
    value: '04',
    type: 'danger',
    click: () => sonFn(),
  },
]);
/** 动态比较值类型选项 */
const valueOptions = computed(() => {
  if (['openClosed'].includes(includeType.value)) {
    return valueTypes.filter((vt) => ['01', '03'].includes(vt.value));
  }
  if (['containOne', 'containNotAll'].includes(includeType.value)) {
    return valueTypes.filter((vt) => ['01', '04'].includes(vt.value));
  }
  return valueTypes.filter((vt) => vt.value !== '03');
});

/** 字段名 */
const field = ref(props.field);
/** 比较符 */
const includeType = ref(props.includeType);
/** 比较值类型 */
const valueType = ref(props.valueType);
/** 比较值 */
const value = ref(<string | string[]>[]);
/** 子级 */
const son = ref(<BranchType[]>[]);
/** 新增popover visible */
const popAddVisible = ref(false);
/** 变量dialog visible */
const variableVisible = ref(false);
/** 标识dialog visible */
const flagVisible = ref(false);
/** 结果dialog visible */
const resultVisible = ref(false);
/** 变量/标识 */
const varis = ref(<VariableType[]>[]);
/** 变量 */
const varis_v = ref(<VariableType[]>[]);
/** 标识 */
const varis_f = ref(<VariableType[]>[]);
/** 选中的标识 */
const varis_f_sel = ref(<VariableType | null>null);
/** 结果 */
const results = ref(<ResultType[]>[]);

/** 比较值是否需多选 枚举+（包含/不包含） */
const valueMultiple = computed(() => {
  return (
    valueType.value === '01' &&
    ['containOne', 'containNotAll'].includes(includeType.value)
  );
});

// 变量 click事件
const variClick = (attr: { type: string; data?: VariableType }) => {
  const { type, data } = attr;
  if (type === 'vari') {
    variableVisible.value = true;
  }
  if (type === 'flag') {
    flagVisible.value = true;
    if (data) {
      varis_f_sel.value = data;
    }
  }
};
// 删除 变量 标识
const deleteVari = async (attr: {
  type: '01' | '02';
  id?: string | number;
}) => {
  try {
    const message = '删除此项，确认是否继续？';
    await ElMessageBox.confirm(message, {
      title: '操作提示',
      type: 'warning',
      closeOnClickModal: false,
    });

    const { type, id } = attr;

    if (type === '01') {
      // 删除变量
      varis.value = varis.value.filter((item) => item.varFieldType !== type);
    } else {
      // 删除标识
      varis.value = varis.value.filter((item) => item.vid !== id);
    }

    ElMessage.success('删除成功');
  } catch (error) {
    if (error === 'cancel') return;
    ElMessage.error(`${error}`);
  }
};

// 删除
const handleDelete = async () => {
  emit('on-delete', props.fid);
};
// 修改字段
const handleChange = () => {};
// 变量Fn
const variableFn = () => {
  variableVisible.value = true;
  popAddVisible.value = false;
};
/** 更新 变量/标识 */
const updateVariable = (
  attr:
    | { type: 'vari'; data: VariableType[] }
    | { type: 'flag'; data: VariableType }
) => {
  const { type, data } = attr;
  console.log('attr :>> ', type, data);

  if (type === 'vari') {
    varis.value = varis.value.filter((item) => item.varFieldType !== '01');
    varis.value = data.concat(varis.value);
  }
  if (type === 'flag') {
    const index = varis.value.findIndex((item) => item.vid === data.vid);
    if (index >= 0) {
      varis.value.splice(index, 1, data);
    } else {
      // varis.value = [...varis.value, data];
      varis.value.push(data);
    }
  }
};
// 标识Fn
const flagFn = () => {
  flagVisible.value = true;
  popAddVisible.value = false;
};
// 标识--弹框关闭
const closeFlagFn = () => {
  varis_f_sel.value = null;
};
// 结果Fn
const resultFn = () => {
  resultVisible.value = true;
};
// 结果--更新数据
const updateResult = (data: ResultType[]) => {
  console.log('data :>> ', data);
  results.value = data;
};
// 结果--删除
const deleteRes = async () => {
  try {
    const message = '删除此项，确认是否继续？';
    await ElMessageBox.confirm(message, {
      title: '操作提示',
      type: 'warning',
      closeOnClickModal: false,
    });

    results.value = [];
  } catch (error) {
    if (error === 'cancel') return;
    ElMessage.error(`${error}`);
  }
};
// 子级Fn
const sonFn = () => {
  try {
    son.value.push({
      fid: new Date().getTime().toString(),
      field: '',
      fieldType: '',
      includeType: '',
      value: [],
      valueType: '',
      children: [],
      variables: [],
    });
  } catch (error) {
  } finally {
    popAddVisible.value = false;
  }
};
// 删除Fn
const deleteBranch = async (fid: string) => {
  try {
    const message = '删除此项，确认是否继续？';
    await ElMessageBox.confirm(message, {
      title: '操作提示',
      type: 'warning',
      closeOnClickModal: false,
    });
    son.value = son.value.filter((item) => item.fid !== fid);

    ElMessage.success('删除成功');
  } catch (error) {
    if (error === 'cancel') return;
    ElMessage.error(`${error}`);
  }
};
// 分支数据改变
const changeBranch = async (data: BranchType) => {
  const child = son.value.find((s) => s.fid === data.fid);
  const cIndex = son.value.findIndex((s) => s.fid === data.fid);
  if (!child) return;
  son.value.splice(cIndex, 1, { ...child, ...data });
};

// 监听 比较符
watch(
  () => includeType.value,
  () => {
    // 清空 比较值类型
    valueType.value = '';
  }
);

// 监听 比较值类型
watch(
  () => valueType.value,
  () => {
    // 清空 比较值
    value.value = [];
  }
);
// 监听 变量/标识 数据变化，进行分组
watch(
  () => varis.value,
  () => {
    varis_v.value = varis.value.filter((item) => item.varFieldType === '01');
    varis_f.value = varis.value.filter((item) => item.varFieldType === '02');
  },
  {
    immediate: true,
    deep: true,
  }
);

// 监听数据变化 同步传递给父级
watch(
  () => [
    field.value,
    includeType.value,
    value.value,
    valueType.value,
    varis.value,
    results.value,
    son.value,
  ],
  () => {
    nextTick(() => {
      const res: BranchType = {
        fid: props.fid,
        fieldType: field.value[0],
        field: field.value[1],
        includeType: includeType.value,
        value: value.value,
        valueType: valueType.value,
        variables: varis.value,
        results: results.value,
        children: son.value,
      };
      if (['01', '04'].includes(valueType.value) && !valueMultiple.value) {
        // 比较值 为单选 转换为数组
        res.value = [res.value as string];
      } else if (['03'].includes(valueType.value)) {
        // 比较值 为区间两个input 转为 ["min,max"]
        res.value = [((res.value || []) as string[]).join(',')];
      }
      emit('on-change', res);
    });
  },
  {
    deep: true,
  }
);

// 初始化
const init = () => {
  field.value = props.field;
  includeType.value = props.includeType;
  valueType.value = props.valueType;
  son.value = [...(props.children || [])];
  varis.value = [...(props.variables || [])];
  results.value = [...(props.results || [])];
  if (['01', '04'].includes(valueType.value) && !valueMultiple.value) {
    // 比较值 为单选
    value.value = props.value[0] || '';
  } else if (['03'].includes(valueType.value)) {
    // 比较值 为区间两个input
    value.value = props.value[0] ? props.value[0].split(',') : []
  } else {
    value.value = props.value || [];
  }
};

onMounted(() => {
  init();
})
</script>

<style lang="less" scoped>
// 定义变量
.branch {
  // 左偏移距离
  --LeftOffsetDistance: 60px;
  // 横支宽度
  --Transversal: 40px;
  // 行元素高度
  --RowHeight: 32px;
  // 行元素高度一半
  --HalfRowHeight: 16px;
}

.mx-2 {
  margin: 0 2px;
}
.ml-5 {
  margin-left: 5px;
}
.btn-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-button {
    margin: 4px;
  }
}

.branch {
  position: relative;
  border-left: 1px solid #ddd;
  padding-bottom: 16px;

  &::before {
    position: absolute;
    top: var(--HalfRowHeight);
    content: '';
    margin-right: 4px;
    width: var(--Transversal);
    border-bottom: 1px solid #ddd;
  }

  &.lastOne {
    border-left: 0;
    &::after {
      position: absolute;
      top: 0;
      content: '';
      height: var(--HalfRowHeight);
      border-left: 1px #ddd solid;
    }
    .delete {
      // 45px = 60px - 32px / 2 + 1px
      // 因为无左侧border问题,所以要加1px
      margin-left: calc(var(--LeftOffsetDistance) - var(--RowHeight) / 2 + 1);
    }
  }
  .branch_content {
    display: flex;
    // align-items: center;
    position: relative;
    padding-bottom: 8px;
    .plug-line {
      position: absolute;
      left: var(--LeftOffsetDistance);
      top: var(--RowHeight);
      width: 1px;
      height: calc(100% - var(--RowHeight));
      background-color: #ddd;
    }

    .icon {
      padding: 8px;
      cursor: pointer;
      &.delete {
        // 44px = 60px - 32px / 2
        margin-left: calc(var(--LeftOffsetDistance) - var(--RowHeight) / 2);
        cursor: pointer;
        font-size: 16px;
      }
    }

    :deep(.el-cascader, ),
    .el-select,
    .el-input {
      flex-shrink: 0;
      max-width: 140px;
      height: 32px;
      &.valueMultiple {
        max-width: 200px;
      }
    }

    .vari_v,
    .vari_f,
    .results {
      margin-right: 10px;
      flex-shrink: 0;
      position: relative;
      display: flex;
      // align-items: center;
      &::before {
        position: absolute;
        top: var(--HalfRowHeight);
        content: '';
        margin-right: 4px;
        width: var(--Transversal);
        border-bottom: 1px solid #ddd;
      }
      .block {
        display: flex;
        align-items: center;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 8px;
        height: var(--RowHeight);
        line-height: var(--RowHeight);
        cursor: pointer;
        color: #606266;
        font-size: 14px;
      }
    }
    .vari_v {
      .block {
        padding: 0 2px;
      }
    }
    .results {
      .result {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        .block {
          // margin-bottom: 4px;
          border: 0;
        }
      }
    }
  }

  .branch_son {
    margin-left: var(--LeftOffsetDistance);
    .branch {
      padding-top: 8px;
      padding-bottom: 0;
      &::before {
        top: 24px;
      }
      &.lastOne::after {
        height: 24px;
      }
    }
  }
}
</style>
