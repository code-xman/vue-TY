/** 树型子数据的数据类 */
export interface TreeDataType {
  id: string;
  /** 数据类型 */
  type: string;
  /** 值 */
  // value: string;
  /** 数据子级 */
  children: TreeDataChildrenType[];
  /** 数据子级关系 */
  childrenIncludeType: string;
}

export type TreeDataChildrenType = Omit<
  TreeDataType,
  'children' | 'childrenIncludeType'
> & {
  /** 父级id */
  pId: string;
  /** 值 */
  value: string;
};
