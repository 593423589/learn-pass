import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import Header from '@/components/Header';
import {
  SmileTwoTone,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { getUerInfo } from '@/util';
import logout from '@/util/logout';

import Affair from './components/Affair';
import ChangePwd from './components/ChangePwd';
import Toggle from './components/Toggle';
import PersonShow from '../Home/components/PersonShow';

import styles from './index.less';

export default function Home() {
  //代办事务
  const [affairShow, setAffairShow] = useState(false);
  //修改密码
  const [changePwdShow, setChangePwdShow] = useState(false);
  const close = useCallback((name: string) => {
    if (name === 'affair') {
      setAffairShow(false);
    } else if (name === 'changePwdShow') {
      setChangePwdShow(false);
    }
  }, []);
  //注销
  const logOut = useCallback(() => {
    logout();
  }, []);

  const userInfo = getUerInfo().userInfo;

  return (
    <div className={styles.wrapper}>
      <Header title="我" leftPart={null} />
      <PersonShow {...userInfo} />
      <div>
        {/* 备忘录模块 */}
        <p
          className={styles.item}
          onClick={() => {
            setAffairShow(true);
          }}
        >
          <span className={styles.icon}>
            <SmileTwoTone />
          </span>
          <span>备忘录</span>
          <span className={styles.link}>
            <RightOutlined className={styles.arrow} />
          </span>
        </p>
        <Toggle
          visible={affairShow}
          close={close}
          title="备忘录"
          closeName="affair"
        >
          {<Affair />}
        </Toggle>
        {/* 修改密码模块 */}
        <p
          className={styles.item}
          onClick={() => {
            setChangePwdShow(true);
          }}
        >
          <span className={styles.icon}>
            <SettingOutlined style={{ color: '#1890ff' }} />
          </span>
          <span>修改密码</span>
          <span className={styles.link}>
            <RightOutlined className={styles.arrow} />
          </span>
        </p>
        <Toggle
          visible={changePwdShow}
          close={close}
          title="修改密码"
          closeName="changePwdShow"
        >
          {<ChangePwd />}
        </Toggle>
        {/* 注销登录 */}
        <p className={styles.item}>
          <span className={styles.exit}>
            <Button
              type="primary"
              block
              danger
              onClick={() => {
                logOut();
              }}
            >
              注销
            </Button>
          </span>
        </p>
      </div>
    </div>
  );
}
