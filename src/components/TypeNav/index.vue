<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- d利用事件委派+ 编程式导航实现路由跳转加传参 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- :data-categoryName 自定义属性 -->
                  <a
                    class="text"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                  <!-- 使用 router-link 可以实习路由跳转 但会出现卡顿
                    router-link 是一个组件 ，当服务器的数据返回之后，循环出很多的router-link
                    组件【创建组件实例的】
                -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式:是吧lodash全部功能函数引入
// 最好的引入方式 ： 按需加载
// import _ from "lodash";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",

  data() {
    return {
      // 存储用户移上当前的分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，可以向服务器发送请求
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库当中
    // this.$store.dispatch("categoryList");
    //当组件挂载完毕
    // 判断路由组件
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state 其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标移入
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },
    //throttle回调函数别用箭头函数，可能出现上下文this
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 20),
    // 鼠标移出
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 进行路由跳转
    goSearch(event) {
      //最好的解决方案： 编程式导航 + 事件委派
      // 存在一些问题:事件委派，是把全部的子节点【h3,dt,dl,em 】的事件委派给父节点
      // 点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
      // 存在另外一个问题：即使你能确定点击的是a标签，如何区一二三级分类的标签

      //第一个问题：把子节点当中a标签，我加上自定义属性 data-categoryName,其余的子节点是没有的
      let element = event.target;
      // console.log(element);
      // 获取到当前触发的节点 需要带有data-categoryName属性的就是a标签
      // 节点有一个属性 dataset 属性，可以获取节点的自定义属性于属性值
      console.log(element.dataset);

      let { categoryname, category1id, category2id, category3id } =
        element.dataset;

      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }

        // 整理完参数 跳转
        // location.query = query;
        // this.$router.push(location);

        // 判断：如果路由跳转的时候，带有params参数，捎带一个传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 动态location 配置对象添加query属性
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入的时候让商品列表进行展示
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            // background-color: rgba(80, 156, 255, 0.301);
            // .item-list {
            //   display: block;
            // }
            .text {
              color: rgb(11, 82, 235);
            }
          }
        }
        .cur {
          background-color: rgba(80, 156, 255, 0.301);
        }
      }
    }

    //过度动画的样式
    // 进入的时候
    .sort-enter {
      height: 0px;
      transform: rotate(0deg);
    }
    // 进入结束的时候
    .sort-enter-to {
      height: 461px;
      transform: rotate(360deg);
    }
    // 定义动画时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
  }
  a {
    cursor: pointer;
    &:hover {
      color: pink;
    }
  }
}
</style>