import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块uuid  ---> 生成一个随机字符串（不能变）
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodInfo: {},
    // 游客的临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        const res = await reqGoodsInfo(skuId);
        res.code == 200 && commit('GETGOODINFO', res.data)
    },
    //将产品添加到购物车中
    //请求头带上 uuid 身份识别
    async addUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回结果
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 没有放回数据 只有code 200 返回的是一个 Promise
        if (result.code === 200) {
            return "ok"
        } else {
            //代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }
        // result.code === 200?
    }
};
// 简化数据
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        // 比如： state.goodInfo 初始化空对象，空对象的categoryView属性值undefined
        // 当前计算出的 categoryView 属性值至少是一个空对象，假的报错不会有了
        return state.goodInfo.categoryView||{};
    },
    // 简化产品信息数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}