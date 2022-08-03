<template>
  <div>
    <a :title="title">
      <!-- 将$attrs 中全部的属性都绑定到这个标签上面了  这个写法不能用:  -->
      <el-button v-bind="$attrs" :icon="icon" v-on="$listeners">添加</el-button>
    </a>
  </div>
</template>

<script>
export default {
  name: "index",
  // 不用props接收传递过来的值
  // 用 $attrs  属于组件自身的属性 可以获取到父组件传递过来的props数据  属性都是响应式数据
  // 对于子组件而言，父组件给的数据可以利用props接受，但是需要注意，如果子组件通过props接受的属性，在$attrs 属性当中是获取不到的
  // 就是说 props 接受了 $attrs 就接受不到了
  props: ["icon", "title"],

  // $listeners 可以获取父组件给子组件绑定的自定义事件
  // 也是组件自身的一个属性
  data() {
    return {};
  },

  mounted() {
    console.log(this.$attrs);
  },

  methods: {},
};
</script>

<style lang="less" scoped>
</style>