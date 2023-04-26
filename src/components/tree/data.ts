import { TreeDataType } from './type';

/** 树型数据--基础数据 */
export const treeBaseData: TreeDataType = {
  id: new Date().getTime().toString(),
  type: '',
  // value: '',
  children: [],
  childrenIncludeType: '01',
};
