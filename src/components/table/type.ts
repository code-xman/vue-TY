import { TableProps, TableColumnInstance, TableColumnCtx } from 'element-plus';

/** 公共表格的属性 */
export interface TablePropsType {
  /** 高度 */
  height?: string | number;
  /** element支持的属性 */
  attrs?: Partial<TableProps<any>>;
}

/** 公共表格列的属性 */
export interface columnsType {
  /** prop */
  prop: string;
  /** 展示名称 */
  label: string;
  /** 最小宽度 */
  minWidth?: string;
  /** 表头文字对齐 */
  headerAlign?: string;
  /** 表格文字对齐 */
  align?: string;
  /** element el-table-column 支持的属性 */
  attrs?: Partial<TableColumnInstance>;
  // 感觉和上面这个差不多，不晓得用哪个
  // attrs?: Partial<TableColumnCtx<any>>;
}

/** 操作列配置 */
export interface optionColType {
  /** 操作列width */
  optionWidth?: number | string;
  /** 操作列label */
  optionLabel?: string;
  /** element el-table-column 支持的属性 */
  attrs?: Partial<TableColumnInstance>;
}