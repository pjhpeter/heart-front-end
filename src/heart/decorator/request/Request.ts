import { RequestMethod } from "@/heart/constants/enum/RequestMethod";
import RequestFactory from "@/heart/utils/RequestFactory";
import { AxiosInstance, AxiosResponse } from "axios";

/**
 * 封装HTTP请求的方法装饰器，在方法上添加此装饰器，则方法会被作为请求成功后的回调函数执行，并将传入data参数作为响应结果。
 *
 * 使用例子：
 * ```ts
 * import { RequestMethod } from "@/heart/constants/enum/RequestMethod";
 *
 * class Example {
 *  // 暂时不知道怎么转义@，@前面的\是为了保持格式，真正代码是没有的
 *  \@Request(this, "/test", RequestMethod.GET, (error) = {
 *      console.log("这是错误信息", error.message);
 *  })
 *  fetchData(data? any): object {
 *    console.log("这是响应数据", data);
 *    return data;
 *  }
 *
 *  \@Request("/login", RequestMethod.POST)
 *  login(data?: any): void {
 *     console.log("这是响应数据", data);
 *  }
 * }
 * ```
 * 调用上面定义的方法时，需要添加async和await关键字修饰，如需添加请求参数，调用方法时可传入JSON格式的数据。
 *
 * 使用例子：
 * ```ts
 * let example: Example = new Example();
 * async () => {
 *  let data = await example.fetchData();
 *  console.log("这是响应数据", data);
 *
 *  // 传入的是请求参数，必须是JSON格式
 *  await example.login({username: "test", password: "abcd1234"});
 * }
 *
 * ```
 *
 * @param url 请求路径
 * @param method 请求方法，默认是get，建议使用RequestMethod枚举赋值
 * @param failure 请求失败回调函数，接收错误信息error
 * @author 彭嘉辉
 */
export default function Request(
  url: string,
  method?: RequestMethod,
  failure?: Function
) {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const request: AxiosInstance = RequestFactory.getRequestInstance();
    const originalMethod = descriptor.value;
    // 这里不能用ES6的写法来定义匿名函数，否则无法获取this
    // 接收调用方法时传入的data作为请求参数，需要JSON格式对象
    descriptor.value = async function(data?: object) {
      try {
        const response: AxiosResponse<any> = await request({
          url,
          method: method ? method : RequestMethod.GET,
          data: data ? data : undefined
        });
        return originalMethod.call(this, response.data);
      } catch (error) {
        if (failure) {
          return failure.call(this, error);
        }
        return error;
      }
    };
  };
}
