import { FormItem } from '@/components/form/type';

// inAttrs 是否在attrs里，仅 name = name | label | tag | required | width 为false，其余都应该是true
export type FormItemType = FormItem & {inAttrs?: boolean};

export const FormItemAttrObj: {[key: string]: FormItemType[]} = {
  input: [
    {
      name: 'label',
      label: '字段名称',
      tag: 'ElInput',
    },
    {
      name: 'maxlength',
      label: '最大输入长度',
      tag: 'ElInput',
      inAttrs: true,
    },
  ]
}

export const FormValueObj: {[key: string]: any} = {
  input: {
    label: '',
    maxlength: '',
  }
}