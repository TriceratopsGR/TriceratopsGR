import Vue from 'vue'
import Vuex from 'vuex'

// 需要使用一次
Vue.use(Vuex)
// state:仓库存储数据的地方
// const state = {
//   count:1
// };
// mutations：修改state的唯一手段
// const mutations = {
//   ADD(state,count) {
//     // state.count = count;
//     state.count++
//   }
// };
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {
//   // 这里可书写以业务逻辑  但是不能修改state
//   add({commit}) {
//     commit("ADD")
//   }
// };
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// const getters = {};

// 引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import cart from './cart';
import user from './user';
import trade from './trade';


// 导出 对位暴露
export default new Vuex.Store({
  // state,
  // getters,
  // mutations,
  // actions,
  // 失效vuex仓库模块化开发存储数据
  modules: {
    home,
    search,
    detail,
    cart,
    user,
    trade
  }
  
})
