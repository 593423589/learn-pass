import React, { FC } from 'react';
import { Link } from 'umi';
import { Badge } from 'antd';

import styles from './index.less';

const Footer: FC = () => (
  <div className={styles.footer}>
    <Link to="/Course">课程</Link>
    <Link to="/News">
      <Badge
        count={5}
        style={{
          borderRadius: '50%',
        }}
      >
        消息
      </Badge>
    </Link>
    <Link to="/Home">我</Link>
  </div>
);

export default Footer;
