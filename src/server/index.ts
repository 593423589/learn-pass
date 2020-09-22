import { request } from 'umi';
import { LoginType } from '@/type';
const prefix = '/api';

export const login = (data: LoginType) =>
  request(`${prefix}/login`, {
    method: 'POST',
    data,
  });

export const getCourse = (data: unknown) => request(`${prefix}/getCourse`);
