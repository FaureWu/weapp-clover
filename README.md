# ztaro

结合小程序框架[taro](https://github.com/NervJS/taro)，状态管理库[zoro](https://github.com/FaureWu/zoro)，微信小程序开发，h5开发实践方案

## 教程
* [微信小程序及h5,基于taro，zoro最佳实践探索](https://www.jianshu.com/p/7c27dbbc080f)

## 演示

<img src="https://img.baobeicang.com/user_upload/rc-upload-1542346706655-4.gif" width="200" /><img src="https://img.baobeicang.com/user_upload/rc-upload-1542346706655-6.gif" width="200" />

## 特性

> 在taro框架的基础上集成了如下简易开发特性，如需了解taro框架，请移步[taro官方网站](https://taro.js.org/)

* redux轻量级框架zoro，用法类似与dva，极易上手
* 基于[express](http://www.expressjs.com.cn/)，[faker](https://github.com/Marak/faker.js)集成了小程序端，h5端简易数据模拟方案，实现真正的前后端分离式开发
* 扩展request接口，支持restful api冒号参数
* 提供完善的错误处理机制
* 结合真实生产的环境简易配置方案

## 如何安装

```bash
$ npm install -g @tarojs/cli
$ npm install
or
$ yarn global add @tarojs/cli
$ yarn
```

## 开发前准备

本脚手架中config/config.js中的配置都是不可用的配置，需要在启动前，修改为你对应的配置

* server 对应不同环境下的api服务器地址
* oss 对应不同环境下的阿里云oss配置

## 图片资源上传阿里云oss服务器

由于小程序包大小限制，为了节省空间，我们通常会将图片资源上传到远程服务器，目前taro的plugin还不支持自定义，
因此我们在编译成微信小程序引入gulp执行上传任务，插件地址[gulp-alioss-upload](https://github.com/FaureWu/gulp-alioss-upload)

在编译成h5过程中，我们利用webpack的loader机制，编写了相同功能的[alioss-upload-loader](https://github.com/FaureWu/webpack-alioss-upload-loader)

以上两个工具的配置一致，都在config/config.js中配置
```js
module.export = {
  oss: {
    // BUILD_ENV === dev环境下的阿里云配置
    dev: {
      accessKeyId: '这里是dev环境阿里云oss key',
      accessKeySecret: '这里是dev阿里云oss secrect',
      endpoint: 'https://**********.aliyuncs.com',
      region: '*********',
      bucket: '这里是dev阿里云oss bucket',
    },
    // BUILD_ENV === prod环境下的阿里云配置
    prod: {
      accessKeyId: '这里是prod环境阿里云oss key',
      accessKeySecret: '这里是prod阿里云oss secrect',
      endpoint: 'https://**********.aliyuncs.com',
      region: '*********',
      bucket: '这里是prod阿里云oss bucket',
    },
    path: 'src/assets/', // 这里指定oss资源文件根目录
    prefix: '@oss', // 指定需要上传资源的前坠同时也是资源根路径的别名
    formats: ['png', 'jpeg', 'jpg', 'svg'], // 指定可上传的资源格式
  },
```

在js中引用
```js
const image = '@oss/logo.jpeg'
```

在样式中引用
```css
.app {
  background-image: url("@oss/logo.jpeg")
}
```

在json中引用
```json
{
  "logo": "@oss/logo.jpeg"
}
```

最终都会被替换成上传后的真实阿里云oss地址，不支持通过require或者import导入资源
```js
import logo from '@oss/logo.jpeg' // 该写法错误，不支持
```

## 如何开发

> 在前后端分离的应用中，往往我们开始编写前端界面及逻辑时，后台的api接口仅仅提供了swaggar文件，可能还没编写代码，可能还没部署到开发环境，这样我们的工作便会处处受困于后台，因此我们可以在本地启动数据模拟服务，编写简易的后台api返回

```bash
$ npm run mock:weapp # 启动小程序端
$ npm run mock:h5 # 启动h5端
```
or
```bash
$ yarn mock:weapp # 启动小程序端
$ yarn mock:h5 # 启动h5端
```

以上命令会启动app，并且在本地启动mock服务`127.0.0.1:3000`，我们只需在mock目录下编写数据mock，在src中编写界面及逻辑即可

> 值得注意的是在mock模式下，我们需要配置`project.config.json`文件下的`urlCheck: false` 

---

当我们某些模块编写完成，后台api也已就绪，需要进行联调阶段时，首先我们改写`config/config.js` 文件，配置dev环境下的api服务器地址

```js
module.exports = {
  server: {
    dev: 'https://devapiserver',
    ...
  },
  ...
}
```

> 需要在微信后台配置相关安全域名，或者临时性的修改`urlCheck: false`

执行如下命令，启动开发联调环境

```bash
$ npm run dev:weapp # 启动小程序端
$ npm run dev:h5 # 启动h5端
```
or
```bash
$ yarn dev:weapp # 启动小程序端
$ yarn dev:h5 # 启动h5端
```

执行以上命令不会在本地启动mock服务器，直接连接dev环境服务器

---

## 如何编写MOCK

所有的mock api服务均放在mock目录下，该目录下的所有js将会自动注册到express服务器中，无需额外的引入

mock服务导出格式，参考mock/todos.js
```js
module.exports = {
  'GET /v1/todos': getTodos,
  'POST /v1/todo': addTodo,
  'DELETE /v1/todo/:id': deleteTodo,
  'GET /v1/todo/httpStatusError': httpStatusError,
  'GET /v1/todo/serviceError': serviceError,
}
```

数据模拟查看[faker](https://github.com/Marak/faker.js)文档

api编写参考[express](http://www.expressjs.com.cn/)

## 如何打包

我们需要在产品开发完成后打包dev环境给测试，可执行如下命令

```bash
$ npm run build:weapp-dev # 打包dev环境小程序包
$ npm run build:h5-dev # 打包dev环境h5包
```
or
```bash
$ yarn build:weapp-dev # 打包dev环境小程序包
$ yarn build:h5-dev # 打包dev环境h5包
```

当测试完成准备上线，可执行如下打包命令

```bash
$ npm run build:weapp # 打包dev环境小程序包
$ npm run build:h5 # 打包dev环境h5包
```
or
```bash
$ yarn build:weapp # 打包dev环境小程序包
$ yarn build:h5 # 打包dev环境h5包
```

最终打包目录在dist文件夹中

## request异步请求的使用

该项目中`src/utils/request.js`中对Taro.request进行了一次封装，增强了部分特性，使用方法同Taro.request

* 支持冒号参数替换
```js
// request参数举例
request({
  url: '/api/v1/todo/:id',
  data: {
    id: '1234343',
  }
})
```

* 捕获request异步请求错误，并抛到全局中处理，可以更好的处理错误而不阻断其他业务的进行

> 推荐所有的请求都走request，否则异步错误无法捕获

## UI组件框架

未引入UI组件框架，如需要，请自行引入，可用[taro-ui](https://github.com/NervJS/taro-ui)

## 数据处理框架zoro

* 默认引入了mixins插件，用于扩展model，[mixins插件](https://github.com/FaureWu/zoro-plugin/blob/master/doc/MIXINS_PLUGIN.md)
* 未引入loading插件，如需请自行引入，引入方式[全局loading插件](https://github.com/FaureWu/zoro-plugin/blob/master/doc/LOADING_PLUGIN.md)

zoro框架的使用这里不在描述，自行查看文档[zoro](https://github.com/FaureWu/zoro)

> 本方案中以todos的demo演示了整体框架使用方法
