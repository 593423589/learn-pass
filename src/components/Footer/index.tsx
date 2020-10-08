import React, { FC } from 'react';
import { Link } from 'umi';
import { Badge } from 'antd';

import styles from './index.less';

const Footer: FC = () => (
  <div className={styles.footer}>
    <Link to="/study">Study</Link>
    <Link to="/news">
      <Badge
        count={5}
        style={{
          borderRadius: '50%',
        }}
      >
        News
      </Badge>
    </Link>
    <Link to="/home">Home</Link>
  </div>
);

export default Footer;
