<template>
  <!-- 分页器 -->
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>

    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <span
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      @click="$emit('getPageNo', page)"
    >
      <button
        v-if="page >= startNumAndEndNum.start"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </span>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>

    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "pagination",
  // 父组件传递给字符串的数据：当前页、每一页展示多少条数据、数据总个数、连续页码数
  props: ["pageNo", "pageSize", "total", "continues"],

  data() {
    return {};
  },
  computed: {
    //一共有多少页
    totalPage() {
      // console.log(Math.ceil(this.total / this.pageSize));
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
      //
    },
    // 计算出连续的页码的起始数字 与 结束数字
    // 至少有五页数
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量 存储 开始结束
      let start = 0;
      let end = 0;
      // 至少有五页数 出现不正常的现象
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 大于五页
        // 开始
        start = pageNo - parseInt(continues / 2);
        // 结束
        end = pageNo + parseInt(continues / 2);

        // 把出现不正常的现象 【start数字出现0|负数】纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          // 总共就continues个数 你要保留第一位 所有加一
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .active {
    background-color: skyblue;
  }
}
</style>