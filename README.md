# heart-front-end

## 简介

heart-front-end是一个类Windows界面的前端项目，基于Vue 2.x + TypeScript + ViewUI(IView 4.x) + Sass开发，由于公司要求，后端暂时对应的是Jeesite的规范，如果想要对接其他后端就要做一些修改哦。
这个项目使用了TypeScript，引入了面向对象和面向接口编程的思想，易于扩展，可以做出各种好玩的东西，喜欢的尽管拿去用吧，我也是刚刚入门，所以肯定会存在不少问题，如果发现有不爽的地方记得告诉我哦^_^

[代码传送门](https://gitee.com/pjhpeter/heart-front-end)

[码云上的能看到图片](https://gitee.com/pjhpeter/heart-front-end)

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/150047_aa18119b_5449551.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/150131_d2422903_5449551.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/152010_2bb77928_5449551.png "屏幕截图.png")

## 安装依赖

```cmd
yarn install
```

> heart使用了image-webpack-loader做图片压缩优化，但由于网络原因，image-webpack-loader可能会卡住或者安装失败，这是需要用cnpm来单独安装image-webpack-loader

```cmd
# 没有装cnpm的要先安装
npm install cnpm -g --registry=https://registry.npm.taobao.org

cnpm install image-webpack-loader -D
```

## 启动服务

```cmd
yarn serve
```

## 登录

用户名密码随便填

> 如果没有接触过yarn的小伙伴请移步到[这里](https://gitee.com/pjhpeter/training/blob/master/Vue%E5%85%A8%E5%AE%B6%E6%A1%B6%E5%9F%B9%E8%AE%AD/%E5%89%8D%E7%AB%AF%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.md)


## 约定

### 目录结构

首层目录结构如下

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/145041_3b653224_5449551.png "屏幕截图.png")

每层目录下面都请创建自己项目名称的目录，然后在存放代码

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/154716_b9e8c946_5449551.png "屏幕截图.png")

> 模块入口组件请务必放在**views**目录，而模块里面的子组件最好**components**目录，方便区分。

### 组件存放

建议后端定义的模块入口URL为这样的格式，"XX/a/example/email/sendboxlist"，其中"XX/a/"是Jeesite响应路径都会带的前缀，heart在路径解析的时候会过滤掉的，不用Jeesite做后端可以自己实现MenuAPI接口，"example"是项目名称，"sendboxlist"是模块名称。

以上面的URL为例，我们可以在**views**文件夹中创建**example**文件夹来存放项目的所有模块入口组件，在**example**目录下面在创建**sendboxlist**目录，然后在里面创建**index.vue**。完整的路径就是views/example/sendboxlist/index.vue。这样做是为了能让组件加载器成功根据后端响应的模块路径找到对应的组件并动态注册到Vue中。

> 入口组件记得一定要叫index.vue，约好的哦^_^。
> 对组件加载器有兴趣的朋友可以看看**ComponentLoader.vue**，其实好简单，就是根据规矩来找组件，然后异步加载。

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/171027_ffbb806a_5449551.png "屏幕截图.png")

模块成功被打开了。

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/172011_4af603e4_5449551.png "屏幕截图.png")

至于上面**example**项目中入了入口组件以外的子组件，可以在**components**目录创建**example**目录，然后按照自己的喜好把组件放进去就行。

## 一些工具

### BaseModal.vue

#### 描述
既然是类Windows的界面，肯定会经常用到窗口啦，如果每个窗口都要自己写样式多累啊，而且每个人写的窗口的样式都不一样，不是很奇怪吗-_-

所以封装了一个统一的模态框组件BaseModal.vue，全路径是compoents/commons/BaseModal.vue，模块入口组件在被打开是都会渲染在这个组件里面。而在实际开发中，模块里面免不了要打开更多模态框，所以请用它吧！

#### 属性说明

**主要参数**

