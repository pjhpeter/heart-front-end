import { RequestMethod } from "@/constants/enum/RequestMethod";
import RequestFactory from "@/utils/RequestFactory";
import { AxiosInstance, AxiosResponse } from "axios";

/**
 * 封装HTTP请求的方法装饰器，在方法上添加此装饰器，则方法会被作为请求成功后的回调函数执行，并将传入data参数作为响应结果。
 * 使用例子：
 * ```ts
 * class Example {
 *  // 暂时不知道怎么转义@，@前面的\是为了保持格式，真正代码是没有的
 *  \@Get(this, "/test", {id: 1, name: "test"}, (error) = {
 *      console.log("这是错误信息", error.message);
 *  })
 *  fetchData(data? any) {
 *      console.log("这是响应数据", data);
 *  }
 * }
 * ```
 *
 * @param url 请求路径
 * @param method 请求方法，默认是get，建议使用RequestMethod枚举赋值
 * @param data 请求数据
 * @param failure 请求失败回调函数，接收错误信息error
 * @author 彭嘉辉
 */
export default function Request(
  url: string,
  method?: RequestMethod,
  data?: object | null,
  failure?: Function
) {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const request: AxiosInstance = RequestFactory.getRequestInstance();
    const originalMethod = descriptor.value;
    // 这里不能用ES6的写法来定义匿名函数，否则无法获取this
    descriptor.value = async function() {
      try {
        const response: AxiosResponse<any> = await request({
          url,
          method: method ? method : RequestMethod.GET,
          data
        });
        originalMethod.call(this, response.data);
      } catch (error) {
        if (failure) {
          failure.call(this, error);
        }
      }
    };
  };
}
