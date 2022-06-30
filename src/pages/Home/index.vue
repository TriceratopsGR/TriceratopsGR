<template>
  <div>
    <!-- 三级联动的组件： 已经注册为全局组件 -->
    <type-nav />
    <!--列表-->
    <list-container />
    <!--今日推荐-->
    <recommend />
    <!-- 商品排行 -->
    <rank />
    <!-- 猜你喜欢 -->
    <like />
    <!--楼层-->
    <floot v-for="floor in floorList" :key="floor.id" :list="floor" />
    <!--商标-->
    <brand />
  </div>
</template>

<script>
// 引入其他的组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floot from "@/pages/Home/Floot";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

// 辅助函数
// import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floot,
    Brand,
  },

  data() {
    return {};
  },
  computed: {},

  mounted() {
    // 派发 action  ,获取floor数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
