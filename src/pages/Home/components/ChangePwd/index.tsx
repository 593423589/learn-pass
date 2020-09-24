import React, { useState, useCallback } from 'react';
import styles from './index.less';
import { Input, Button } from 'antd';
interface event {
  target: {
    value: string;
    name: string;
  };
}

export default function ChangePwd() {
  const [originPwd, setoriginPwd] = useState('');
  const [curPwd, setcurPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const changePwd = useCallback((e: event) => {
    const target = e.target;
    const name = target.name;
    const val = target.value;
    if (name === 'originPwd') setoriginPwd(val);
    else if (name === 'curPwd') setcurPwd(val);
    else if (name === 'confirmPwd') setConfirmPwd(val);
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <Input.Password
          placeholder="输入原密码"
          size="large"
          name="originPwd"
          value={originPwd}
          onChange={changePwd}
        />
      </div>
      <div className={styles.item}>
        <Input.Password
          placeholder="输入新密码"
          size="large"
          name="curPwd"
          value={curPwd}
          onChange={changePwd}
        />
      </div>
      <div className={styles.item}>
        <Input.Password
          placeholder="确认新密码"
          size="large"
          name="confirmPwd"
          value={confirmPwd}
          onChange={changePwd}
        />
      </div>
      <div className={styles.item}>
        <Button type="primary" block danger>
          修改
        </Button>
      </div>
    </div>
  );
}
