import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api";

// home 模块的小仓库
const state = {
    // state中数据初始值 不要乱写
    categoryList: [],
    // 轮播图
    bannerList: [],
    // floor 数据
    floorList:[]

};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    },
};
const actions = {
    // 通过api里面的接口函数调用，向服务器发送请求，获取服务器数据
    async categoryList({commit}) {
        let result = await reqCategoryList();
        // console.log(result);
        // if (result.code === 200) {
        //     commit('CATEGORYLIST', result.data);
        // }
        result.code===200&&commit('CATEGORYLIST', result.data);
    },
    // 获取数据
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        // console.log(result);

        result.code===200&&commit('GETBANNERLIST', result.data);
    },
    // 获取数据
    async getFloorList({commit}) {
        let result = await reqFloorList();
        // console.log(result);

        result.code===200&&commit('GETFLOORLIST', result.data);
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}