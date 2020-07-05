import Extend from "../global/Extend";

/**
 * 针对登录成功后，jeesite返回的用户信息接口
 * @author 彭嘉辉
 */
export default interface UserInfo {
  // 用户唯一标识
  userCode?: string;
  // 登录账号
  loginCode?: string;
  // 用户名
  userName?: string;
  // 用户类型
  userType?: string;
  // 头像地址
  avatarUrl?: string;
  // 扩展字段
  extend?: Extend;
}
