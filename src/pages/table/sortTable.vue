<template>
  <div class="flex-all column sortTable">
    <div class="title">sortTable</div>
    <div class="flex-1 overflow-auto">
      <BaseTable
        ref="sortTableRef"
        :tableProps="tableProps"
        :tableData="tableData"
        :columns="columns"
        :optionCol="optionCol"
      >
        <template #options="{ row }">
          <el-popconfirm
            title="是否确认删除?"
            @confirm="() => handleDelete(row)"
          >
            <template #reference>
              <el-button link type="primary"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DefineComponent, onMounted, ref } from 'vue';
import Sortable from 'sortablejs';
import BaseTable from '@/components/table/baseTable.vue';
import { tableProps, columns, optionCol } from './data';
import { RowType } from './type';

const sortTableRef = ref<DefineComponent | null>(null);
const tableData = ref(<RowType[]>[
  {
    id: '1',
    name: '1',
    age: '1',
  },
  {
    id: '2',
    name: '2',
    age: '2',
  },
  {
    id: '3',
    name: '3',
    age: '3',
  },
  {
    id: '4',
    name: '4',
    age: '4',
  },
]);
const handleDelete = (row: RowType) => {};

const initSortable = (className: string) => {
  // 获取表格row的父节点
  const table = document.querySelector(
    '.' + className + ' .el-table__body-wrapper tbody'
  );
  console.log('table :>> ', table);

  let dragTable = Sortable.create(table, {
    animation: 150, //动画
    disabled: false, // 拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
    handle: '.el-table__row', //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
    // filter: '.disabled', //指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
    // dragClass: 'dragClass', //设置拖拽样式类名
    // ghostClass: 'ghostClass', //设置拖拽停靠样式类名
    // chosenClass: 'chosenClass', //设置选中样式类名
    // 开始拖动事件
    onStart: () => {
      console.log('开始拖动');
    },
    // 结束拖动事件
    onEnd: ({ newIndex, oldIndex }: { newIndex: number; oldIndex: number }) => {
      console.log('结束拖动', `拖动前索引${oldIndex}---拖动后索引${newIndex}`);
      const currRow = tableData.value.splice(oldIndex, 1)[0];
      tableData.value.splice(newIndex, 0, currRow);
      console.log('结束拖动', tableData.value);
    },
  });
};

onMounted(() => {
  initSortable('sortTable');
});
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
</style>
