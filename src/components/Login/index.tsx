import React, { FC } from 'react';
import { history } from 'umi';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginType } from '@/type';
import { login } from '@/server';
import { setUerInfo } from '@/util';

import styles from './index.less';

const Login: FC = () => {
  const onFinish = (data: LoginType) => {
    login(data).then(({ data }) => {
      message.success('登录成功');
      setUerInfo(data).then(() => {
        history.replace('/');
      });
    });
  };
  return (
    <div className={styles.login}>
      <Form name="login" className={styles.form} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入学号/职工号',
            },
            {
              pattern: /^\d{9}?$/,
              message: '请输入正确的学号/职工号',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="学号/职工号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submit}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
