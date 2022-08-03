<template>
  <div>
    <h2>儿子小明：有存款：{{ money }}</h2>

    <button @click="getMoney(50)">给BABA钱：50</button>
  </div>
</template>

<script>
import myMixin from "@/pages/Communication/ChildrenParentTest/myMixin/myMixin";
export default {
  name: "OnlineRetailersSon",
  mixins: [myMixin],
  data() {
    return {
      money: 30000,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>