| 属性名 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| url | **必须项**，模态框中要渲染的组件路径，<br>格式为/{项目名}/{模块名}/{功能名}/{组件名}.vue，因为TypeScript不识别.vue组件，<br>所以路径一定要写上.vue后缀，比如/exaple/email/SendBoxHeader.vue<br>组件加载器会根据传入路径到**components**目录下读取/exaple/email/SendBoxHeader.vue，所以用模态框打开的组件必须放在components目录下 | string | 无 |
| backgroundColor | **必须项**，图标的背景颜色 | string | 无 |
| enabledFuscreen | 允许最大化 | boolean | true |
| resizable | 允许拉伸 | boolean | true |
| data | 传入子组件的数据，JSON格式 | any | 无 |
| onClose | 模态框关闭时触发的回调函数，隐藏的时候不会触发，函数接收一个参数 | Function | 无 |

> 如果在模态框中的组件获取传入的data值，需要从其父组件中获取，即：

```ts
(this.$parent as any).data
```

同时还支持ViewUI的Modal组件API中的一些属性，相关的属性都封装在ModalInfo.ts属性接口中。

```ts
/**
 * 模态框信息
 * @author 彭嘉辉
 */
export default interface ModalInfo {
  // 模态框内渲染的组件路径，如果不是后端返回的模块入口路径，则必须以.vue结尾
  url: string;
  // 模块图标背景颜色
  backgroundColor: string;
  // 是否允许最大化
  enabledFuscreen?: boolean;
  // 是否可拉伸，默认可拉伸
  resizable?: boolean;
  // 传入子组件的数据，JSON格式
  data?: any;
  // 模态框关闭时的回调函数
  onClose?: Function;

  /**
   * 根据ViewUI的API，暴露出配置参数
   */
  title: string;
  maskClosable?: boolean;
  loading?: boolean;
  scrollable?: boolean;
  draggable?: boolean;
  mask?: boolean;
  okText?: string;
  cancelText?: string;
  width?: number;
  footerHide?: boolean;
  styles?: object;
  className?: string;
  zIndex?: number;
  transitionNames?: Array<string>;
  transfer?: boolean;
  onOk?: Function;
  onCancel?: Function;
  onVisibleChange?: Function;
}
```

BaseModal的使用示例：

```ts
//////////// 如果不想模态框重复被打开，可以在打开模态框前添加类似这样的代码///////////////
if (this.addShotcutModalId) {
  // 如果原来已经打开了添加快捷方式的模态框，则不重复创建，直接显示
  const modal: any = Commons.findModalById(this.addShotcutModalId);
  if (modal) {
    modal.isShow = true;
    // 模拟点击模态框中ViewUI的Modal组件
    modal.$children[0].handleClickModal();
    return;
  }
}
////////////////////////////////////////////////////////////////////////////////

const modalInfo: ModalInfo = {
  url: "/heart/home/destop/AddShotcutModal.vue",
  title: "添加快捷方式",
  // 为了美观，图标颜色最好不要随便设置，可以用Commons.getIconColor方法获取一个合适的颜色
  backgroundColor: Commons.getIconColor(),
  footerHide: false,
  width: 400,
  className: "select-menu-modal",
  enabledFuscreen: false,
  onOk(addShotcutModal: any) {
    if (addShotcutModal.selectedModalInfo) {
      // 添加快捷方式
      (this as any).$store.commit(
        "user/addDestopShotcut",
        addShotcutModal.selectedModalInfo
      );
    }
  }
};
// 打开一个模态框请调用Commons.showModule方法，把配置传入即可
// 返回模态框组件的id，可以根据这个id找到模态框对象
this.addShotcutModalId = Commons.showModule(modalInfo);
```

修改模态框默认高度，把test作为**className**的值传入即可：

```css
.test {
  .ivu-modal-body {
    height: 300px !important;
  }
}
```

### Commons.ts

