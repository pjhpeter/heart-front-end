import { plainToClassFromExist } from "class-transformer";
import { LocalStorageKeys } from "@/constants/enum/LocalStorageKeys";
import GlobalConfig from "@/model/common/GlobalConfig";

/**
 * 全局配置项读取器
 * @author 彭嘉辉
 */
export class GlobalConfigReader {
  /**
   * 读取全局配置文件，考虑到需要热加载配置项，这里不做单例处理
   * @returns 全局配置对象
   */
  static readGlobalConfig(): GlobalConfig {
    // 读取全局配置
    const globalConfigStr: string | null = localStorage.getItem(
      LocalStorageKeys.GLOBAL_CONFIG
    );
    // let globalConfigStr: string | null = localStorage.getItem("global-config");
    // 没有配置则返回默认配置
    if (globalConfigStr === null) {
      return new GlobalConfig();
    }

    // 首先加载默认配置
    const globalConfig: GlobalConfig = new GlobalConfig();

    // 读取自定义配置项
    const customConfig: any = JSON.parse(globalConfigStr);

    // 合并默认配置和自定义配置项，自定义配置中没有配置的项，则取默认配置
    return plainToClassFromExist(globalConfig, customConfig);
  }
}
