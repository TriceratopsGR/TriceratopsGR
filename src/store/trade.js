import { reqAddressInfo, reqOrderInfo } from "@/api/index";

const state = {
    address: [],
    orderInfo:{}
};
const mutations = {
    GETSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
};
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let res = await reqAddressInfo();
        if (res.code === 200) {
            commit('GETSERADDRESS', res.data);
        }
    },
    async getOrderInfo({ commit }) {
        let res = await reqOrderInfo();
        res.code===200&&commit('GETORDERINFO',res.data)
    }

};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters

    
}
