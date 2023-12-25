import { FormItemType } from '@/pages/fun/DomDrag/type';

/** options 内容：左侧可使用组件 */
export const optionData: string[] = ['input', 'select', 'textarea'];

/** attrs 里的表单属性 基础版 */
export const FormItemAttrBase: FormItemType[] = [
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
    },
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
  {
    name: 'options',
    label: '选项',
    tag: 'EditOptions',
    inAttrs: true,
  },
];

/** input */
export const FormItemAttrInput: FormItemType[] = [...FormItemAttrBase];

/** select */
export const FormItemAttrSelect: FormItemType[] = [
  ...FormItemAttrBase.filter((e) => !['maxlength'].includes(e.name)),
];

/** textarea */
export const FormItemAttrTextarea: FormItemType[] = [...FormItemAttrBase];

/** attrs 里的表单数据 公共版 */
export const FormValueCommon = {
  label: '',
  required: false,
  width: '50%',
};

/** attrs 里的表单数据 各项分离版 */
export const FormValueCommonObj: { [key: string]: any } = {
  input: {
    ...FormValueCommon,
    maxlength: '',
  },
  select: {
    ...FormValueCommon,
    options: [
      {
        label: '111',
        value: '222',
      },
    ],
  },
  textarea: {
    ...FormValueCommon,
    maxlength: '',
  },
};
