import React, { ReactElement, useState } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import { delay } from '@/util/delay';

interface Iprops {
  children: ReactElement;
  onRefresh: () => void;
}

let startDis = 0,
  startFlag = false,
  curDis = 0;

export default function PullDown(props: Iprops) {
  const [dis, setDis] = useState(0);
  return (
    <div className={styles.pullDown}>
      <div className={styles.loading}>
        <Spin />
        <span className={styles.spin}>正在刷新....</span>
      </div>
      <div
        className={styles.pull}
        style={{
          top: dis + 'px',
        }}
        onTouchMove={e => {
          if (!startFlag) {
            startDis = e.touches[0].clientY;
            startFlag = true;
          }
          curDis = e.touches[0].clientY;
          if (curDis - startDis > 150) setDis(150);
        }}
        onTouchEnd={async () => {
          startDis = 0;
          startFlag = false;
          curDis = 0;
          await delay(300);
          setDis(0);
          props.onRefresh();
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
