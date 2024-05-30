import { FormItemType, ItemObj, } from '@/pages/fun/DomDrag/type';
import {
  FormItemAttrInput,
  FormItemAttrSelect,
  FormItemAttrTextarea,
  FormItemAttrDate,
  FormItemAttrRadio,
  FormValueCommonObj,
} from '@/pages/fun/DomDrag/baseAttrs';

/** contents 表单每项的基础属性 */
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
  date: {
    tag: 'ElDatePicker',
    attrs: {
      type: 'date',
      editable: false,
    }
  },
  radio: {
    tag: 'VRadio',
    attrs: {
      type: 'default',
      options: [],
    },
  }
};

/** attrs 里的表单属性 */
export const FormItemAttrObj: { [key: string]: FormItemType[] } = {
  input: FormItemAttrInput,
  select: FormItemAttrSelect,
  textarea: FormItemAttrTextarea,
  date: FormItemAttrDate,
  radio: FormItemAttrRadio,
};

/** attrs 里的表单数据 */
export const FormValueObj: { [key: string]: any } = FormValueCommonObj;
