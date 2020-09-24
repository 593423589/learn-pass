import { request } from 'umi';
import { LoginType } from '@/type';
import makeQuery from '@/util/makeQuery';
const prefix = '/api';

export const login = (data: LoginType) =>
  request(`${prefix}/login`, {
    method: 'POST',
    data,
  });

export const getCourse = (data: unknown) => request(`${prefix}/getCourse`);
export const getVideos = (data: any) =>
  request(`${prefix}/getVideos${makeQuery(data)}`);
