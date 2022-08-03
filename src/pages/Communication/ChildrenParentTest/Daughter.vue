<template>
  <div>
    <h2>女儿小红：有存款：{{ money }}</h2>

    <br />
    <button @click="getMoney(100)">给BABA钱：50</button>
  </div>
</template>

<script>
import myMixin from "@/pages/Communication/ChildrenParentTest/myMixin/myMixin";
export default {
  name: "Daughter",
  mixins: [myMixin],
  data() {
    return {
      money: 20000,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>