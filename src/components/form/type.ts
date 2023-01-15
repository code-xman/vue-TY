// import { InternalRuleItem, Values, ValidateOption, SyncValidateResult } from "_async-validator@4.2.5@async-validator";

interface LV {
  label: string;
  value: string;
}

export interface Attrs {
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
  /** 最大值 */
  max?: number;
  /** 最小值 */
  min?: number;
  /** 计数器步长 */
  step?: number;
  /** 是否使用控制按钮 */
  controls?: boolean;
  /** select选项 */
  options?: LV[];
  /** datepicker 数据格式化 */
  valueFormat?: string;
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
    blur?: (event: any) => void;
    click?: (event: any) => void;
    change?: (event: any) => void;
    fouce?: (event: any) => void;
  },
  children?: any;
}