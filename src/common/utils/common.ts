// obj 去除前后空格
export const trimValue = (value: any) => {
  const _trim = (val: string) => val.trimStart().trimEnd();

  // 字符串直接过滤
  if ('string' === typeof value) return _trim(value);

  // 对象递归过滤
  if ('[object Object]' === Object.prototype.toString.call(value)) {
    for (const key in value) {
      const _value = value[key];
      if ('string' === typeof _value) {
        value[key] = trimValue(_value);
      }
    }
    return value;
  }

  // 数组
  if (Array.isArray(value)) {
    value = [...value].map((set) => trimValue(set));
  }

  // 其他不予处理
  return value;
};