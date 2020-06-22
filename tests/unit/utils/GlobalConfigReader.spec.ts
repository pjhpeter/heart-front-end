import { GlobalConfigReader } from "@/utils/GlobalConfigReader";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
import GlobalConfig from "@/model/common/GlobalConfig";

/**
 * GlobalConfigReader单元测试
 * @author 彭嘉辉
 */
describe("GlobalConfigReader", () => {
  it("测试readGlobalConfig方法，默认配置", () => {
    const globalConfig: GlobalConfig = GlobalConfigReader.readGlobalConfig();
    const globalConfigExpect: GlobalConfig = new GlobalConfig();
    expect(globalConfig).toEqual(globalConfigExpect);
  });

  it("测试readGlobalConfig方法，自定义配置", () => {
    localStorage.setItem(
      LocalStorageKeys.GLOBAL_CONFIG,
      JSON.stringify({ reverseProxy: false, serverURL: "127.0.0.1" })
    );
    const globalConfig: GlobalConfig = GlobalConfigReader.readGlobalConfig();
    const globalConfigExpect: GlobalConfig = new GlobalConfig(
      false,
      "127.0.0.1"
    );
    expect(globalConfig).toEqual(globalConfigExpect);
  });

  it("测试readGlobalConfig方法，不完全的自定义配置", () => {
    localStorage.setItem(
      LocalStorageKeys.GLOBAL_CONFIG,
      JSON.stringify({ serverURL: "127.0.0.1" })
    );
    const globalConfig: GlobalConfig = GlobalConfigReader.readGlobalConfig();
    const globalConfigExpect: GlobalConfig = new GlobalConfig(
      true,
      "127.0.0.1"
    );
    expect(globalConfig).toEqual(globalConfigExpect);
  });

  afterEach(() => {
    localStorage.clear();
  });
});
