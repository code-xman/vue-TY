// import { InternalRuleItem, Values, ValidateOption, SyncValidateResult } from "_async-validator@4.2.5@async-validator";
import { LabelValue } from '@/type/common';

export interface Attrs {
  /** 更新数据时机
   * blur-在元素失去焦点时触发
   * change-在输入元素失去焦点时触发
   * input-在用户输入内容时触发
   *  */
  changeValueType?: 'blur' | 'change' | 'input';
  /** 是否可清除 */
  clearable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 最大length */
  maxlength?: number;
  /** 类型 */
  type?: string;
  /** textarea 高度是否自适应 */
  autosize?: {
    /** 最少行数 */
    minRows: number;
    /** 最多行数 */
    maxRows: number;
  } | false;
  /** number 最大值 */
  max?: number;
  /** 最小值 */
  min?: number;
  /** 计数器步长 */
  step?: number;
  /** number 精度/小数位数 */
  precision?: number;
  /** 是否使用控制按钮 */
  controls?: boolean;
  /** select选项 */
  options?: LabelValue[];
  /** datepicker 数据格式化 */
  valueFormat?: string;
  /** switch 的状态为 on 时文字描述  */
  'active-text'?: string;
  /** switch 的状态为 off 时的文字描述  */
  'inactive-text'?: string;
  /** switch 状态为 on 时的值 */
  'active-value'?: boolean | string | number;
  /** switch 状态为 off 时的值 */
  'inactive-value'?: boolean | string | number;
  /** date 文本框是否可输入 */
  editable?: boolean;
}

export interface FormItem {
  /** key */
  name: string;
  /** label */
  label: string;
  // FIXME: tag的类型申明
  /** 标签名称 */
  tag: any;
  /** 是否必填 */
  required?: boolean;
  /** 宽度 */
  width?: string;
  /** 属性 */
  attrs?: Attrs;
  /** 绑定回调事件 */
  events?: {
    Blur?: (event: any) => void;
    Click?: (event: any) => void;
    Change?: (event: any) => void;
    Fouce?: (event: any) => void;
  };
  children?: any;
}
