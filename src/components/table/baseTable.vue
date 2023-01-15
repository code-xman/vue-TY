<!--
 * @Description: 公共基础表单
 * @Author: xiangjie
 * @Date: 2023-01-11 16:55:55
 * @LastEditors: xiangjie
 * @LastEditTime: 2023-01-12 11:23:50
-->
<template>
  <div class="base-table"></div>
  <el-table
    v-bind="tableProps.attrs"
    :data="props.tableData"
    :height="tableProps.height || '100%'"
  >
    <el-table-column v-if="selection" type="selection" width="55" />
    <el-table-column
      v-for="col in props.columns"
      v-bind="col.attrs"
      :prop="col.prop"
      :label="col.label"
      :min-width="col.minWidth || 140"
      :header-align="col.headerAlign || 'center'"
      :align="col.align || 'left'"
    />
    <el-table-column
      v-if="!!optionCol"
      fixed="right"
      v-bind="optionCol.attrs"
      :label="optionCol.optionLabel || '操作'"
      :width="optionCol.optionWidth || 140"
    >
      <template #default="{ row }">
        <slot name="options" :row="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { TablePropsType, columnsType, optionColType } from './type';
const props = withDefaults(
  defineProps<{
    /** 公共表格的属性 */
    tableProps: TablePropsType;
    /** 表格数据 */
    tableData: any[];
    /** 表格列配置 */
    columns: columnsType[];
    /** 表格是否需要选择框 */
    selection?: boolean;
    /** 操作列配置 */
    optionCol?: optionColType;
  }>(),
  {
    tableProps: () => ({}),
    tableData: () => [],
    columns: () => [],
    selection: false,
    optionCol: () => ({}),
  }
);
</script>

<style lang="less" scoped></style>
