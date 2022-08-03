<template>
  <div>
    <!-- v-model属于组件通信的一种 -->
    <span>v-model的深入</span>
    <input type="text" v-model="msg" />
    <span>{{ msg }}</span>
    <hr />
    <h2>v-model实现的原理</h2>
    <!-- $event输入框改变时 回调 -->
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span>{{ msg }}</span>

    <!-- 深入学习v-model：实现父子组件数据同步（实现父子组件通信） -->
    <hr />
    <!-- :value到底是什么？
          这可是一个props，父子组件通信

          $emit自定义事件
     -->
    <CustomInput :value="msg" @input="msg = $event" />
    <!-- 效果一样 -->
    <CustomInput v-model="msg" />
  </div>
</template>

<script>
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",
  components: {
    CustomInput,
  },
  data() {
    return {
      msg: "111",
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
</style>