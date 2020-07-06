/**
 * 菜单操作接口
 * @author 彭嘉辉
 */
export default interface MenuAPI<T> {
  /**
   * 加载当前用户可访问的菜单树
   * @param requestParams 请求参数，可以不传，JSON格式对象
   * @returns 菜单树数据
   */
  fetchMenuTree(requestParams?: object): Array<T> | null;
}
