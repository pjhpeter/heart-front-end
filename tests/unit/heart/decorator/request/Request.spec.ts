import Request from "@/heart/decorator/request/Request";
import { RequestMethod } from "@/heart/constants/enum/RequestMethod";
import LoginParams from "@/heart/model/user/LoginParams";

// 伪造一个函数
const failure = jest.fn();

class Test {
  result = "";
  token?: string;

  // 测试环境下不知道怎么使用vue.config.js配置的请求代理，只能自己拼接url
  @Request("/authInfo", RequestMethod.GET, failure)
  getData(data?: any): string {
    this.result = data.result;
    return this.result;
  }

  @Request("/login?__login=true&__ajax=json", RequestMethod.POST)
  login(LoginParams: LoginParams, data?: any): void {
    this.token = data.sessionid;
  }
}

describe("测试Request装饰器", () => {
  it("测试get请求-成功", async () => {
    const test: Test = new Test();
    const result = await test.getData();
    expect(test.result).toBe("true");
    expect(result).toBe("true");
  });

  // it("测试get请求-失败", async () => {
  //     let test: Test = new Test();
  //     await test.getData();
  //     expect(failure).toHaveBeenCalled();
  // });

  it("测试post请求", async () => {
    const test: Test = new Test();
    const params: LoginParams = {
      username: "test",
      password: "abcd1234"
    };
    await test.login(params);
    expect(test.token).not.toBeNull();
  });
});
