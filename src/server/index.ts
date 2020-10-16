import request from 'umi-request';

import { LoginType, updatePwdType } from '@/type';

export * from './course';
export * from './video';
export * from './document';
export * from './question';

export const PREFIX = '/api/user';

export const login = (data: LoginType) =>
  request(`${PREFIX}/login`, {
    method: 'POST',
    data,
  });

export const updatePwd = (data: updatePwdType) =>
  request(`${PREFIX}/updatePwd`, {
    method: 'PUT',
    data,
  });
