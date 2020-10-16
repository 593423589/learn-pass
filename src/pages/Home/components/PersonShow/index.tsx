import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CheckCircleTwoTone } from '@ant-design/icons';
import styles from './index.less';

import { UserInfo } from '@/type';

export default function PersonShow(props: UserInfo) {
  return (
    <div className={styles.wrapper}>
      <Avatar
        icon={<UserOutlined />}
        style={{ backgroundColor: '#87d068' }}
        size={150}
      />
      <span className={styles.name}> {props.realname} </span>
      <span className={styles.aventar}>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </span>
      <div className={styles.font}>
        <span className={styles.sex}> {props.sex ? '女' : '男'} </span>
        <span className={styles.college}> {props.college} </span>
        <span className={styles.class}> {props.subject} </span>
      </div>
    </div>
  );
}
