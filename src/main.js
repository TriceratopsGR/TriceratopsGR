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

new Vue({
  // 注册 路由  组件身上都要$route,$router属性
  router,
  // 注册仓库：组件实例的身上多了一个属性$store 属性
  store,
  render: h => h(App),
  // 全局事件总线 $bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
