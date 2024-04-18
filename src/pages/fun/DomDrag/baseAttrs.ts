import { FormItemType } from '@/pages/fun/DomDrag/type';

/** options 内容：左侧可使用组件 */
export const optionData: string[] = ['input', 'select', 'textarea'];

/** 不在attrs的属性 */
export const outAttrs: string[] = [
  'id',
  'type',
  'tag',
  'name',
  'label',
  'required',
  'width',
];

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
];

/** input */
export const FormItemAttrInput: FormItemType[] = [
  ...FormItemAttrBase,
  {
    name: 'maxlength',
    label: '最大输入长度',
    tag: 'ElInput',
  },
];

/** select */
export const FormItemAttrSelect: FormItemType[] = [
  ...FormItemAttrBase,
  {
    name: 'options',
    label: '选项',
    tag: 'EditOptions',
  },
];

/** textarea */
export const FormItemAttrTextarea: FormItemType[] = [
  ...FormItemAttrBase,
  {
    name: 'maxlength',
    label: '最大输入长度',
    tag: 'ElInput',
  },
  {
    name: 'show-word-limit',
    label: '是否显示字数',
    tag: 'ElSwitch',
    filter: (val) => !!val.maxlength,
  },
];

/** attrs 里的表单数据 公共版 */
export const FormValueCommon = {
  label: '',
  required: false,
  width: 'calc(50% - 5px)', // 展示默认 50%，实际为 calc(50% - 5px)
};

/** attrs 里的表单数据 各项分离版 */
export const FormValueCommonObj: { [key: string]: any } = {
  input: {
    ...FormValueCommon,
    maxlength: '',
  },
  select: {
    ...FormValueCommon,
    options: [],
  },
  textarea: {
    ...FormValueCommon,
    maxlength: '',
    'show-word-limit': false,
    width: '100%',
  },
};
