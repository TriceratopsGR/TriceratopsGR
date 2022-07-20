<template>
  <div id="app">
    <h1 v-upper="msg"></h1>
    <h2 v-kongs="kl"></h2>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <Header></Header>
    <router-view />
    <!-- 在Home、Search显示在登录、注册时候隐藏的 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
// import "@/assets/css/reset.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "app",
  data() {
    return {
      msg: "ABCdefgfasfasaaaaaa",
      kl: "konglongs",
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库当中 三级初始化
    this.$store.dispatch("categoryList");
  },
};
</script>

