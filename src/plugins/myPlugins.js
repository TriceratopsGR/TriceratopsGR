// 封装自定义 指令
// Vue 插件一定暴露一个对象
let myPlugins = {};


// 需要一个install 方法
myPlugins.install = function (Vue,options) {
    // console.log(Vue);
    // console.log(options);
    Vue.directive(options.name, (element, params) => {
        element.innerHTML = params.value.toUpperCase()+'封装自定义 指令';
        // console.log('执行');
    });
}


// 暴露 
export default myPlugins;