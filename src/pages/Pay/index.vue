<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>
              {{ orderId }}
            </em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      payInfo: {},
      timer: null,
      // 支付的状态
      code: "",
    };
  },
  computed: {
    orderId() {
      return this.$route.query.orderId;
    },
  },
  mounted() {
    this.getPayInfo();
  },
  methods: {
    // 获取支付信息
    async getPayInfo() {
      const res = await this.$API.reqPayInfo(this.orderId);
      if (res.code === 200) {
        // 如果成功组件中要存储支付信息
        this.payInfo = res.data;
      } else {
        console.log(res);
      }
    },
    // 弹窗
    async open() {
      // 将wx codeUrl支付的生成二维码
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      console.log(url);
      this.$alert(`<img src=${url} />`, "请用微信支付", {
        dangerouslyUseHTMLString: true,
        center: true,
        // 是否显示 右上角X
        showClose: false,
        // 是否显示取消按钮
        showCancelButton: true,
        // 取消 确认 按钮的文字
        cancelButtonText: "支付遇见问题",
        confirmButtonText: "已支付成功",
        // 关闭弹出框回调
        // 点击的按钮  实例    done
        beforeClose: (type, instance, done) => {
          // type:区分取消|确认按钮
          // instance:当前组件实例
          // done:关闭弹出框的方法

          if (type == "cancel") {
            alert("请联系管理员");
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 关闭弹出框
            done();
          } else {
            // 判断是否真的支付了
            //开发人员 为了自己判断 这里判断先不要了
            // if (this.code == 200) {
            // 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 关闭弹出框
            done();
            // 跳转到下一页
            this.$router.push("/paysuccess");
            // }
          }
        },
      });

      // 你需要指定支付成功|失败信息
      // 支付成功，路由的跳转，如果支付失败，提示信息
      // 定时器没有，开启一个新的定时器
      if (!this.timer) {
        this.timer = setInterval(async () => {
          // 发请求 获取用户支付的状态
          let result = await this.$API.reqPayStatus(this.orderId);
          // 200支付成功
          if (result.code === 200) {
            // 第一步 清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 保存支付成功的code
            this.code = result.code;
            // 关闭弹出框
            this.$msgbox.close();
            // 跳转到下一页
            this.$router.push("/paysuccess");
          } else if (result.code === 205) {
            // 保存支付成功的code
            this.code = result.code;
            // 支付中
            console.log(result);
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>