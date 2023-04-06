// HTTP 请求封装
import axios, { AxiosRequestConfig } from "axios";
import { trimValue } from '@/common/utils/common';

// 配置合并
const _axios = axios.create();

// 请求封装
export const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
  return await _axios.request(options);
};

// GET
export const get = <T>(
  url: string,
  params = {},
  options: AxiosRequestConfig = {}
): Promise<T> => {
  return request({
    ...options,
    url,
    params: trimValue(params),
    method: 'GET'
  });
};

// POST
export const post = async <T>(
  url: string,
  data = {},
  options: AxiosRequestConfig = {}
): Promise<T> => {
  return await request({
    ...options,
    url,
    data: trimValue(data),
    method: 'POST'
  });
};
