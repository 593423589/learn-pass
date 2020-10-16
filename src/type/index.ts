export interface changePwdType {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
export interface singleDocument {
  name: string; //文件名
  url: string; //文件路径
  id: number;
  createTime: string;
  fileName: string;
}

export interface updatePwdType {
  password: string;
  newPassword: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export enum Role {
  'Teacher',
  'Student',
}

export const UserRoleMap = {
  1: Role[0],
  2: Role[1],
};

export interface UserInfo {
  username: string;
  realname: string;
  sex: boolean;
  college: string;
  subject: string;
  rid: 1 | 2;
}
