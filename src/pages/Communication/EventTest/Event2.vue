<template>
  <div>
    <span>Event2</span>
    <button @click="$emit('click', '自定义事件click')">自定义事件emit</button>

    <button @click="$emit('xxx', '自定义事件xxx')">xxx事件</button>
  </div>
</template>

<script>
export default {
  name: "Event2",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
</style>