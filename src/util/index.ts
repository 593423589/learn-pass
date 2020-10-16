import { setItem, getItem, removeItem } from './storage';
import { UserInfo, UserRoleMap, Role } from '@/type';

const USER_INFO = 'user_info';

export const getUerInfo = () => {
  const userInfo: UserInfo = JSON.parse(getItem(USER_INFO));

  return {
    userInfo,
    isLogin: Boolean(userInfo),
    type: UserRoleMap[userInfo.rid],
    isStudent: UserRoleMap[userInfo.rid] === Role[1],
    isTeacher: UserRoleMap[userInfo.rid] === Role[0],
  };
};

const obj = {
  username: '葛可',
  realname: '葛士可',
  sex: false,
  college: '沈阳大学',
  subject: '吃屎专业',
  rid: 1,
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
