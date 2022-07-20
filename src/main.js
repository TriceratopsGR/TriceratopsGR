import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

//三级联动组件 --- 全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

// 全局组件的名字 / 标签名
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入MockServer.js ===mock数据
import '@/mock/mockServe';

// 引入swiper的样式
import 'swiper/css/swiper.css'


//统一接口api接口里面的全部接口请求函数
import * as API from '@/api'


// element-ui 按需要引入
import { Button, MessageBox } from 'element-ui'
// 全局注册 
Vue.component(Button.name, Button)
// 文档的注册方式 -- 挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入图片懒加载 插件
import VueLazyload from 'vue-lazyload'
// 引入图片
import dog from '@/assets/images/1.jpg'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading:dog
})

// 引入校验插件
import '@/plugins/validate';

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
console.log(myPlugins);
Vue.use(myPlugins, {
  name:'upper'
})
import kong  from '@/plugins/kong'
Vue.use(kong, {
  name:'kongs'
})

new Vue({
  // 注册 路由  组件身上都要$route,$router属性
  router,
  // 注册仓库：组件实例的身上多了一个属性$store 属性
  store,
  render: h => h(App),
  // 全局事件总线 $bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    // api全部接口函数
    Vue.prototype.$API = API;
  }
}).$mount('#app')
