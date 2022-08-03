<template>
  <div>
    <ul>
      <li>
        <router-link to="/communication/event">
          <a :class="{ active: index == 1 }" @click="index = 1">event深入</a>
        </router-link>
      </li>
      <li>
        <router-link to="/communication/model">
          <a :class="{ active: index == 2 }" @click="index = 2">model深入</a>
        </router-link>
      </li>
      <li>
        <router-link to="/communication/sync">
          <a :class="{ active: index == 3 }" @click="index = 3"
            >属性修饰符sync</a
          >
        </router-link>
      </li>
      <li>
        <router-link to="/communication/attrs-listeners">
          <a :class="{ active: index == 4 }" @click="index = 4"
            >$attrs与$listeners</a
          >
        </router-link>
      </li>
      <li>
        <router-link to="/communication/children-parent">
          <a :class="{ active: index == 5 }" @click="index = 5"
            >$children与$parent</a
          >
        </router-link>
      </li>
      <li>
        <router-link to="/communication/scope-slot">
          <a :class="{ active: index == 6 }" @click="index = 6"
            >作用域插槽scope-slot</a
          >
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
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
ul {
  display: flex;
  li {
    margin-left: 20px;
    font-size: 20px;
  }
}
</style>