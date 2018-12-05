# 四叶草庄园

基于使用[ztaro](https://github.com/FaureWu/ztaro)脚手架快速搭建的电商实战项目`四叶草庄园`

## 已开发的需求

* 项目脚手架搭建
* 登录机制实现

## 计划需求

* 首页
  * 首页资源位
  * 首页品牌推荐
  * 推荐商品
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
