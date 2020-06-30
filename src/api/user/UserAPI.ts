/**
 * 用户操作接口
 *
 * T 用户信息对象泛型
 * @author 彭嘉辉
 */
export default interface UserAPI<T> {
  /**
   * 用户登录
   * @param loginParams 登录参数，JSON格式对象
   * @returns 是否登录成功
   */
  login(loginParams: object): boolean;

  /**
   * 用户登出
   * @param logoutParams 根据具体业务需要传递登出参数，可以不传，一般传递用户令牌，JSON格式对象
   * @returns 是否登出成功
   */
  logout(logoutParams?: object): boolean;

  /**
   * 获取当前用户信息
   * @param requestParams 根据具体业务需要传递请求参数，可以不传，一般传递用户令牌，JSON格式对象
   * @returns 用户信息对象
   */
  getUserInfo(requestParams?: object): T | null;
}
