import React, { useState, useEffect, useCallback } from 'react';
import styles from './index.less';
import { Input } from 'antd';
import { Button } from 'antd';
import UnFinish from './UnFinish';
import Finish from './Finish';
import { setItem, getItem } from '@/util/storage';
interface event {
  target: {
    value: string;
  };
}

export default function Affair() {
  const [finish, setfinish] = useState([]);
  const [unFinish, setunFinish] = useState([]);
  const [val, setval] = useState('');
  const change = useCallback((e: event) => {
    setval(e.target.value);
  }, []);
  const add = useCallback(() => {
    const tpl = [...unFinish];
    tpl.push(val);
    setunFinish(tpl);
    setItem('unFinish', tpl);
  }, [val]);
  useEffect(() => {
    const f = getItem('finish');
    const v = f === null ? JSON.stringify([]) : f;
    setfinish(JSON.parse(v));
    const uf = getItem('unFinish');
    const uv = uf === null ? JSON.stringify([]) : uf;
    setunFinish(JSON.parse(uv));
  }, []);
  const update = useCallback(
    (i: number) => {
      const tpl = [...unFinish];
      const finishArr = [...finish];
      const aff = tpl.splice(i, 1);
      finishArr.push(aff);
      setunFinish(tpl);
      setfinish(finishArr);
      setItem('unFinish', tpl);
      setItem('finish', finishArr);
    },
    [unFinish],
  );
  const remove = useCallback(
    (i: number) => {
      const tpl = [...finish];
      tpl.splice(i, 1);
      setfinish(tpl);
      setItem('finish', tpl);
    },
    [finish],
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.add}>
        <Input
          placeholder="代办事项"
          size={'middle'}
          value={val}
          onChange={change}
        />
        <Button type="primary" size={'middle'} onClick={add}>
          添加
        </Button>
      </div>
      <UnFinish affairs={unFinish} finish={update} />
      <Finish Finishs={finish} remove={remove} />
    </div>
  );
}
