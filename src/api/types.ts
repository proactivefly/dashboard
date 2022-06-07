export interface LoginParams {
  username: string;
  password: string;
}
/**
 * @description: Get user information return value
 */
export interface GetUserInfo {
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  token: string;
}
