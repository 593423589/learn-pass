import { setItem, getItem, removeItem } from './storage';

interface UserInfo {
  name: string;
}
const USER_INFO = 'user_info';

export const getUerInfo = () => {
  const userInfo = getItem(USER_INFO);
  return {
    userInfo,
    isLogin: Boolean(userInfo),
  };
};

export const setUerInfo: (userInfo: UserInfo) => Promise<string> = userInfo =>
  new Promise((res, rej) => {
    try {
      setItem(USER_INFO, userInfo);
    } catch (e) {
      // note! may throw
      rej(e);
    }
    res();
  });

export const deleteUserInfo = () => {
  removeItem(USER_INFO);
};
