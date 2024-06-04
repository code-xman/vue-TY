import { FormItemType, ItemObj } from '@/pages/fun/DomDrag/type';
import {
  FormItemAttrInput,
  FormItemAttrInputNumber,
  FormItemAttrSelect,
  FormItemAttrTextarea,
  FormItemAttrDate,
  FormItemAttrRadio,
  FormItemAttrCheckbox,
  FormValueCommonObj,
} from '@/pages/fun/DomDrag/baseAttrs';

/** contents 表单每项的基础属性 */
export const ItemAttrObj: {
  [key: string]: Partial<Omit<ItemObj, 'tag'>> & { tag: string };
} = {
  input: {
    tag: 'ElInput',
  },
  inputNumber: {
    tag: 'ElInputNumber',
    attrs: {
      step: 1,
      precision: 2,
      controls: true,
    },
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
    },
  },
  radio: {
    tag: 'VRadio',
    attrs: {
      type: 'default',
      options: [],
    },
  },
  checkbox: {
    tag: 'VCheckbox',
    attrs: {
      type: 'default',
      options: [],
    },
  },
};

/** attrs 里的表单属性 */
export const FormItemAttrObj: { [key: string]: FormItemType[] } = {
  input: FormItemAttrInput,
  inputNumber: FormItemAttrInputNumber,
  select: FormItemAttrSelect,
  textarea: FormItemAttrTextarea,
  date: FormItemAttrDate,
  radio: FormItemAttrRadio,
  checkbox: FormItemAttrCheckbox,
};

/** attrs 里的表单数据 */
export const FormValueObj: { [key: string]: any } = FormValueCommonObj;
