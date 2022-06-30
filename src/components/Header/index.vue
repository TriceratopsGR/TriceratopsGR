<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <!-- 声明式导航 必须要to属性  to条哪里去 -->
            <router-link to="/login">
              <a>登录</a>
            </router-link>
            <router-link to="/register" class="register">
              <a>免费注册</a>
            </router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home">
          <a class="logo" title="尚品汇" target="_blank">
            <img src="./images/logo.png" alt="" />
          </a>
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSeach"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      keyword: "",
    };
  },

  mounted() {
    // 通过全局事件总线清除 关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },

  methods: {
    /**
     * 搜索按钮的回调函数：需要向search路由进行跳转
     */
    goSeach() {
      // 路由传参数
      // 第一张：字符串形式
      // this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );

      // 模板字符串
      // this.$router.push(
      //   `/search/ ${this.keyword}?k=${this.keyword.toUpperCase()}`
      // );

      // 对象写法
      // this.$router.push(
      //   {
      //     name: "search",
      //     params: { keyword: this.keyword },
      //     query: { k: this.keyword.toUpperCase() },
      //   },
      //   () => {},
      //   (error) => {
      //     // 捕获当前的错误
      //     // console.log(error);
      //   }
      // );
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };

        location.query = this.$route.query;

        this.$router.push(location);
      }
      //返回的是一个 promise
      // console.log(this.$router);
      // push : VueRouter类的一个实例
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>