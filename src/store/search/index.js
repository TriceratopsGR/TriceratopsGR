import { reqGetSearchInfo} from "@/api"

// search 模块的小仓库
const state = {
    searchList:{},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    // 传了 就是 数据 没有的话就是空对象
    async getSearchList({commit},params={}) {
        let result = await reqGetSearchInfo(params);
        result.code === 200 && commit("GETSEARCHLIST",result.data);
 }
};
// 计算属性  ---> 为了 简化仓库数据而生
const getters = {
    // 当前仓库的state 并非大仓库的state
    goodsList(state) {
        // 这样书写是有问题的 如果searchList为空时 undefined
        return state.searchList.goodsList||[];
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[];
    },
    attrsList(state) {
        return state.searchList.attrsList||[];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}