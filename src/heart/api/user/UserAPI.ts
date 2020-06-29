/**
 * 用户操作接口
 * @author 彭嘉辉
 */
export default interface UserAPI {
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
}
