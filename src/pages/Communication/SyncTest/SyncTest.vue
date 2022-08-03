<template>
  <div>
    小明的爸爸现在有{{ money }}元

    <h2>不使用sync修饰符</h2>
    <!-- 
      :money 父组件给子组件传递props
      @update:money 给子组件绑定的自定义事件只不过名字叫做update:money
      目前现在这种操作，起始和v-model很相似，可以实现父子组件数据同步
     -->
    <Child :money="money" @update:money="money = $event" />
    <!-- <Child v-model="money" /> -->
    <h2>使用sync修饰符</h2>
    <!-- 
      :money.sync:第一，父组件给字符串传递props money
      第二  给当前子组件绑定了一个自定义事件，  update:money
    -->
    <Child2 :money.sync="money" />
  </div>
</template>

<script>
import Child from "./Child.vue";
import Child2 from "./Child2.vue";

export default {
  name: "SyncTest",
  components: {
    Child,
    Child2,
  },
  data() {
    return {
      money: 10000,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
</style>