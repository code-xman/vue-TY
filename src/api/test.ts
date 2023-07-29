import { post } from '@/api/http';
import { LabelValue } from '@/type/common';

// 查询 Options 数据
export const ApiGetOptions = async () => {
  const res = await post<{data: {data: LabelValue[]}}>(
    '/api/getOptions'
  );
  return res?.data;
};

// 查询 Variable 数据
export const ApiGetVariable = async () => {
  const res = await post<{data: {data: LabelValue[]}}>(
    '/api/getVariable'
  );
  return res?.data;
};

