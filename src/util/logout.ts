import { history } from 'umi';
import { deleteUserInfo } from './index';

export default () => {
  // document.cookie = 'token=; domain=???; path=/; max-age=-1';
  deleteUserInfo();
  history.push('/');
};
