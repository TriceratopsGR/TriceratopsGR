// 当前这个模糊：api接口统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'

// 三级联动的
// /api/product/getBaseCategoryList  GET  无参
// 发送请求：axios 返回的promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });


// 发送请求：axios 返回的promise对象  获取 banner(Home 轮播图接口)
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块 /api/list  要带参
// daa
export const reqGetSearchInfo = (data) => requests({
    url: '/list',
    method: 'post',
    data
})


// 获取产品详情的接口 url: /api/item/{ skuId } 请求方式：GET  参数：skuId
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method:'get'
}) 


//将产品添加到购物车中 获取更新
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})

// 获取购物车 列表 /cart/cartList
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });

// 删除购物车的商品
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
});

// 切换商品选中状态
// get  /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})