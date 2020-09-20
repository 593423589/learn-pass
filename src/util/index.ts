import { setItem, getItem } from './storage';

interface UserInfo {
  name: string;
}

export const getUerInfo = () => {
  const userInfo = getItem('user_info');
  return {
    userInfo,
    isLogin: Boolean(userInfo),
  };
};

export const setUerInfo: (userInfo: UserInfo) => Promise<string> = userInfo =>
  new Promise((res, rej) => {
    try {
      setItem('user_info', userInfo);
    } catch (e) {
      // note! may throw
      rej(e);
    }
    res();
  });
