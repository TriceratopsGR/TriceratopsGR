import { reqGetCode, reqUserLogin, reqUserRegister, reqGetUserInfo, reqLogout } from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token'

// 登录注册的模块 仓库
const state = {
    code: '',
    token: getToken(),
    userInfo:{}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token   
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = ''
        state.userInfo = {};
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCaode({ commit }, phone) {
        // 获取验证码的接口 是吧 验证码返回了 应该是要发到手机上面
        let res = await reqGetCode(phone);
        if (res.code === 200) {
            commit("GETCODE", res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let res = await reqUserRegister(user);
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务
    async userLogin({ commit }, data) {
        let res = await reqUserLogin(data);
        if (res.code === 200) {
            commit("USERLOGIN", res.data.token);
            // 持久化存储
            // localStorage.setItem("TOKEN", res.data.token);
            setToken(res.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息 
    async getUserInfo({ commit }) {
        let res = await reqGetUserInfo();
        if (res.code === 200) {
            commit("GETUSERINFO", res.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出操作
    async userLogout({ commit }) {
        let res = await reqLogout();
        // action 里面不能操作 state , 提交mutation 修改state
        if (res.code === 200) {
            commit("CLEAR");
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
        
    }
};
const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}