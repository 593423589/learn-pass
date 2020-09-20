import React, { FC } from 'react';
import { Link } from 'umi';

import styles from './index.less';

const Footer: FC = () => (
  <div className={styles.footer}>
    <Link to="/study">Study</Link>
    <Link to="/news">News</Link>
    <Link to="/home">Home</Link>
  </div>
);

export default Footer;
