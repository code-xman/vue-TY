import {
  TablePropsType,
  columnsType,
  optionColType,
} from '@/components/table/type';
import { createStoreParams } from './type';
/** 表格的属性 */
export const tableProps: TablePropsType = {
  attrs: {
    rowKey: 'id',
    border: true,
    stripe: true,
  },
};

/** 表格的列及属性 */
export const columns: columnsType[] = [
  {
    prop: 'id',
    label: '编号',
    align: 'center',
    minWidth: '140',
  },
  {
    prop: 'name',
    label: '姓名',
    align: 'center',
    minWidth: '120',
  },
  {
    prop: 'age',
    label: '年龄',
    align: 'center',
    minWidth: '100',
  },
  {
    prop: 'email',
    label: '邮箱',
    minWidth: '180',
  },
];
/** 表格的操作列及属性 */
export const optionCol: optionColType = {
  optionWidth: '160',
  optionLabel: '操作',
  attrs: {
    headerAlign: 'center',
    align: 'center',
  },
};

/** person表的params */
export const personParams: createStoreParams = {
  name: 'person',
  keyPath: 'id',
  createIndexs: [
    {
      name: 'name',
      attrName: 'name',
      setting: { unique: false },
    },
    {
      name: 'email',
      attrName: 'email',
      setting: { unique: true },
    },
  ],
};
