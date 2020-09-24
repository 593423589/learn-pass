import React from 'react';
import { Drawer } from 'antd';
// import styles from './index.less'
import { LeftOutlined } from '@ant-design/icons';

interface Iprops {
  title: string;
  visible: boolean;
  close: (name: string) => void;
  children: JSX.Element;
  closeName: string;
}

export default function Toggle(props: Iprops) {
  return (
    <div>
      <Drawer
        title={props.title}
        placement="right"
        closable
        closeIcon={
          <LeftOutlined
            style={{
              position: 'fixed',
              left: 23,
              top: 55,
              fontSize: '1.2em',
            }}
          />
        }
        onClose={() => {
          props.close(props.closeName);
        }}
        visible={props.visible}
        width="100%"
        headerStyle={{ textAlign: 'center', height: '-1px' }}
        bodyStyle={{ padding: '10px 0px 0px 0px', backgroundColor: '#f6f6f6' }}
      >
        {props.children}
      </Drawer>
    </div>
  );
}
