//引入路由

//引入二级路由
/**
 * 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
 * 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，
 * 这样就更加高效了。
 */
// 路由配置信息
export default [
    //重定向,在项目访问，立马让他定向到首页
  {
     path: "/",
     redirect: "/home",
  },{
    path: '/center',
    name: 'center',
    // 路由懒加载 用法
    component: ()=>import('@/pages/Center'),
    meta: {
      show:true
    },
    redirect: "/center/myOrder",
    // 二级路由组件
    children: [
      
      {
        path: 'myOrder',
        component:()=>import('@/pages/Center/myOrder')
      },{
        path: 'groupOrder',
        component:()=>import('@/pages/Center/groupOrder')
      }
    ]
  },{
    path: '/paySuccess',
    name: 'paySuccess',
    component: ()=>import('@/pages/PaySuccess'),
    meta: {
      show:true
    }
  },{
    path: '/pay',
    name: 'pay',
    component: ()=>import('@/pages/Pay'),
    meta: {
      show:true
    },
    // 路由独享守
    beforeEnter: (to, from, next)=>{
      if (from.path == '/trade') {
        next();
      } else {
        // false 从哪里来回那里去
        next(false);
      }
    }
  },{
    path: '/shopcart',
    name: 'shopcart',
    component: ()=>import('@/pages/ShopCart'),
    // 底部组件是否显示
    meta: {
      show:true
    }
  },{
     path: '/detail/:skuid',
     name: 'detail',
     component:()=>import('@/pages/Detail') ,
     // 底部组件是否显示
     meta: {
       show:true
     }
   },{
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: ()=>import("@/pages/AddCartSuccess"),
    // 底部组件是否显示
    meta: {
      show:true
    }
  },{
     path: '/home',
     name: 'home',
     component: ()=>import("@/pages/Home"),
     meta: {
       show:true
     }
   },{
    path: '/trade',
    name: 'trade',
    component: ()=>import("@/pages/Trade"),
    meta: {
      show:true
    },
    // 路由独享守卫 我只负责我自己
    beforeEnter: (to, from, next) => {
      // 去交易页面必须是从 购物车而来的 
      if (from.path == '/shopcart') {
        next();
      } else {
        //中断当前的导航 就是 从哪里来回哪里去
        next(false);
      }
    }

  },{
     path: '/login',
     name: 'login',
     component: ()=>import("@/pages/Login"),
     meta: {
       show:true
     }
   },{
     path: '/register',
     name: 'register',
     component: ()=>import("@/pages/Register"),
     meta: {
       show:false
     }
   },{
     path: '/search/:keyword',
     name: 'search',
     component: ()=>import('@/pages/Search'),
     meta: {
       show:true
     },
     // 路由组件能不能传递props数据？
     // 布尔值写法：params
     // props:true
     //对象写法：额外的给路由组件传递一些 props
     // props:{a:1,b:2}
     // 函数写法：可以params参数、query参数，通过props传递给路由组件
     // props: ($route) => ({ keyword: $route.params.keyword, k: $route.params.k })
     
  }, {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    redirect: "/communication/event",
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter:true
        }
      },{
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter:true
        }
      },{
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter:true
        }
      },{
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter:true
        }
      },{
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter:true
        }
      },{
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter:true
        }
      }
    ]
   }
 ]