相信在上面的例子中已经看到了**Commons**作为全局的工具类，有一些实用的方法，下面我们来看看吧。

#### showModule

我们刚才已经看到了，**showModule**方法可以很方便地打开一个模态框，通过这个方法打开的模态框会被统一管理。该方法返回打开模态框的id。

**返回值：**

模态框id： number

**参数：**

| 参数名 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| modalInfo | **必须项**，模态框配置信息 | ModalInfo | 无 |

#### findModalById

通过**showModule**打开的模态框，都会返回模态框的id，用**findModalById**方法则可以通过这个id拿到模态框的对象。

**返回值：**

模态框对象：any

**参数：**

| 参数名 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| id | **必须项**，模态框id | number | 无 |

#### getIconColor

桌面需要有各种各样的图标，就是因为各种各样了，所以也不知道用什么图标好，最后就选择了使用色块，**getIconColor**方法会在颜色表中取一个颜色，作为色块的颜色，保证应用配色的合理性，一般是这么用的，不过你也可以拿来干别的哈。

**返回值：**

16进制颜色字符串:：string

**参数：**

不需要那种东西-_-

#### createId

生成一个数字id。

**参数：**

不需要那种东西-_-

**返回值：**

不重复的id：number

#### loadMenuTreeData

获取菜单树，如果Vuex中没有，则会取后端请求，所以是一个异步方法，基本上应该用不到吧。

**返回值：**

一个Promise对象：Promise&lt;Array&lt;MenuInfo&gt; | null&gt;

**参数：**

不需要那种东西-_-

####  findMenuByUrl

用过菜单的URL找到对应菜单，这个方法在底层比较有用，不过在实际项目中应该有的比较少。

**返回值：**

菜单对象：MenuInfo

**参数：**

| 参数名 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| url | **必须项**，菜单的URL | string | 无 |

### Request装饰器

**Request**是一个方法装饰器，通过这个装饰器就可以把被装饰的方法变成一个异步方法，向后端发送请求，方法体本身作为异步请求成功的回调函数，响应的数据可以作为方法的入参接收。这样就不用重复书写差不多的异步请求代码了，只需要专注于处理响应的数据就行。TypeScript的装饰器真的给我们提供了更加灵活、方便、优雅的编码方式。

**参数：**

| 参数名 | 说明                 | 数据类型 | 默认值 |
| ------ | -------------------- | -------- | ------ |
| url    | **必须项**，请求地址 | string   | 无  |
| method | 请求方式，使用RequestMethod枚举赋值 | RequestMethod | RequestMethod.GET |
| paramMode    | 请求参数传递模式,request payload或者form data，使用ParamMode枚举赋值 | ParamMode | ParamMode.REQUEST_PAYLOAD |
| failure    | 请求失败时的回调函数 | Function   | 无  |

使用例子：
```ts
import { RequestMethod } from "@/heart/constants/enum/RequestMethod";
 
class Example {
 // 方法上添加Request装饰器，使其变成异步方法
 @Request("/test", RequestMethod.GET, undefined, (error: any) = {
     console.log("这是错误信息", error.message);
 })
 // 如果调用方法时不传参，则只需要接收data参数作为响应数据即可
 fetchData(data? any): object {
   console.log("这是响应数据", data);
   return data;
 }
 
 @Request("/login", RequestMethod.POST, ParamMode.FORM_DATA, (params: object, error: any) = {
   console.log("这是错误信息", error.message);
 })
 // params是调用方法是传入的参数，必须是JSON格式的对象，建议使用属性接口，data是异步请求响应的数据
 login(params: object, data?: any): void {
  console.log("这是响应数据", data);
 }
}
```
调用上面定义的方法时，需要添加async和await关键字修饰，如需添加请求参数，调用方法时可传入JSON格式的数据。

