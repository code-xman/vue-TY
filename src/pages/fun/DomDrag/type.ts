import { FormItem, Attrs, } from '@/components/form/type';

export type FormItemType = FormItem & {
  /** 是否显示此项 */
  filter?: (val?:any) => boolean;
  /** 修改此项后的联动变化 */
  linkage?: (val?:any) => any;
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
