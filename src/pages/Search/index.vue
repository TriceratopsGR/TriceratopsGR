<template>
  <div>
    <type-nav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖的属性值面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>
                    综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    >
                    </span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>
                    价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <!-- target="_blank" 重新打开界面 -->
                    <router-link
                      @click="addShopcar"
                      :to="`/detail/${good.id}`"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</router-link
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器参数
      searchParams: {
        // 一级分类的id
        category1id: "",
        // 二级分类的id
        category2id: "",
        // 三级分类的id
        category3id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序  升序于降序
        // 1 综合  2 价格 asc 升序 desc降序 1:asc
        // 初始状态 综合降序
        order: "1:desc",
        // 分页
        pageNo: 1,
        pageSize: 20,
        // 平台售卖属性的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  mounted() {
    // 再发请求之前带个服务器参数
    this.getData();
  },
  // 都在mounted之前
  created() {},
  // 组件挂载完毕执行一次 先于mounted
  beforeMount() {
    // this.searchParams.category1Id = this.$route.query.category1id;
    // this.searchParams.category2Id = this.$route.query.category2id;
    // this.searchParams.category3Id = this.$route.query.category3id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;
    // Object.assign:ES6 合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  watch: {
    // 监听路由参数的变化
    $route(newValue, oldValue) {
      // 再次发送请求之前需要重新整理一次
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      // 每次请求完毕应该把响应的1、2、3级分类的id置空，让他接受下一次的相应1、2、3id
      this.searchParams.category1id = undefined;
      this.searchParams.category2id = undefined;
      this.searchParams.category3id = undefined;
    },
  },

  computed: {
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),

    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    // 获取search 数据
    getData() {
      // 派发
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      // 当属性值为undefined 时 就不会发送给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1id = undefined;
      this.searchParams.category2id = undefined;
      this.searchParams.category3id = undefined;
      // 地址栏也需要改：进行路由跳转
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      } else {
        this.$router.push({
          name: "search",
        });
      }
      this.getData();
    },
    // 删除 关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.$route.params.keyword = undefined;
      // 通知兄弟组件清空关键字
      this.$bus.$emit("clear");
      // 进行路由跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      } else {
        this.$router.push({ name: "search" });
      }
      this.getData();
    },
    //自定义事件回调
    trademarkInfo(params) {
      // 整理参数 品牌id 名称
      this.searchParams.trademark = `${params.tmId}:${params.tmName}`;
      this.getData();
    },
    // 删除品牌信息
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 收集平台属性地方
    attrInfo(attr, attrValue) {
      // 参数格式
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }

      // 再次发送请求
      this.getData();
    },
    // 删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      // 再次发送请求
      this.getData();
    },
    // 排序的操作
    changeOrder(flag) {
      //flag 标记 代表用户点击的是综合还是价格
      let originOrder = this.searchParams.order;
      // 最开始的状态
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      //准备一个新的 order 属性值
      let newOrder = "";
      if (originFlag === flag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;

      // 再次发送请求
      this.getData();
    },
    //自定义事件的回调函数 --- 获取当前第几页
    getPageNo(pageNo) {
      // 整理数据
      this.searchParams.pageNo = pageNo;

      this.getData();
    },
    // 加入购物车
    addShopcar() {},
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #0488f5;
                  color: #fff;
                }
              }
            }

            .nav-img {
              width: 15px;
              height: 15px;
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
