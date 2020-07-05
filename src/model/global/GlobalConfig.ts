/**
 * 配置项映射类
 */
export default class GlobalConfig {
  reverseProxy!: boolean;
  serverURL!: string;

  constructor(reverseProxy = true, serverURL = "") {
    this.reverseProxy = reverseProxy;
    this.serverURL = serverURL;
  }
}
