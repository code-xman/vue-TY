import { FormItemType, ItemObj, } from '@/pages/fun/DomDrag/type';
import {
  FormItemAttrInput,
  FormItemAttrSelect,
  FormItemAttrTextarea,
  FormValueCommonObj,
} from '@/pages/fun/DomDrag/baseAttrs';

/** 表单每项的基础属性 */
export const ItemAttrObj: {
  [key: string]: Partial<Omit<ItemObj, 'tag'>> & { tag: string };
} = {
  input: {
    tag: 'ElInput',
  },
  select: {
    tag: 'VSelect',
    attrs: {
      clearable: true,
      options: [],
    },
  },
  textarea: {
    tag: 'ElInput',
    // width: '100%',
    attrs: {
      type: 'textarea',
      autosize: {
        minRows: 4,
        maxRows: 6,
      },
    },
  },
};

export const FormItemAttrObj: { [key: string]: FormItemType[] } = {
  input: FormItemAttrInput,
  select: FormItemAttrSelect,
  textarea: FormItemAttrTextarea,
};

export const FormValueObj: { [key: string]: any } = FormValueCommonObj;
