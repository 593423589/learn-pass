import request from 'umi-request';
import makeQuery from '@/util/makeQuery';
import cleanObject from '@/util/cleanObject';

export const PREFIX = '/api';

export const getQuestions = (data: { courseId?: number; videoId?: number }) =>
  request(`${PREFIX}/getQuestions${makeQuery(cleanObject(data))}`);
