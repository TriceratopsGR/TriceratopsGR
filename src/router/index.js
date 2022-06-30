import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'


Vue.use(VueRouter)
// console.log(VueRouter);


// 先把 VueRouter 原型对象的push 先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push| replace
// 第一个参数 ：告诉我往哪里跳 （传递哪些参数）
// 2 成功回调
// 3 失败回调
VueRouter.prototype.push = function (location,resolve,reject) {
  if (resolve && reject) {
    // originPush()// 这样调为 指向Window
    // call ||  apply相同点篡改上下文 指向 当前对象
    // 不同的 call与apply传递的参数：call传递的参数用逗号隔开，apply方法执行 传递数组：
    originPush.call(this,location,resolve,reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

// 重写 VueRouter.prototype 身上的replace 方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this,location,resolve,reject);
  } else {
    originReplace.call(this,location,()=>{},()=>{});
  }
}



const router = new VueRouter({
  routes,
  // 滚动行为
  // 参考文档 https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    // 距离顶部的像素
    return {y:0}
  }
})

export default router
