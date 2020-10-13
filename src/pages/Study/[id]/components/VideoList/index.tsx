import React, { useState, useEffect } from 'react';
import { history, useLocation } from 'umi';
import { Radio } from 'antd';

import { getVideoList } from '@/server';
import PullDown from '@/components/PullDown';

import styles from './index.less';

interface Video {
  id: number;
  name: string;
  isCompleted: boolean;
}

export default () => {
  const [videoList, setVideoList] = useState<Video[]>();
  const location = useLocation();

  const fetchVideoList = () => {
    const courseId = location.pathname.split('/').pop();

    getVideoList({ courseId: Number(courseId) }).then(({ data }) => {
      setVideoList(data);
    });
  };

  useEffect(() => {
    fetchVideoList();
  }, []);
  return (
    <PullDown
      LoadingHeight={140}
      abandonHeight={220}
      onRefresh={fetchVideoList}
    >
      <div className={styles.periodList}>
        {videoList?.map((period: Video, index: number) => (
          <div
            className={styles.period}
            key={name + index}
            onClick={() => {
              history.push(`${history.location.pathname}/${period.id}`);
            }}
          >
            <Radio className={styles.radio} checked={period.isCompleted} />
            <span className={styles.serial}>{index + 1}</span>
            <span>{period.name}</span>
            <span className={styles.status}>
              {period.isCompleted && '（已完成）'}
            </span>
          </div>
        ))}
      </div>
    </PullDown>
  );
};
