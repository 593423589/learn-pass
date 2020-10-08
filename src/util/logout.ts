import { history } from 'umi';
import { deleteUserInfo } from './index';

export default () => {
  //js设置cookie过期,(未做)
  deleteUserInfo();
  history.push('/');
};
