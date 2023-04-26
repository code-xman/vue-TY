<template>
  <div class="leaf">
    <el-icon class="delete" color="#F56C6C" @click="handleDelete">
      <Remove />
    </el-icon>
    <el-input v-model="leafValue" clearable @blur="handleBlur" />
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import { ElMessageBox, ElMessage, } from 'element-plus';
import { Remove } from '@element-plus/icons-vue';
import { TreeDataType, TreeDataChildrenType, } from './type';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object as PropType<TreeDataChildrenType>,
    required: true,
  },
})
const emit = defineEmits(['on-delete', 'on-change']);

const leafValue = ref(<string>props.data.value);

/** 删除 */
const handleDelete = async () => {
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

const handleBlur = () => {
  emit('on-change', {
    ...props.data,
    value: leafValue.value,
  })
};

</script>

<style lang="less" scoped>
.leaf {
  position: relative;
  border-left: 1px solid #ddd;
  display: flex;
  align-items: flex-start;
  padding-bottom: 16px;
  &::before {
    position: absolute;
    top: 16px;
    content: '';
    margin-right: 4px;
    width: 40px;
    border-bottom: 1px solid #ddd;
  }
  &.lastOne {
    border-left: 0;
    &::after {
      position: absolute;
      top: 0;
      content: '';
      height: 16px;
      border-left: 1px #ddd solid;
    }
  }
  .delete {
    margin: 8px 8px 0 44px;
    cursor: pointer;
    font-size: 16px;
  }
  &.lastOne {
    .delete {
      margin-left: 45px;
    }
  }
  .el-input {
    width: 300px;
  }
}
</style>
