import React, { FC } from 'react';
import { updatePwd } from '@/server/index';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { changePwdType } from '@/type/changePwd';
import styles from './index.less';

const ChangePwd: FC = () => {
  const onFinish = (data: changePwdType) => {
    if (data.newPassword !== data.confirmPassword) {
      message.error('密码不一致!');
      return;
    }
    const { password, newPassword } = data;
    updatePwd({
      password,
      newPassword,
    }).then(() => {
      message.success('修改成功!');
    });
  };
  return (
    <div className={styles.changePwd}>
      <Form name="changePwd" className={styles.form} onFinish={onFinish}>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '密码不能为空!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="输入原密码!"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: '密码不能为空!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="输入新密码!"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '密码不能为空!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="确认密码!"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submit}>
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePwd;
