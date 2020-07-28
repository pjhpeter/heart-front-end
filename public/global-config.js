/**
 * 全局配置类，建议统一通过GlobalConfigReader类来读取配置项
 */
// 由于这里不会被webpack管理，babel不会起作用，所以不能用es6语法，防止浏览器不兼容
(function() {
  const config = {
    // --是否使用反向代理，默认为true
    reverseProxy: false,
    // --生产环境后端服务的地址，reverseProxy为false时生效（针对部署在Tomcat等不具备反向代理功能的容器时使用，如果使用nginx部署则不需要这个配置项）
    // serverURL: "http://127.0.0.1:10086/sbos/a"
    serverURL: "http://192.168.6.99:10086/sbos/a"
    // --下面可以按需要扩展配置项，扩展之后记得一定要同时扩展/src/utils/GlobalConfigReader.ts中GlobalConfig类的属性
  };
  // 没有配置就不存localStorage了
  if (config === {}) {
    return;
  }

  const configJSONStr = JSON.stringify(config);
  localStorage.setItem("global-config", configJSONStr);
})();