使用例子：
```ts
let example: Example = new Example();
async () => {
 let data = await example.fetchData();
 console.log("这是响应数据", data);
 
 // 传入的是请求参数，必须是JSON格式
 await example.login({username: "test", password: "abcd1234"});
} 
```

### 可选中菜单样式

在使用Menu组件实现可选择菜单功能时，请添加class属性为"select-menu-tree"，即可设置比较美观的可选择菜单，并且能于主题颜色相匹配。

```html
<Menu class="select-menu-tree">
    <!-- 菜单项 -->
</Menu>
```

### 过渡动画

定义了3个全局过渡动画，用的话直接在**transition**标签中添加name属性就可以了。

| name | 说明 |
| --- | --- |
| fade | 淡入淡出 |
| slide-fade | 向上出现，向下效时过渡动画 |
| fast-slide-fade | 向上消失，向下出现，快速过渡动画 |

使用实例：

```html
<transition name="fast-slide-fade">
    <!-- 要添加过渡效果的元素 -->
</transition>
```

## 全局配置文件

在项目的pulbic目录存放着一个**global-config.js**文件

```js
/**
 * 全局配置类，建议统一通过GlobalConfigReader类来读取配置项
 */
// 由于这里不会被webpack管理，babel不会起作用，所以不能用es6语法，防止浏览器不兼容
(function() {
  const config = {
    // --是否使用反向代理，默认为true
    // reverseProxy: false,
    // --生产环境后端服务的地址，reverseProxy为false时生效（针对部署在Tomcat等不具备反向代理功能的容器时使用，如果使用nginx部署则不需要这个配置项）
    // serverURL: "http://rap2.taobao.org:38080/app/mock/251389",
    // --下面可以按需要扩展配置项，扩展之后记得一定要同时扩展/src/utils/GlobalConfigReader.ts中GlobalConfig类的属性
  };
  // 没有配置就不存localStorage了
  if (config === {}) {
    return;
  }

  const configJSONStr = JSON.stringify(config);
  localStorage.setItem("global-config", configJSONStr);
})();
```

目前只支持**reverseProxy**和**serverURL**两个配置项，如果需要扩展，可以在**config**对象中自行添加，需要处理自定义的配置项可以通过**GlobalConfigReader**类的**readGlobalConfig**方法获取config对象，然后按照自己的业务逻辑处理自定义的配置项。

> 由于global-config.js在public目录，因此不会被Webpack打包，所以配置项可以在生产环境实现热配置。

## 个性化

### 自定义壁纸

heart具备切换壁纸的功能，不过目前只有4张壁纸，如果嫌少的话可以自己添加哦。

1. 首先把你喜欢的壁纸添加到public/wallpapers目录下

