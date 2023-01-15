/** 创建表函数的参数 */
export interface createStoreParams {
  /** 表名 */
  name: string;
  /** 主键 */
  keyPath: string;
  /** 索引[] */
  createIndexs: {
    /** 索引名称 */
    name: string;
    /** 索引所在的属性 */
    attrName: string;
    /** 配置/设置对象 */
    setting: {
      /** 是否包含重复的值 */
      unique: boolean;
    };
  }[];
}

/** person表每行的数据类型 */
export interface personRowData {
  /** id */
  id: string;
  /** 姓名 */
  name: string | null;
  /** 年龄 */
  age: number | null;
  /** 邮件地址 */
  email: string | null;
}