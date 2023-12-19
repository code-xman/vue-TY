import { FormItem } from '@/components/form/type';

// inAttrs 是否在attrs里，仅 name = name | label | tag | required | width 为false，其余都应该是true
export type FormItemType = FormItem & { inAttrs?: boolean };

/** attrs 里的表单属性 基础版 */
export const FormItemAttrBase = [
  {
    name: 'label',
    label: '字段名称',
    tag: 'ElInput',
    required: true,
  },
  {
    name: 'required',
    label: '是否必填',
    tag: 'ElSwitch',
    attrs: {
      'active-text': '是',
      'inactive-text': '否',
    }
  },
  {
    name: 'width',
    label: '长度',
    tag: 'ElSwitch',
    attrs: {
      'active-text': '100%',
      'inactive-text': '50%',
      'active-value': '100%',
      'inactive-value': 'calc(50% - 5px)',
    },
  },
  {
    name: 'maxlength',
    label: '最大输入长度',
    tag: 'ElInput',
    inAttrs: true,
  },
];

/** attrs 里的表单数据 基础版 */
export const FormValueBase = {
  label: '',
  required: false,
  width: '50%',
  maxlength: '',
};
