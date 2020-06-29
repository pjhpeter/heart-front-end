import UserInfo from "@/heart/model/user/UserInfo";

/**
 * 用户状态信息
 * @author 彭嘉辉
 */
export interface UserState {
  token: string;
  user: UserInfo | null;
}