![输入图片说明](https://images.gitee.com/uploads/images/2020/0714/193906_c38759d4_5449551.png "屏幕截图.png")

2. 在src/constants/heart/values/Global.ts文件中的**WALLPAPER_URLS**数组添加自己的图片路径

```ts
/**
 * 壁纸路径列表，指向public/wallpapers目录
 */
export const WALLPAPER_URLS: Array<string> = [
  "/wallpapers/background0.jpg",
  "/wallpapers/background1.jpg",
  "/wallpapers/background2.jpg",
  "/wallpapers/background3.jpg"
  // 这里自行添加路径
];
```

这样你的图片也可以成为壁纸啦^_^

### 自定义主题

heart可以随时切换颜色主题，目前提供了4种主题颜色，当然你可以根据自己的喜好自行添加。

1. 在src/assets/heart/global/scss/themes目录下创建自己的主题样式表，需要时scss文件哦，然后复制下面代码到自己的样式表文件中。

```css
@import "./variables.scss";

// 红色主题
$primary-red: #C14253;
$lightPrimary-red: #C25D6B;
$darkPrimary-red: #B53647;

.red {
    .heart-base-modal {
        .ivu-modal {
            .ivu-modal-content {

                // 模态框头部
                .ivu-modal-header {

                    // 标题
                    .title {
                        color: $title;
                    }

                    // 按钮组
                    .button-group {

                        // 按钮默认样式
                        .ivu-btn {
                            color: $content;
                        }

                        // 最大化和最小化按钮
                        .fullscreen-button:hover,
                        .reset-screen-button:hover,
                        .hide-button:hover {
                            background-color: $background;
                        }

                        // 关闭按钮
                        .close-button:hover {
                            background-color: $error;
                            color: #ffffff;
                        }
                    }
                }
            }
        }
    }

    // 开始按钮
    .start-button {
        background-color: rgba($color: $background, $alpha: 0.9);
        color: $primary-red !important;

        &:hover {
            background-color: $primary-red;
            color: white !important;
        }
    }

    // 底部栏打开模块的小图标
    .tab-container {
        .ivu-dropdown {
            .tab-icon {
                color: white;

                // 底下的小线条
                &::after {
                    background-color: $darkPrimary-red;
                }

                &:hover {
                    background-color: rgba($color: white, $alpha: 0.2);
                }
            }

            // 选中样式
            .tab-icon-active {
                background-color: rgba($color: white, $alpha: 0.4);

                &:hover {
                    background-color: rgba($color: white, $alpha: 0.6) !important;
                }
            }
        }
    }

    // 右下角小图标
    .icon-group {
        .show-destop {
            border-left: 1px solid $lightPrimary-red;

            &:hover {
                background-color: rgba($color: white, $alpha: 0.5);
            }
        }
    }

    // 开始菜单
    .start-box {
        .menu-container {
            background-color: rgba($color: white, $alpha: 0.8);

            // 菜单区域
            .menu-box {
                background-color: rgba($color: white, $alpha: 0);

                // 菜单树
                .menu-tree {
                    background-color: rgba($color: white, $alpha: 0);

                    .ivu-menu-item-active:not(.ivu-menu-submenu) {
                        color: $title !important;

                        &:hover {
                            background-color: rgba($color: $lightPrimary-red, $alpha: 0.3) !important;
                            color: $title !important;
                        }
                    }

                    .ivu-menu-item {
                        span {
                            color: white;
                        }
                    }

                    .ivu-menu-item,
                    .ivu-menu-submenu-title {
                        color: $title;

                        &:hover {
                            background-color: rgba($color: $lightPrimary-red, $alpha: 0.3);
                            color: $title;
                        }
                    }
                }
            }

            // 开始菜单右侧用户操作区域
            .user-info {

                .user-operation-box {

                    .user-operation {

                        .operations {
                            color: $content;
                            background-color: rgba($color: white, $alpha: 0);

                            .ivu-menu-item-active:not(.ivu-menu-submenu) {
                                color: $title !important;
                                background: none !important;

                                &:hover {
                                    background-color: rgba($color: $lightPrimary-red, $alpha: 0.3) !important;
                                    color: $title !important;
                                }
                            }

                            .ivu-menu-item,
                            .ivu-menu-submenu-title {

                                &:hover {
                                    background-color: rgba($color: $lightPrimary-red, $alpha: 0.3);
                                    color: $title;
                                }
                            }
                        }

                        .logout-button {
                            background-color: rgba($color: white, $alpha: 0);
                            color: $primary-red;
                            border-color: $primary-red;

                            &:hover {
                                background-color: rgba($color: $primary-red, $alpha: 0.9);
                                color: white;
                            }
                        }
                    }
                }
            }
        }
    }

    // 锁定界面
    .lock {

        .login-form-box {

            .login-form-lock {

                .form-content {
                    color: white;

                    .form-lock {

                        .ivu-input-suffix {

                            // 登录按钮
                            button {

                                .icon-arrow-right {
                                    color: white;
                                }
                            }
                        }
                    }

                }
            }
        }
    }

    // 登录页面表单
    .login-form {
        background-color: rgba($color: white, $alpha: 0.7);

        .ivu-form {
            .ivu-form-item {
                .ivu-form-item-content {
                    .ivu-input-prefix {
                        i {
                            color: rgba($color: $primary-red, $alpha: 0.7);
                        }
                    }
                }
            }
        }
    }

    // 可选则菜单样式
    .select-menu-tree {
        background-color: white;

        .ivu-menu-item-active:not(.ivu-menu-submenu) {
            color: $primary-red !important;
            background: rgba($color: $darkPrimary-red, $alpha: 0.1) !important;

            &::after {
                background: $darkPrimary-red !important;
            }
        }

        .ivu-menu-item,
        .ivu-menu-submenu-title {
            color: $title;

            &:hover {
                background-color: rgba($color: $lightPrimary-red, $alpha: 0.3);
                color: $title;
            }

            span {
                color: white;
            }
        }

    }

    // 404页面
    .not-found {
        color: $primary-red;
    }

    // 滚动条滑块
    ::-webkit-scrollbar-thumb {
        background: $primary-red;
    }

    // 滚动条轨道
    ::-webkit-scrollbar-track {
        background: white;
    }

    // 修改按钮默认样式
    .ivu-btn:focus {
        box-shadow: 0 0 3px $primary-red;
        ;
    }

    .ivu-btn-default,
    .ivu-btn-dashed {
        border-color: $primary-red;
        color: $primary-red;

        &:hover {
            border-color: $lightPrimary-red;
            color: $lightPrimary-red;
        }
    }

    .ivu-btn-default.active,
    .ivu-btn-default:active,
    .ivu-btn-dashed.active,
    .ivu-btn-dashed:active {
        border-color: $primary-red;
        color: $primary-red;
        box-shadow: 0 0 2px $primary-red;
    }

    .ivu-btn-primary {
        background-color: $primary-red;
        border-color: $primary-red;

        &:hover {
            background-color: $lightPrimary-red;
            border-color: $lightPrimary-red;
        }
    }

    .ivu-btn-primary.active,
    .ivu-btn-primary:active {
        background-color: $primary-red;
        border-color: $primary-red;
        box-shadow: 0 0 2px $primary-red;
    }

    .ivu-btn-text:hover {
        color: $lightPrimary-red;
    }

    .ivu-btn-text.active,
    .ivu-btn-text:active {
        color: $primary-red;
    }

    // 顶部进度条颜色
    #nprogress .bar {
        background: $primary-red !important;
    }
}
```

2. 其实你只需要在自己的主题样式表中，定义三个主题颜色变量，把最顶层的class名称改成自己的，然后把样式表中调用到主题颜色的变量名改成自己的就可以了。

3. 在src/constants/heart/values/Global.ts文件中的THEMES数组中按格式添加。

```ts
/**
 * 主题颜色映射
 */
export const THEMES = [
  { class: "red", color: "#C14253" },
  { class: "blue", color: "#2d8cf0" },
  { class: "purple", color: "#7952b3" },
  { class: "black", color: "#314351" }
  // 这里可以添加自己的主题，按照上面的格式，应该看得懂吧-_-
]
```

> 当然，目前并不是所有ViewUI组件都适配了主题颜色，如果有用到某些组件，不适配主题颜色的话，在themes目里下的样式表中补上就可以了，**记得要所有主题都补上哦**

## 对接自己的后端

前面提过，由于公司要求，heart默认会对接Jeesite的后端，但是考虑到扩展性，在heart开发的时候，与Jeesite耦合的类或方法都标记了"4Jeesite"的后缀，只要搜索**4Jeesite**就可以知道对接其他后端时，需要修改哪些地方了。api部分还定义了接口，对接其他后端时，api部分只需要按自己的业务需求实现对应的接口即可。

![输入图片说明](https://images.gitee.com/uploads/images/2020/0715/104937_8103df4d_5449551.png "屏幕截图.png")