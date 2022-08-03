<template>
  <ul>
    <li v-for="(item, idx) in todos" :key="idx">
      <!-- 使用作用域插槽 -->
      <!-- 子组件把数据回传个父组件 -->
      <slot :todo="item"> </slot>
      <!-- {{ item.text }} -->
    </li>
  </ul>
</template>

<script>
export default {
  name: "OnlineRetailersList",
  props: {
    todos: Array,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
</style>