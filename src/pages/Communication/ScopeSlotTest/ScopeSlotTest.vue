<template>
  <div>
    <h2>效果一： 显示10000列表，已完成的TOOOO为绿色</h2>
    <List :todos="todos">
      <!-- 子组件决定不了结构与外观 -->
      <template slot-scope="todo">
        <span :style="{ color: todo.todo.isUse ? 'green' : 'pink' }">
          {{ todo.todo.text }}
        </span>
      </template>
    </List>
    <hr />

    <h2>效果二： 显示10000列表，带序号，已完成的TOOOO为蓝绿搭配</h2>
    <List1 :todos="todos">
      <!-- 子组件决定不了结构与外观 -->
      <!-- 解构时 k v 一致-->
      <template slot-scope="{ todo, $index }">
        <span :style="{ color: todo.isUse ? 'pink' : 'purple' }">
          {{ $index }} ----->
          {{ todo.text }}
        </span>
      </template>
    </List1>
  </div>
</template>

<script>
import List from "./List.vue";
import List1 from "./List1.vue";
export default {
  name: "OnlineRetailersScopeSlotTest",

  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isUse: false },
        { id: 2, text: "BBB", isUse: true },
        { id: 3, text: "CCC", isUse: false },
        { id: 4, text: "DDD", isUse: false },
      ],
    };
  },
  components: {
    List,
    List1,
  },
};
</script>

<style lang="less" scoped>
span {
  font-size: 22px;
}
</style>
