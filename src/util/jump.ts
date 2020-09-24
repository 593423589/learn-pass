import { history } from 'umi';

export const jump = (path: string) => {
  //js设置cookie过期,(未做)
  localStorage.setItem('user_info', '');
  history.push(path);
};
