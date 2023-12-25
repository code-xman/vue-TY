import { FormItem } from '@/components/form/type';

// inAttrs 是否在attrs里，仅 name = name | label | tag | required | width 为false，其余都应该是true
export type FormItemType = FormItem & { inAttrs?: boolean };

/** 表单每项的属性类型 */
export interface ItemObj {
  id: string;
  type: string;
  tag: string;
  name: string;
  label: string;
  required?: boolean;
  width?: string;
  attrs?: any;
}