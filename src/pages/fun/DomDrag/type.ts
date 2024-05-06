import { FormItem } from '@/components/form/type';

export type FormItemType = FormItem & {
  filter?: (val?:any) => boolean;
};

/** 表单每项的属性类型 */
export interface ItemObj {
  id: string;
  // type: string;
  /** 标签类型 */
  tagType: string; 
  tag: string;
  name: string;
  label: string;
  required?: boolean;
  width?: string;
  attrs?: any;
}
