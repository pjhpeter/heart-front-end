import Request from "@/decorator/request/Get";
import { RequestMethod } from "@/constants/enum/RequestMethod";

// 伪造一个函数
const failure = jest.fn();

class Test {
  result = "";
  // 测试环境下不知道怎么使用vue.config.js配置的请求代理，只能自己拼接url
  @Request(
    `${process.env.VUE_APP_BASE_URL}/authInfo`,
    RequestMethod.GET,
    failure
  )
  getData(data?: any): void {
    this.result = data.result;
  }
}

describe("测试Get装饰器", () => {
  it("测试发请求-成功", async () => {
    const test: Test = new Test();
    await test.getData();
    expect(test.result).toBe("true");
  });

  // it("测试发请求-失败", async () => {
  //     let test: Test = new Test();
  //     await test.getData();
  //     expect(failure).toHaveBeenCalled();
  // });
});
