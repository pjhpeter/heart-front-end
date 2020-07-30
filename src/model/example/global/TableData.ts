/**
 * 通用table数据接口
 * @author 罗芳
 */
export default interface TableData<T> {
  count: number;
  list: Array<T>;
}
