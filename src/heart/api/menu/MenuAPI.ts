export default interface MenuAPI {
  /**
   * 加载当前用户可访问的菜单树
   * @param requestParams 请求参数，可以不传，JSON格式对象
   */
  fetchMenuTree(requestParams?: object): boolean;
}
