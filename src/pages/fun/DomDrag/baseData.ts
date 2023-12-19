import {
  FormItemType,
  FormItemAttrBase,
  FormValueBase,
} from '@/pages/fun/DomDrag/FormItemAttrs/base';

export const FormItemAttrObj: { [key: string]: FormItemType[] } = {
  input: [...FormItemAttrBase],
  select: [...FormItemAttrBase.filter(e => !['maxlength'].includes(e.name))],
  textarea: [...FormItemAttrBase],
};

export const FormValueObj: { [key: string]: any } = {
  input: { ...FormValueBase },
  select: { ...FormValueBase },
  textarea: { ...FormValueBase },
};
