# 四叶草庄园

## 启动项目
本项目基于[ztaro](https://github.com/FaureWu/ztaro)脚手架快速搭建
如何启动请直接查看ztaro中微信小程序部分，h5部分未做适配

## 项目演示

<img src="https://gxm-ecommerce.oss-cn-shenzhen.aliyuncs.com/user_upload/rc-upload-1545713993318-4.png" width="200" /><img src="https://gxm-ecommerce.oss-cn-shenzhen.aliyuncs.com/user_upload/rc-upload-1545713993318-6.gif" width="207" />

## 技术链接

* [zoro](https://github.com/FaureWu/zoro) redux框架
* [taro](https://taro.js.org/) 微信小程序框架taro
* [ztaro](https://github.com/FaureWu/ztaro) taro快速启动脚手架

## 已开发的需求

* 项目脚手架搭建
* 登录机制实现
* 首页
  * 首页资源位
  * 首页品牌推荐
  * 推荐商品

## 计划需求

* 商店
  * 品牌列表
  * 品牌商品列表
* 商品详情
* 购物车
* 订单结算，支付
* 我的
  * 会员信息
  * 客服
  * 关注公众号
  * 新人福利群
* 地址管理
* 订单
  * 全部
  * 待付款
  * 待发货
  * 待收货
  * 已完成
  * 已取消

## __TAB_PAGE__ 参数说明

__TAB_PAGE__参数用于标记该页面是否是一个微信小程序tabbar页面

由于本地缓存了token，然而token是有时效性的
当缓存的token过期时，服务端api返回401，此时前端处理流程如下：
  * 跳转重新登录页面Taro.redirectTo({ url: `/pages/relogin/relogin?redirectUrl=...&isTabbar=true` })
  * 重新登录页面调用登录接口，登录完成后，读取redirectUrl, isTabbar参数
  * 如果isTabbar为真，需调用Taro.switchTab，否则调用Taro.redirectTo，重载之前的页面

## 开发交流

请添加微信 `Faure5`，备注 `weapp-clover` 开源不易，如果好用，欢迎star

<img src="https://img.baobeicang.com/user_upload/rc-upload-1539676937885-2.jpeg" width="150" />

## License

[MIT](https://tldrlegal.com/license/mit-license)
