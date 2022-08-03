export default {
    // 对外暴露的对象，可以放置组件重复JS业务逻辑
    methods: {
        // 儿子给爸爸钱
        getMoney(money) {
          // 儿子钱自减
          this.money -= money;
          // 子组件获取父组件
          // this.$parent 属性获取到某一个组件父组件，可以操作父组件的数据与方法
          this.$parent.money += money;
        },
    },
    
}