/**
 * 请求类型枚举
 * @author 彭嘉辉
 */
export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

/**
 * 请求参数模式，request payload或者form data
 * @author 彭嘉辉
 */
export enum ParamMode {
  /**
   * JSON数据格式
   */
  REQUEST_PAYLOAD,
  /**
   * 模拟表单提交格式
   */
  FORM_DATA
}
