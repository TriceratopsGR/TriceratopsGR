<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>

      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <!-- 1代表选中 0  -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheck && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改某一个产品的个数
    handler: throttle(async function (type, params, cart) {
      switch (type) {
        case "add":
          // 带个服务器变化的量
          params = 1;
          break;
        case "minus":
          //判断产品的个数大于一
          // 如果出现产品的个数小于等于1
          params = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // // 用户输入·1进来的数据 是非法的 就为0 不变
          // if (isNaN(params) || params < 1) {
          //   params = 0;
          // } else {
          //   //正常 情况 要取整 输入量 - 起始量
          //   params = parseInt(params) - cart.skuNum;
          // }
          params =
            isNaN(params) || params < 1 ? 0 : parseInt(params) - cart.skuNum;
          break;
      }

      try {
        //派发action 修改成功
        await this.$store.dispatch("addUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: params,
        });
        // 再一次获取最新的数据
        this.getData();
      } catch (error) {}
    }, 1000),
    // 删除购物车产品
    async deleteCartById(cart) {
      try {
        //删除成功再次发送请求
        await this.$store.dispatch("deleteCartBySkuId", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改选中状态
    async updateChecked(cart, event) {
      try {
        // 传参
        this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked: event.target.checked ? 1 : 0,
        });
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除全部选中的商品
    async deleteAllCheckedCart() {
      try {
        //派发一个action
        await this.$store.dispatch("deleteAllCheckedCart");

        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改全部产品选中
    async updateAllCartChecked(event) {
      console.log(event);
      try {
        let isChecked = event.target.checked ? 1 : 0;
        // 派发action
        await this.$store.dispatch("updateAllCartIsChecked", isChecked);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    //购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.cartPrice;
        }
      });
      return sum;
    },
    //判断底部复选框是否勾选【全部勾选，才勾选】
    isCheck() {
      // every 全部都为1放回就是true | false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>



<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  a {
    cursor: pointer;
    &:hover {
      color: aqua;
    }
  }

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;
          a {
            cursor: pointer;
            &:hover {
              color: pink;
            }
          }

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;
          .sindelet {
            color: red;
            &:hover {
              color: cornflowerblue;
            }
          }
          a {
            cursor: pointer;
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
        cursor: pointer;
        &:hover {
          color: cornflowerblue;
        }
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>