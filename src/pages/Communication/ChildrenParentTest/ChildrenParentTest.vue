<template>
  <div>
    <h2>BABA有存款：{{ money }}</h2>
    <button @click="jieXM(100)">找小明借钱100</button>
    <br />
    <button @click="jieXM(150)">找小红借钱150</button>
    <br />
    <button @click="jieFromAll(200)">找所以孩子借钱200</button>

    <br />
    <Son ref="xm" />
    <br />
    <Daughter ref="xh" />
  </div>
</template>

<script>
import Son from "./Son.vue";
import Daughter from "./Daughter.vue";
export default {
  name: "ParentTest",
  components: {
    Daughter,
    Son,
  },
  data() {
    return {
      money: 1000,
    };
  },
  mounted() {},
  methods: {
    // 向小明借钱
    jieXM(money) {
      // 父亲累加
      this.money += money;

      // 1、 ref 能获取真实的DOM 节点
      console.log(this.$refs.xm);
      money === 100
        ? (this.$refs.xm.money -= money)
        : (this.$refs.xh.money -= money);

      // 2、
    },
    // 全部一共借200
    jieFromAll(money) {
      this.money += 2 * money;

      //组件实例的属性，可以获取当前组件的子组件放回的是一个数组
      console.log(this.$children);
      this.$children.forEach((r) => {
        r.money -= money;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>