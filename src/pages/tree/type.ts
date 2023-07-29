import { Ref } from 'vue';

/** 变量/变量 数据类型 */
export interface VariableType {
  vid: string | number;
  /** 字段 */
  field: string;
  /** 原字段 变量使用且必传 */
  oldField?: string;
  /** 字段名称 */
  fieldName: string;
  /** 选择的数据 标识使用且必传 */
  value?: string;
  /** 选择的数据的名称 */
  valueName?: string;
  /** 01:规则内使用(变量) 02:规则子集使用(标识) */
  varFieldType: '01' | '02';
}

/** 一个大规则里的通用数据 */
export interface RuleObj {
  /** 变量累加数字 */
  attrNum: Ref<number>;
}

// 结果
/** 结果操作按钮类型 */
export interface BtnType {
  field: string;
  fieldName: string;
  /**
   * 01:规则内使用(变量) 
   * 02:规则子集使用(标识) 
   * 03:结果计算变量字段 
   * 04:符号(+-*%) 
   * 05:常量  
   * 06:方法(min,max) 
   */
  varFieldType?:  '01' | '02' | '03' | '04' | '05' | '06';
  fn: (data: any) => void;
  canAddIndex: number;
}

/** 结果的公式项类型 */
export interface ResultVariables {
  vid: string | number;
  fieldName?: string;
  field?: string;
  /**
   * 01:规则内使用(变量) 
   * 02:规则子集使用(标识) 
   * 03:结果计算变量字段 
   * 04:符号(+-*%) 
   * 05:常量  
   * 06:方法(min,max) 
   */
  varFieldType?: '01' | '02' | '03' | '04' | '05' | '06';
  /** 03--结果计算变量字段 选择的值 */
  value?: string;
  sort?: number;
}

/** 结果的类型 */
export interface ResultType {
  /** id */
  rid: string | number;
  /** 名称 */
  fieldName?: string;
  /** field */
  field?: string;
  /** 每个结果的公式 */
  variables?: ResultVariables[];
  /** 协商定价 为 '000000'， 其他值没有意义 */
  negotiatedPrice?: string;
}

// 规则类型
/** 规则分支数据类型 */
export interface BranchType {
  fid: string;
  class?: string;
  /** 字段名 */
  field: string;
  /** 字段名称 */
  fieldName?: string;
  /** 字段类型 01--变量 02--规则 */
  fieldType: string;
  /** 比较符 大于 / 小于 / 等于 ... */
  includeType: string;
  /** 比较值 */
  value: string | string[];
  /** 比较值的类型 01:枚举，02:值, 03:变量 */
  valueType: string;
  /** 子级 */
  children?: BranchType[];
  /** 标识/变量 */
  variables?: VariableType[];
  /** 结果 */
  results?: ResultType[];
}
