import { reqCartList, reqDeleteCartById,reqUpdateCheckedByid } from "@/api";
// 三连环

const state = {
    //3
    cartList:[]
};
const mutations = {
    //2
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    // 1
    // 获取购物车列表数据
    async getCartList({commit}) {
        let res = await reqCartList();
        res.code===200 && commit("GETCARTLIST",res.data)
    },
    // 删除购物车产品
    async deleteCartBySkuId({ commit },skuId) {
        let res = await reqDeleteCartById(skuId);

        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车商品的选中状态
    async updateCheckedById({ commit,dispatch }, { skuId, isChecked }) {
        let res = await reqUpdateCheckedByid(skuId, isChecked);

        if (res.code === 200) {
            dispatch('getCartList')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //删除全部选中的商品
    // context上下文
    deleteAllCheckedCart({ dispatch, getters }) {
        //获取购物车全部的商品
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartBySkuId', item.skuId) : '';
            // 将每个返回的promise
            PromiseAll.push(promise);
        });
        // 返回的都是成功就成功 
        console.log(PromiseAll);
        return Promise.all(PromiseAll);
    },
    //修改全部产品状态
    updateAllCartIsChecked({ dispatch, state,getters},isChecked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            // 将每个返回的promise
            PromiseAll.push(promise);
        })

        return Promise.all(PromiseAll)
    }

    
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },

};

export default {
    state,
    mutations,
    actions,
    getters
}