import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Radio } from 'antd';

import { getVideos } from '@/server';

import styles from './index.less';

interface Video {
  id: string;
  name: string;
  creater: string;
  time: string;
  isCompleted: boolean;
}

export default () => {
  const [videoList, setVideoList] = useState<Video[]>();
  useEffect(() => {
    getVideos({ name: 23 }).then(({ data }) => {
      setVideoList(data);
    });
  }, []);
  return (
    <div className={styles.videosList}>
      {videoList?.map((video: Video, index: number) => (
        <div
          className={styles.video}
          key={name + index}
          onClick={() => {
            history.push(`${history.location.pathname}/${video.id}`);
          }}
        >
          <Radio className={styles.radio} checked={video.isCompleted} />
          <span className={styles.serial}>{index + 1}</span>
          {video.name}
        </div>
      ))}
    </div>
  );
};
