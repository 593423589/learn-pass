import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CheckCircleTwoTone } from '@ant-design/icons';
import styles from './index.less';

interface Iprops {
  name: String;
  sex: number;
  college: string;
  class: string;
}

export default function PersonShow(props: Iprops) {
  return (
    <div className={styles.wrapper}>
      <Avatar
        icon={<UserOutlined />}
        style={{ backgroundColor: '#87d068' }}
        size={150}
      />
      <span className={styles.name}> {props.name} </span>
      <span className={styles.aventar}>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </span>
      <div className={styles.font}>
        <span className={styles.sex}> {props.sex === 0 ? '男' : '女'} </span>
        <span className={styles.college}> {props.college} </span>
        <span className={styles.class}> {props.class} </span>
      </div>
    </div>
  );
}
