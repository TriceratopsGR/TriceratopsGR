// 对于axios 进行二次封装
import axios from "axios";

// 引入进度条
import nprogress from "nprogress";
//在当前模块中引入 store
import store from "@/store";
// 引入进度条样式
import 'nprogress/nprogress.css'
// start:进度条开始  done:结束
// console.log(nprogress);

//1:利用axios 对象的方法create,去创建一个axios实例

const requests = axios.create({
    // 基于那个路径
    // 基础路径：发送请求的时候，路径当中会出现/api
    baseURL: '/api',
    // 超时
    timeout: 5000

});
//请求拦截器：在方式请求之前，请求拦截器可以检测到，可以在请求发出去之前搓一下事情
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        // 给请求头添加一个字段 要和后端商量好
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 需要携带token 给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // 进度条开始动
    nprogress.start();
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数 服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 进度条结束
    nprogress.done();
    return res.data
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
})


// 对外暴露
export default requests;