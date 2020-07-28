import { RequestMethod, ParamMode } from "@/constants/heart/enum/RequestEnums";
import RequestFactory from "@/utils/heart/RequestFactory";
import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

/**
 * JSON转FormData
 * @param param JSON格式的请求参数
 * @returns FormData格式数据
 */
function buildFormData(param: any): FormData {
  const keys: Array<string> = Object.keys(param);
  const formdata: FormData = new FormData();
  keys.forEach((key: string) => {
    if (param[key]) {
      // 如果key的值为undefinded、null或""，则不赋值
      formdata.append(key, param[key]);
    }
  });
  return formdata;
}

/**
 * 封装HTTP请求的方法装饰器，在方法上添加此装饰器，则方法会被作为请求成功后的回调函数执行，并将传入data参数作为响应结果。
 *
 * 使用例子：
 * ```ts
 * import { RequestMethod } from "@/heart/constants/enum/RequestMethod";
 *
 * class Example {
 *  // 暂时不知道怎么转义@，@前面的\是为了保持格式，真正代码是没有的
 *  \@Request("/test", RequestMethod.GET, undefined, (error: any) = {
 *      console.log("这是错误信息", error.message);
 *  })
 *  // 如果调用方法时不传参，则只需要接收data参数作为响应数据即可
 *  fetchData(data? any): object {
 *    console.log("这是响应数据", data);
 *    return data;
 *  }
 *
 *  \@Request("/login", RequestMethod.POST, ParamMode.FORM_DATA, (params: object, error: any) = {
 *      console.log("这是错误信息", error.message);
 *  })
 *  // params是调用方法是传入的参数，必须是JSON格式的对象，建议使用属性接口
 *  login(params: object, data?: any): void {
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
 * @param paramMode 请求参数传递模式,request payload或者form data，默认是request payload，建议使用ParamMode枚举赋值
 * @param failure 请求失败回调函数，接收错误信息error
 * @author 彭嘉辉
 */
export default function Request(
  url: string,
  method?: RequestMethod,
  paramMode?: ParamMode,
  failure?: Function,
  onProgress?: any
) {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const request: AxiosInstance = RequestFactory.getRequestInstance();
    const originalMethod: Function = descriptor.value;
    // 这里不能用ES6的写法来定义匿名函数，否则无法获取this
    // 接收调用方法时传入的data作为请求参数，需要JSON格式对象
    descriptor.value = async function(params?: object) {
      let requestParams: any;
      if (params) {
        if (!paramMode) {
          // 参数模式默认是request payload
          paramMode = ParamMode.REQUEST_PAYLOAD;
        }
        if (paramMode === ParamMode.FORM_DATA) {
          requestParams = buildFormData(params);
        } else {
          requestParams = params;
        }
      }
      try {
        const config: AxiosRequestConfig = {
          url,
          method: method ? method : RequestMethod.GET,
          onUploadProgress: (event: ProgressEvent) => {
            if (onProgress && typeof onProgress === "function") {
              if (params) {
                onProgress(params, event);
              } else {
                onProgress(event);
              }
            }
          }
        };
        if (method === RequestMethod.GET) {
          config.params = requestParams;
        } else {
          config.data = requestParams;
        }
        const response: AxiosResponse<any> = await request(config);
        if (params) {
          // 为了不影响方法参数逻辑，如果方法需要传入参数的话，响应数据则在传入参数的后一个参数
          return originalMethod.call(this, params, response.data);
        }
        return originalMethod.call(this, response.data);
      } catch (error) {
        console.error(error);
        if (failure) {
          if (params) {
            // 为了不影响方法参数逻辑，如果方法需要传入参数的话，响应数据则在传入参数的后一个参数
            return failure.call(this, params, error);
          }
          return failure.call(this, error);
        }
        throw error;
      }
    };
  };
}
