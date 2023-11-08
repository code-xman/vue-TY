import { post } from '@/api/http';

// 获取验证码
export const getValidateCode= async () => {
  const res = await post<{data: {code: string}}>(
    '/api/getValidateCode'
  );
  return res?.data;
};