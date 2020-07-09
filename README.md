# heart-front-end

## 简介

heart-front-end是一个类Windows界面的前端项目，基于Vue 2.x + TypeScript + ViewUI(IView 4.x) + Sass开发，由于公司要求，后端暂时对应的是Jeesite的规范，如果想要对接其他后端就要做一些修改哦。
这个项目使用了TypeScript，引入了面向对象和面向接口编程的思想，易于扩展，可以做出各种好玩的东西，喜欢的尽管拿去用吧，我也是刚刚入门，所以肯定会存在不少问题，如果发现有不爽的地方记得告诉我哦^_^

[代码传送门](https://gitee.com/pjhpeter/heart-front-end)



![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/150047_aa18119b_5449551.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/150131_d2422903_5449551.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/152010_2bb77928_5449551.png "屏幕截图.png")

## 安装依赖

```cmd
yarn install
```

## 启动服务
```cmd
yarn serve
```

> 如果没有接触过yarn的小伙伴请移步到[这里](https://gitee.com/pjhpeter/training/blob/master/Vue%E5%85%A8%E5%AE%B6%E6%A1%B6%E5%9F%B9%E8%AE%AD/%E5%89%8D%E7%AB%AF%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.md)


## 约定

### 目录结构

首层目录结构如下

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/145041_3b653224_5449551.png "屏幕截图.png")

每层目录下面都请创建自己项目名称的目录，然后在存放代码

![输入图片说明](https://images.gitee.com/uploads/images/2020/0709/154716_b9e8c946_5449551.png "屏幕截图.png")

> 模块入口请务必组件放在**views**目录，而模块里面的子组件最好**components**目录，方便区分。

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
| url | **必须项**，模态框中要渲染的组件路径，格式为/{项目名}/{模块名}/{功能名}/{组件名}.vue，因为TypeScript不识别.vue组件，所以路径一定要写上.vue后缀，比如/exaple/email/SendBoxHeader.vue | string | 无 |
| backgroundColor | **必须项**，图标的背景颜色 | string | 无 |
| enabledFuscreen | 允许最大化 | boolean | true |
| onClose | 模态框关闭时触发的回调函数，隐藏的时候不会触发，函数接收一个参数 | Function | 无 |

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
  // 模态框关闭时的回调函数
  onClose?: Function;

  /**
   * 根据ViewUI的API，暴露出配置参数
   */
  title: string;
  maskClosable?: boolean;
  loading?: boolean;
  scrollable?: boolean;
  fullscreen?: boolean;
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

一个Promise对象：Promise<Array<MenuInfo> | null>

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
| method    | 请求方式，建议使用RequestMethod枚举赋值 | string   | RequestMethod.GET  |
| failure    | 请求失败时的回调函数 | Function   | 无  |

使用例子：
```ts
import { RequestMethod } from "@/heart/constants/enum/RequestMethod";
 
class Example {
 // 方法上添加Request装饰器，使其变成异步方法
 @Request("/test", RequestMethod.GET, (error: any) = {
     console.log("这是错误信息", error.message);
 })
 // 如果调用方法时不传参，则只需要接收data参数作为响应数据即可
 fetchData(data? any): object {
   console.log("这是响应数据", data);
   return data;
 }
 
 @Request("/login", RequestMethod.POST, (params: object, error: any) = {
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