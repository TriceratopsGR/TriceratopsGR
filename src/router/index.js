import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'


Vue.use(VueRouter)
// console.log(VueRouter);

// 引入 store
import store from '@/store'


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

// 全局守卫 ： 前置守卫 在路由跳转之前判断
// 条哪里  从哪里  放行
router.beforeEach(async (to, from, next) => {
  // to:可以获取到你要跳转的路径
  // from： 从那个路由来的
  // next: 放行函数   直接放行 next();
  // next('/login') // 放行到指定的路径  next(false);
  // next();
  // 获取用户登录 的token 没登陆没有token
  // console.log(store.state.user.token);
  let token = store.state.user.token;

  // 用户信息 
  let name = store.state.user.userInfo.name;
  // 空对象 进行if判断的时候为真
  // console.log(name);
  // console.log(token);
  if (token) {
    // 用户登录了 还想去login /  register [不能去了 停留的首页]
    if (to.path == '/login'|| to.path=='/register') {
      next('/home')
    } else {
      //登录了 去的不是login 【home/seach/..】
      // 如果用户名有
      if (name) {
        next();
      } else {
        try {
         //没有用户信息， 派发action 让仓库存储用户信息在跳转
        // 获取用户信息 在首页显示
        // this.$store.dispatch("getUserInfo");
          await store.dispatch('getUserInfo');
          next();
       } catch (error) {
            //token 失效 清除token 信息 回到登录
            await store.dispatch('userLogout');
            next('/login');
       }
      }
    }
  } else {
    // 全局守卫
    // 用户未登录 全部放行 到时候再处理
    // next();
    //未登录 不能去交易、支付、不能去个人中心
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      // 把未登录的时候想去的地方而没去成的地方，存储于地址栏中【路由】
      next('/login?redirect='+toPath);
      console.log('请登录');
    } else {
      //放行
      next();
    }
  }
})

export default router
