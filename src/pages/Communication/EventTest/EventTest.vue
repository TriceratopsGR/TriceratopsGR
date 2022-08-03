<template>
  <div>
    <h1>EventTest组件</h1>

    <!-- 原生DOM绑定系统事件 -->
    <button @click="handler">原生DOM绑定原生事件</button>

    <!-- Event1组件：Event1非原生DOM节点，而绑定的click事件并非原生DOM事件，而是自定义事件
        @click.native 可以吧自定义事件变为原生DOM事件
        当前原生DOMclick事件，其实是给子组件的根节点绑定了事件---利用到事件委派
     -->
    <Event1 @click.native="handler1"></Event1>

    <!-- 原生DOM绑定自定义事件
        给原生ODM绑定自定义事件没有任何意义，因为没有办法触发$emit函数
         -->
    <!-- <button @xxx="handler2">原生DOM绑定自定义事件</button> -->

    <!-- 组件标签 -->
    <Event2 @click="handler2" @xxx="xxxHandler"></Event2>
  </div>
</template>

<script>
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";
export default {
  name: "EventTest",
  components: {
    Event1,
    Event2,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 原生DOM botton 的事件回调
    handler(event) {
      console.log("单机事件");
      console.log(event);
    },
    // 组件事件回调
    handler1(event) {
      console.log("Event1", event);
    },
    // 原生DOM绑定自定义事件

    // 组件 event自定义事件回调
    handler2(event) {
      console.log(event);
    },
    // emit事件
    xxxHandler(params) {
      console.log(params);
    },
  },
};
</script>

<style lang="less" scoped>
</style>