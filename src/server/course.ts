import request from 'umi-request';

import makeQuery from '@/util/makeQuery';

export const PREFIX = '/api/course';

export const getCourseList = () => request(`${PREFIX}/getCourseList`);

export const joinCourse = (data: { token: string }) =>
  request(`${PREFIX}/joinCourse${makeQuery(data)}`);

export const deleteCourse = (data: { courseId: string }) =>
  request(`${PREFIX}/deleteCourse:${data.courseId}`, {
    method: 'DELETE',
  });

export const createCourse = (data: {
  name: string;
  description: string;
  cover: string;
}) =>
  request(`${PREFIX}/createCourse`, {
    method: 'POST',
    data,
  });
