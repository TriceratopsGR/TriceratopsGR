<template>
  <div ref="mySwiper" class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from "swiper";
export default {
  name: "carousel",
  props: ["list"],
  data() {
    return {};
  },

  mounted() {},
  watch: {
    list: {
      // 不管你数据有没有变化 立即监听一次
      immediate: true,
      handler() {
        // console.log("aaa");
        // this.$nextTick 在下次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,
            effect: "flip",

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          });
        });
      },
    },
  },

  methods: {},
};
</script>

<style lang="less" scoped>
</style>