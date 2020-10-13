import request from 'umi-request';

import makeQuery from '@/util/makeQuery';
import cleanObject from '@/util/cleanObject';

export const PREFIX = '/api/course';

export const getCourseList = () => request(`${PREFIX}/getCourseList`);

export const getVideoList = (data: { courseId: number }) =>
  request(`${PREFIX}/getVideoList${makeQuery(data)}`);

export const joinCourse = (data: { token: string }) =>
  request(`${PREFIX}/joinCourse${makeQuery(data)}`);

export const getDocuments = (data: { courseId?: number; videoId?: number }) => {
  request(`${PREFIX}/getDocuments${makeQuery(cleanObject(data))}`);
};

export const getQuestions = (data: { courseId?: number; videoId?: number }) =>
  request(`${PREFIX}/getQuestions${makeQuery(cleanObject(data))}`);
