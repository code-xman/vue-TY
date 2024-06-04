import { LabelValue } from '@/type/common';
import { FormItemType } from '@/pages/fun/DomDrag/type';
/**
 * 新增加可选组件的步骤
 * 1. optionData 增加 options 展示内容，eg.AAA;
 * 2. 去 baseData文件 的 ItemAttrObj 增加对应的 contents 里的 基础属性;
 * 3. 增加 FormItemAttr[AAA] ，其是 attrs 里面展示的内容;
 *    然后去 baseData文件 的 FormItemAttrObj 添加相关映射 {[AAA]: FormItemAttr[AAA]};
 * 4. FormValueCommonObj 增加 对应的 attrs 里的表单数据;
 *    {[AAA]: { ...FormValueCommon, [其他默认属性值] }};
 */

/** options 内容：左侧可使用组件 或者说是 标签类型-tagType */
export const optionData: LabelValue[] = [
  {
    label: '输入框',
    value: 'input',
  },
  {
    label: '数字框',
    value: 'inputNumber',
  },
  {
    label: '选择器',
    value: 'select',
  },
  {
    label: '文本框',
    value: 'textarea',
  },
  {
    label: '日期',
    value: 'date',
  },
  {
    label: '单选框',
    value: 'radio',
  },
  {
    label: '多选框',
    value: 'checkbox',
  },
];

/** 选择组件后 contents 中的默认值 */
export const defaultValueObj: {
  [key: string]: undefined | string | string[];
} = {
  input: '',
  inputNumber: undefined,
  select: '',
  textarea: '',
  date: '',
  radio: '',
  checkbox: [],
};

/** 不在attrs的属性 */
export const outAttrs: string[] = [
  'id',
  'tagType',
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

/** inputNumber */
export const FormItemAttrInputNumber: FormItemType[] = [
  ...FormItemAttrBase,
  {
    name: 'max',
    label: '最大值',
    tag: 'ElInputNumber',
    attrs: {
      controls: false,
      changeValueType: 'blur',
    },
    linkage: (form) => {
      if (isNaN(form.min) || isNaN(form.max))
        return { key: 'max', val: form.max };
      if (form.max < form.min) return { key: 'min', val: undefined };
      return { key: 'max', val: form.max };
    },
  },
  {
    name: 'min',
    label: '最小值',
    tag: 'ElInputNumber',
    attrs: {
      controls: false,
      changeValueType: 'blur',
    },
    linkage: (form) => {
      if (isNaN(form.min) || isNaN(form.max))
        return { key: 'min', val: form.min };
      if (form.max < form.min) return { key: 'max', val: undefined };
      return { key: 'min', val: form.min };
    },
  },
  {
    name: 'step',
    label: '步长',
    tag: 'ElInputNumber',
    attrs: {
      controls: false,
      min: 0.001,
    },
  },
  {
    name: 'precision',
    label: '精度',
    tag: 'ElInputNumber',
    attrs: {
      controls: false,
    },
  },
  {
    name: 'controls',
    label: '使用控制按钮',
    tag: 'ElSwitch',
  },
  {
    name: 'controls-position',
    label: '按钮位置',
    tag: 'VSelect',
    attrs: {
      options: [
        {
          label: '默认',
          value: '',
        },
        {
          label: '右侧',
          value: 'right',
        },
      ],
    },
    filter: (form) => !!form.controls,
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

/** date */
export const FormItemAttrDate: FormItemType[] = [
  ...FormItemAttrBase,
  {
    name: 'type',
    label: '显示类型',
    tag: 'VSelect',
    attrs: {
      options: [
        {
          label: '日期',
          value: 'date',
        },
        {
          label: '日期区间',
          value: 'daterange',
        },
        {
          label: '日期时间',
          value: 'datetime',
        },
        {
          label: '日期时间区间',
          value: 'datetimerange',
        },
        {
          label: '周',
          value: 'week',
        },
        {
          label: '多个日期',
          value: 'dates',
        },
      ],
    },
  },
];

/** radio */
export const FormItemAttrRadio: FormItemType[] = [
  ...FormItemAttrBase,
  {
    name: 'options',
    label: '选项',
    tag: 'EditOptions',
  },
  {
    name: 'type',
    label: '显示类型',
    tag: 'VSelect',
    attrs: {
      options: [
        {
          label: '默认',
          value: 'default',
        },
        {
          label: '边框',
          value: 'border',
        },
        {
          label: '按钮',
          value: 'button',
        },
      ],
    },
  },
];

/** checkbox */
export const FormItemAttrCheckbox: FormItemType[] = [
  ...FormItemAttrBase,
  {
    name: 'options',
    label: '选项',
    tag: 'EditOptions',
  },
  {
    name: 'type',
    label: '显示类型',
    tag: 'VSelect',
    attrs: {
      options: [
        {
          label: '默认',
          value: 'default',
        },
        {
          label: '边框',
          value: 'border',
        },
        {
          label: '按钮',
          value: 'button',
        },
      ],
    },
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
  inputNumber: {
    ...FormValueCommon,
    // min: undefined,
    // max: undefined,
    step: 1,
    precision: 2,
    controls: true,
    'controls-position': '',
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
  date: {
    ...FormValueCommon,
    type: 'datetime',
  },
  radio: {
    ...FormValueCommon,
    type: 'default',
    options: [],
  },
  checkbox: {
    ...FormValueCommon,
    type: 'default',
    options: [],
  },
};
