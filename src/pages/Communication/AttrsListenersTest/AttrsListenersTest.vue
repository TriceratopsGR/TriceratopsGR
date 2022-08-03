<template>
  <div>
    <span>自定义带Hover提示的按钮</span>

    <!-- <el-button type="primary" icon="el-icon-plus" size="mini">添加</el-button> -->

    <!-- 吧这个组件进行二次封装 -->
    <!-- 当用户在使用我们封装的按钮的时候，需要向HintButton组件传递相应的参数 -->
    <HintButton
      type="success"
      icon="el-icon-plus"
      size="mini"
      title="提示按钮"
      @click="handler"
    />
  </div>
</template>

<script>
import HintButton from "./HintButton";
export default {
  name: "ListenersTest",
  components: {
    HintButton,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    handler() {
      alert("6666");
    },
  },
};
</script>

<style lang="less" scoped>
</style>