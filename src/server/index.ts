import { request } from 'umi';
import { LoginType, updatePwdType } from '@/type';
import makeQuery from '@/util/makeQuery';

const prefix = '/api/user';

export const login = (data: LoginType) =>
  request(`${prefix}/login`, {
    method: 'POST',
    data,
  });

export const updatePwd = (data: updatePwdType) =>
  request(`${prefix}/updatePwd`, {
    method: 'PUT',
    data,
  });

export const getCourse = (data: unknown) => request(`${prefix}/getCourse`);
export const getVideos = (data: any) =>
  request(`${prefix}/getVideos${makeQuery(data)}`);

export const getCourseList = () => request(`${prefix}/getCourseList`);
