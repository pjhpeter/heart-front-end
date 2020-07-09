import UserInfo from "@/model/heart/user/UserInfo";
import DestopInfo from "@/model/heart/user/DestopInfo";

/**
 * 用户状态信息
 * @author 彭嘉辉
 */
export interface UserState {
  token: string;
  user: UserInfo | null;
  destopInfoList: Array<DestopInfo>;
}
