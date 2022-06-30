//引入路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

// 路由配置信息
export default [
    //重定向,在项目访问，立马让他定向到首页
    {
     path: "/",
     redirect: "/home",
  },{
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart,
    // 底部组件是否显示
    meta: {
      show:true
    }
  },{
     path: '/detail/:skuid',
     name: 'detail',
     component: Detail,
     // 底部组件是否显示
     meta: {
       show:true
     }
   },{
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
    // 底部组件是否显示
    meta: {
      show:true
    }
  },{
     path: '/home',
     name: 'home',
     component: Home,
     meta: {
       show:true
     }
   },{
     path: '/login',
     name: 'login',
     component: Login,
     meta: {
       show:true
     }
   },{
     path: '/register',
     name: 'register',
     component: Register,
     meta: {
       show:false
     }
   },{
     path: '/search/:keyword',
     name: 'search',
     component: Search,
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
     
   }
 ]