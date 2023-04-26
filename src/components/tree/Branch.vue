<template>
  <div class="branch">
    <div class="flex branch_top">
      <el-icon class="delete" color="#F56C6C" @click="deleteBranch">
        <Remove />
      </el-icon>
      <span>满足下列</span>
      <div>
        <el-select v-model="childrenIncludeType" class="select_c">
          <el-option
            v-for="item in childrenIncludeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span>条件</span>
    </div>
    <Leaf
      v-for="(item, index) in children"
      :key="item.id"
      :id="item.id"
      :data="item"
      class="branch_leaf"
      :class="{ lastOne: index === children?.length - 1 }"
      @on-delete="handleDelete"
      @on-change="handleChange"
    />
    <el-button
      class="branch_addLeaf"
      type="primary"
      plain
      @click="addLeaf"
    >
      添加子级
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Remove } from '@element-plus/icons-vue';
import { LabelValue } from '@/type/common';
import { TreeDataType, TreeDataChildrenType } from './type';
import Leaf from './Leaf.vue';
import { treeBaseData } from './data';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object as PropType<TreeDataType>,
    required: true,
  },
});
const emit = defineEmits(['on-delete', 'on-change']);

const children = ref(<TreeDataChildrenType[]>[...(props.data?.children || [])]);
const childrenIncludeType = ref(
  <string>props.data?.childrenIncludeType || '01'
);
const childrenIncludeOptions = ref(<LabelValue[]>[
  {
    label: '所有',
    value: '01',
  },
  {
    label: '任一',
    value: '02',
  },
]);

/** 删除分支 */
const deleteBranch = async () => {
  try {
    const message = '删除此项，确认是否继续？';

    await ElMessageBox.confirm(message, {
      title: '操作提示',
      type: 'warning',
      closeOnClickModal: false,
    });

    emit('on-delete', props.id);

    ElMessage.success('删除成功');
  } catch (error) {
    if (error === 'cancel') return;
    ElMessage.error(`${error}`);
  }
};

const addLeaf = () => {
  children.value.push({
    pId: `branch_${new Date().getTime().toString()}`,
    id: `children_${new Date().getTime().toString()}`,
    type: 'children',
    value: '',
  });
};

const handleDelete = (id: string) => {
  children.value = children.value.filter((e) => e.id !== id);
};
const handleChange = (obj:TreeDataChildrenType) => {
  const leaf = children.value.find(e => e.id = obj.id);
  const leafIndex = children.value.findIndex(e => e.id = obj.id);
  const res = children.value;
  if (!!leaf && leafIndex > -1) {
    children.value = [];
    res.splice(leafIndex, 1, { ...leaf, ...obj });
    children.value = [...res];
  }
};
// 监听数据变化，同步on-change
watch(
  () => [childrenIncludeType.value, children.value],
  () => {
    emit('on-change', {
      ...props.data,
      childrenIncludeType: childrenIncludeType.value,
      children: children.value,
    });
  }
);
</script>

<style lang="less" scoped>
.branch {
  position: relative;
  border-left: 1px solid #ddd;
  padding-bottom: 16px;
  &.lastOne {
    border-left: 0;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      height: 16px;
      border-left: 1px #ddd solid;
    }
  }
  .branch_top {
    padding-bottom: 8px;
    align-items: center;
    font-size: 12px;
    &::before {
      content: '';
      margin-right: 4px;
      width: 40px;
      border-bottom: 1px solid #ddd;
    }
    .delete {
      margin-right: 8px;
      cursor: pointer;
      font-size: 16px;
    }
    .select_c {
      margin-right: 8px;
      width: 80px;
    }
    span {
      margin-right: 8px;
    }
  }
  .branch_leaf {
    margin-left: 80px;
  }
  .branch_addLeaf {
    margin-left: 44px;
  }
}
</style>
