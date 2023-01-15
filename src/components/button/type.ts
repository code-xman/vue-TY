// element原生的type，可以通过api文档底部的*源代码--组件*里进行寻找
import { ButtonProps } from 'element-plus';

/** 按钮类型 */
export interface btnItem {
  /** key */
  key: string;
  /** 按钮名称 */
  name: string;
  /** 是否展示 */
  show?: boolean;
  /** 类型；'primary'| 'success'| 'warning'| 'danger'| 'info' */
  // type?: string;
  /** 按钮属性，element原生属性 */
  attr?: Partial<ButtonProps>;
  /** 点击事件 */
  click: (event: any) => void;
}