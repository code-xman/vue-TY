<template>
  <el-dialog
    v-model="visible"
    class="ResultDialog"
    title="结果"
    :width="1200"
    :close-on-click-modal="false"
    @close="closeFn"
  >
    <div class="overflow-hide scroll_thin content">
      <div class="showPart scroll_thin">
        <!-- 行循环--每项为一个结果 -->
        <div
          v-for="item in results"
          :key="item.rid"
          class="result-box"
          :class="{ actived: activeId === item.rid }"
        >
          <div class="formula scroll_thin" @click="() => editRow(item.rid)">
            <!-- 公式左侧 xxx =  -->
            <!-- xxx -->
            <div v-if="item.negotiatedPrice !== '000000'" class="dom-box">
              <el-select v-model="item.field" placeholder="请选择" class="dom">
                <el-option
                  v-for="option in testObj.dicOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </div>
            <!-- = -->
            <div
              v-if="item.negotiatedPrice !== '000000'"
              class="dom-box"
              @click.stop="() => domClick({ rid: item.rid })"
            >
              <div class="dom other">=</div>
            </div>
            <!-- 列循环--公式右侧，每项为公式里的一项 -->
            <div
              class="dom-box"
              v-for="(vItem, vIndex) in item.variables"
              :key="vItem.vid"
              @click.stop="() => domClick({ rid: item.rid, vItem })"
            >
              <!-- select -->
              <el-select
                v-if="vItem.varFieldType === '03'"
                v-model="vItem.field"
                placeholder="请选择"
                class="dom"
                @focus.stop="() => domClick({ rid: item.rid, vItem })"
              >
                <el-option
                  v-for="option in testObj.dicOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
              <!-- number -->
              <el-input-number
                v-else-if="vItem.varFieldType === '05'"
                v-model="vItem.field"
                :controls="false"
                class="dom"
                placeholder="请输入"
              ></el-input-number>
              <!-- 光标 -->
              <div
                v-else-if="vItem.field === 'cursor' && activeId === item.rid"
                class="cursor"
              >
                <span></span>
              </div>
              <!-- 其余展示dom -->
              <div v-else-if="vItem.field !== 'cursor'" class="dom other">
                {{ vItem.fieldName }}
              </div>
              <!-- 删除按钮 -->
              <div
                v-if="vItem.field !== 'cursor'"
                class="dom-close"
                @click.stop="() => domClose({ rid: item.rid, vItem })"
              >
                <el-icon><CircleCloseFilled /></el-icon>
              </div>
            </div>
          </div>
          <div class="row-btn">
            <el-button type="primary" link @click="() => editRow(item.rid)"
              >编辑</el-button
            >
            <el-button type="danger" link @click="() => deleteRow(item.rid)"
              >删除</el-button
            >
          </div>
        </div>
      </div>
      <!-- 操作按钮 -->
      <div class="operatePart">
        <div class="btn-box fnBtn">
          <el-button
            v-for="btn in fnBtn"
            :key="btn.field"
            type="primary"
            plain
            :disabled="
              activeResHasconfer || (!activeId && btn.field !== 'addRes')
            "
            @click="() => btn.fn(btn)"
          >
            {{ btn.fieldName }}
          </el-button>
        </div>
        <div class="btn-box baseBtn">
          <el-button
            v-for="btn in baseBtn"
            :key="btn.field"
            type="primary"
            plain
            :disabled="activeResHasconfer || !activeId"
            @click="() => btn.fn(btn)"
          >
            {{ btn.fieldName }}
          </el-button>
        </div>
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
import { PropType, computed, ref, watch } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { CircleCloseFilled } from '@element-plus/icons-vue';
import { BtnType, ResultVariables, ResultType } from './type';
import { LabelValue } from '@/type/common';

// test
const testObj: { dicOptions: LabelValue[] } = {
  dicOptions: [
    {
      label: '计费结果',
      value: 'BillingResult',
    },
    {
      label: '抵扣次数',
      value: 'DeductionTimes',
    },
  ],
};

const emit = defineEmits(['update:modelValue', 'updateVariable']);
const props = defineProps({
  // 弹出状态
  modelValue: Boolean,
  // 结果数据
  resultsData: {
    type: Array as PropType<ResultType[]>,
    default: () => [],
  },
});

const visible = ref(<boolean>false);
const activeId = ref(<string | number>'');
// 结果list数据
const results = ref(<ResultType[]>[]);
// 当前结果
const activeResult = computed(() => {
  const res = results.value.find((r) => r.rid === activeId.value);
  return res;
});
// 当前结果是否协商定价
const activeResHasconfer = computed(() => {
  const activeFlag = activeResult.value?.variables?.find(
    (v) => v.field === 'conferPrice'
  );
  const firstFlag = results.value[0]?.variables?.find(
    (v) => v.field === 'conferPrice'
  );
  return !!activeFlag || !!firstFlag;
});
// 添加一行新的结果
const addRow = () => {
  const rid = new Date().getTime();
  activeId.value = rid;
  results.value.push({
    rid: rid,
    fieldName: '',
    field: '',
    variables: [
      {
        vid: rid,
        field: 'cursor',
      },
    ],
    negotiatedPrice: '',
  });
};

