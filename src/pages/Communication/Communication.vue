<template>
  <div>
    <ul>
      <li :class="{ active: index == 1 }" @click="index = 1">
        <router-view to="/communication/event"> $event </router-view>
      </li>
      <li :class="{ active: index == 2 }" @click="index = 2">
        <router-view to="/communication/model"> model </router-view>
      </li>
      <li :class="{ active: index == 3 }" @click="index = 3">
        <router-view to="/communication/sync"> sync </router-view>
      </li>
      <li :class="{ active: index == 4 }" @click="index = 4">
        <router-view to="/communication/attrs-listeners">
          attrs-listeners
        </router-view>
      </li>
      <li :class="{ active: index == 5 }" @click="index = 5">
        <router-view to="/communication/children-parent">
          children-parent
        </router-view>
      </li>
      <li :class="{ active: index == 6 }" @click="index = 6">
        <router-view to="/communication/scope-slot"> scope-slot </router-view>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Communication",

  data() {
    return {
      index: 1,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.active {
  color: pink;
}
</style>