import request from 'umi-request';

import makeQuery from '@/util/makeQuery';

import { PREFIX } from './index';

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