// 底部操作按钮
const addBaseFn = (data: BtnType) => {
  try {
    // console.log('addBaseFn', data);

    // 添加结果
    if (data.field === 'addRes') {
      addRow();
      return;
    }
    // 没有 activeId
    if (!activeId.value) {
      throw '请先选择需要操作的结果公式';
    }
    // 选择的结果
    const selectRes = results.value.find((r) => r.rid === activeId.value);
    // 没有 选择结果
    if (!selectRes) {
      throw '请先选择需要操作的结果公式';
    }

    // 当前结果的index
    const index = results.value.findIndex((r) => r.rid === activeId.value);
    // 光标的index
    const cIndex = (
      results.value[index].variables as ResultVariables[]
    ).findIndex((v) => v.field === 'cursor');
    if (cIndex < 0) return;

    switch (data.field) {
      // 添加结果 已提前处理
      // case 'addRes': {break;}

      // 协商定价
      case 'conferPrice': {
        // 添加 协商定价
        const conferPriceRes = {
          ...results.value[index],
          field: '',
          fieldName: '',
          negotiatedPrice: '000000',
          variables: [
            {
              vid: new Date().getTime(),
              field: data.field,
              fieldName: data.fieldName,
              varFieldType: data.varFieldType,
              sort: results.value[index]?.variables?.length || 0,
            },
            {
              vid: new Date().getTime() + 1,
              field: 'cursor',
            },
          ],
        };
        results.value = [conferPriceRes];
        break;
      }

      case 'max':
      case 'min': {
        const arr: ResultVariables[] = ['(', ',', ')'].map((a, i) => {
          return {
            vid: new Date().getTime() + i + 1,
            fieldName: a,
            field: a,
            varFieldType: '04',
            sort: (results.value[index]?.variables?.length || 0) + i + 1,
          };
        });
        results.value[index]?.variables?.splice(
          cIndex,
          1,
          {
            vid: new Date().getTime(),
            fieldName: data.fieldName,
            field: data.field,
            varFieldType: data.varFieldType,
            sort: results.value[index].variables?.length || 0,
          },
          ...arr,
          {
            vid: new Date().getTime() + 4,
            field: 'cursor',
          }
        );
        break;
      }

      // 其他按钮
      default: {
        results.value[index].variables?.splice(
          cIndex,
          1,
          {
            vid: new Date().getTime(),
            fieldName: ['03', '05'].includes(data.varFieldType || '')
              ? ''
              : data.fieldName,
            field: ['03', '05'].includes(data.varFieldType || '')
              ? undefined
              : data.field,
            varFieldType: data.varFieldType,
            sort: results.value[index]?.variables?.length || 0,
          },
          {
            vid: new Date().getTime() + 1,
            field: 'cursor',
          }
        );
        break;
      }
    }
  } catch (error) {
    ElMessage.warning(`${error}`);
  }
};
// 基础按钮
const baseBtn: BtnType[] = [
  {
    field: '+',
    fieldName: '+',
    varFieldType: '04',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  {
    field: '-',
    fieldName: '-',
    varFieldType: '04',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  {
    field: '*',
    fieldName: '*',
    varFieldType: '04',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  {
    field: '/',
    fieldName: '/',
    varFieldType: '04',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  // {
  //   field: '=',
  //   fieldName: '=',
  //   varFieldType: '04',
  //    canAddIndex: 2,
  //   fn: addBaseFn,
  // },
  {
    field: ',',
    fieldName: ',',
    varFieldType: '04',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  {
    field: '(',
    fieldName: '(',
    varFieldType: '04',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  {
    field: ')',
    fieldName: ')',
    varFieldType: '04',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  {
    field: 'min',
    fieldName: 'min',
    varFieldType: '06',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  {
    field: 'max',
    fieldName: 'max',
    varFieldType: '06',
    canAddIndex: 2,
    fn: addBaseFn,
  },
];
// 功能按钮
const fnBtn: BtnType[] = [
  {
    field: 'addRes',
    fieldName: '添加结果',
    canAddIndex: 0,
    fn: addBaseFn,
  },
  {
    field: 'dataDic',
    fieldName: '添加数据字典',
    varFieldType: '03',
    canAddIndex: 0,
    fn: addBaseFn,
  },
  {
    field: 'addNumber',
    fieldName: '添加数字',
    varFieldType: '05',
    canAddIndex: 2,
    fn: addBaseFn,
  },
  {
    field: 'conferPrice',
    fieldName: '协商定价',
    varFieldType: '06',
    canAddIndex: 2,
    fn: addBaseFn,
  },
];

// 结果里每一个项的click 处理光标的位置
const domClick = (params: {
  rid: string | number;
  vItem?: ResultVariables;
}) => {
  const { rid, vItem } = params;
  const { vid } = vItem || {};
  // 修改activeId
  activeId.value = rid;
  const rItem = results.value.find((r) => r.rid === rid);
  const rIndex = results.value.findIndex((r) => r.rid === rid);
  if (!rItem) return;
  rItem.variables = rItem.variables?.filter((v) => v.field !== 'cursor');

  const vIndex = (rItem.variables as ResultVariables[]).findIndex(
    (v) => v.vid === vid
  );
  // if (vIndex < 0) return;
  rItem.variables?.splice(vIndex + 1, 0, {
    vid: new Date().getTime(),
    field: 'cursor',
  });
  results.value.splice(rIndex, 1, rItem);
};

// 结果里每一个项的删除
const domClose = (params: { rid: string | number; vItem: ResultVariables }) => {
  const { rid, vItem } = params;
  const { vid, field } = vItem;
  // 协商定价
  if (field === 'conferPrice') {
    // 清空结果list
    results.value = [];
    // 添加一行新的结果
    addRow();
    return;
  }
  const rItem = results.value.find((r) => r.rid === rid);
  const rIndex = results.value.findIndex((r) => r.rid === rid);
  if (!rItem) return;
  rItem.variables = rItem.variables?.filter((v) => v.vid !== vid);
  results.value.splice(rIndex, 1, rItem);
};
// 结果--编辑
const editRow = (id: string | number) => {
  // 修改activeId
  activeId.value = id;
  // 当前结果的index
  const index = results.value.findIndex((item) => item.rid === id);
  if (index < 0) return;
  // 删除之前的光标
  results.value[index].variables = results.value[index].variables?.filter(
    (v) => v.field !== 'cursor'
  );
  // 光标放末尾
  results.value[index].variables?.push({
    vid: new Date().getTime(),
    field: 'cursor',
  });
};
// 结果--删除
const deleteRow = async (id: string | number) => {
  try {
    const message = '删除此项，确认是否继续？';
    await ElMessageBox.confirm(message, {
      title: '操作提示',
      type: 'warning',
      closeOnClickModal: false,
    });

    results.value = results.value.filter((r) => r.rid !== id);
  } catch (error) {
    if (error === 'cancel') return;
    ElMessage.warning(`${error}`);
  }
};

// 获取Field对应的FieldName
const getFieldName = (field: string) => {
  if (!field) return '';
  return testObj.dicOptions.find((d) => d.value === field)?.label;
};
// 取消
const handleCancel = () => {
  visible.value = false;
};
// 确定
const handleConfirm = () => {
  // 组装结果数据
  const res = results.value.map((item) => {
    const res_variables = (item.variables || [])
      .filter((v) => v.field !== 'cursor')
      .map((v) => {
        const fieldName =
          v.varFieldType === '03' && v.field
            ? getFieldName(v.field)
            : v.fieldName || v.field;

        return {
          ...v,
          fieldName,
        };
      });
    // 处理 协商定价
    if (res_variables[0].field === 'conferPrice') {
      item.negotiatedPrice = '000000';
    }
    const fieldName = getFieldName(item.field as string);
    return {
      ...item,
      fieldName,
      variables: res_variables,
    };
  });
  emit('updateVariable', res);
  visible.value = false;
};
// 初始化
const init = () => {
  results.value = props.resultsData;
};

watch(
  () => props.modelValue,
  async () => {
    visible.value = props.modelValue;

    if (props.modelValue) {
      init();
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
// 关闭弹框回调
const closeFn = () => {
  results.value = [];
  activeId.value = '';
};
</script>

<style lang="less" scoped>
.content {
  .showPart {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    min-height: 120px;
    max-height: 240px;
    box-sizing: border-box;
    overflow: auto;
    padding: 10px;
    .result-box {
      margin-bottom: 8px;
      border: 1px solid var(--el-color-primary-light-3);
      border-radius: 5px;
      width: 100%;
      height: 50px;
      padding: 0 0 0 8px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.actived {
        background-color: var(--el-color-primary-light-9);
      }
      &:last-child {
        margin-bottom: 0;
      }

      .formula {
        flex: 1;
        display: flex;
        align-items: center;
        overflow-x: auto;
        overflow-y: visible;
        padding: 6px 0;
        .dom-box {
          position: relative;
          flex-shrink: 0;
          margin-left: 4px;
          &:first-child {
            margin-left: 0;
          }
        }
        .dom {
          &.el-select {
            width: 160px;
          }
          &.el-input-number {
            width: 100px;
          }
          &.other {
            border: 1px solid #ddd;
            border-radius: 5px;
            min-width: 32px;
            height: 30px;
            line-height: 28px;
            padding: 0 6px;
            background-color: #fff;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
            user-select: none; // 禁止框选
          }
        }
        .dom-close {
          position: absolute;
          top: -4px;
          right: -4px;
          color: #f56c6c;
          cursor: pointer;
        }
        .cursor {
          animation: 0.6s van-cursor-flicker infinite;
          height: 26px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          span {
            width: 1px;
            height: 100%;
            background-color: #666;
          }
        }
      }
      .row-btn {
        margin-left: 8px;
        border-left: 1px solid var(--el-color-primary-light-5);
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .operatePart {
    .btn-box {
      margin-bottom: 10px;
    }
  }
}

@keyframes van-cursor-flicker {
  from {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
