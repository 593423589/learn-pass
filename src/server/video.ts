import request from 'umi-request';

import makeQuery from '@/util/makeQuery';

export const PREFIX = '/api';

export const getVideoList = (data: { courseId: number }) =>
  request(`${PREFIX}/getVideoList${makeQuery(data)}`);

export const getVideo = (data: { videoId: number }) =>
  request(`${PREFIX}/getVideo${makeQuery(data)}`);

export const getVideoProcess = (data: { videoId: number }) =>
  request(`${PREFIX}/getVideoProcess${makeQuery(data)}`);

export const reportVideoProcess = (data: {
  videoId: number;
  process: number;
}) =>
  request(`${PREFIX}/reportVideoProcess`, {
    method: 'POST',
    data,
  });

export const finishVideo = (data: { videoId: number }) =>
  request(`${PREFIX}/finishVideo`, {
    method: 'POST',
    data,
  });
