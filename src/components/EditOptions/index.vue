<template>
  <div class="EditOptions">
    <el-button type="primary" plain @click="showModal = true">
      选项配置
    </el-button>
    <el-dialog v-model="showModal">
      <div class="content">
        <el-button class="mb-10" type="primary" @click="addOption">
          新增
        </el-button>
        <el-table
          ref="sortTableRef"
          stripe
          border
          :data="tableData"
          style="width: 100%"
          height="calc(100vh - 15vh - 50px - 196px)"
        >
          <el-table-column
            type="index"
            width="60"
            align="center"
            header-align="center"
            label="#"
          />

          <el-table-column
            label="名称"
            min-width="140"
            align="center"
            header-align="center"
          >
            <template #default="{ $index: index }">
              <el-input v-model="tableData[index].label" />
            </template>
          </el-table-column>

          <el-table-column
            label="值"
            min-width="140"
            align="center"
            header-align="center"
          >
            <template #default="{ $index: index }">
              <el-input v-model="tableData[index].value" />
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="80"
            align="center"
            header-align="center"
          >
            <template #default="{ row }">
              <el-button link type="danger" @click="() => handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <el-button @click="showModal = false">关闭</el-button>
        <el-button type="primary" @click="updateOptions">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';

import { OptionType } from './type';

defineOptions({ name: 'EditOptions' });

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Array as PropType<OptionType[]>,
    default: () => [],
  },
});

const tableData = ref(<OptionType[]>[]);
const showModal = ref(<boolean>false);

watch(showModal, (val) => {
  if (!val) {
    tableData.value = [];
  } else {
    tableData.value = props.modelValue;
  }
});

const updateOptions = () => {
  emit('update:modelValue', tableData.value);
  showModal.value = false;
};

const addOption = () => {
  tableData.value.push({
    id: new Date().getTime().toString(),
    label: '',
    value: '',
  });
};

const handleDelete = (row: OptionType) => {
  tableData.value = tableData.value.filter((e) => e.id !== row.id);
};
</script>

<style lang="less" scoped></style>
