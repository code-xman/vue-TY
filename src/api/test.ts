import { post } from '@/api/http';
import { LabelValue } from '@/type/common';

// 查询Options数据
export const ApiGetOptions = async () => {
  const res = await post<{data: LabelValue[]}>(
    '/api/getOptions'
  );
  return res?.data;
};
