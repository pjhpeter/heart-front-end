import UserInfo from "@/model/heart/user/UserInfo";
import DestopShotcutInfo from "@/model/heart/user/DestopShotcutInfo";

/**
 * 用户状态信息
 * @author 彭嘉辉
 */
export interface UserState {
  token: string;
  user: UserInfo | null;
  destopShotcutList: Array<DestopShotcutInfo>;
  wallpaperUrl: string;
}
