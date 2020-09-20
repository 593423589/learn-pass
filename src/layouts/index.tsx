import React, { useEffect } from 'react';
import { IRouteComponentProps } from 'umi';

import Footer from '@/components/Footer';
import Login from '@/components/Login';
import { getUerInfo } from '@/util';

export default ({ children, location, history }: IRouteComponentProps) => {
  useEffect(() => {
    location.pathname === '/' && history.replace('/home');
  }, [location.pathname]);

  return (
    <>
      {getUerInfo().isLogin ? children : <Login />}
      <Footer />
    </>
  );
};
