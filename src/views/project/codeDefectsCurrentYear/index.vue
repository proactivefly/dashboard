<template>
  <div class="wrapper">
    <div class="inner">
      <div class="title">
        <span class="text">近一年内产品线千行代码缺陷密度</span>
      </div>
      <Chart />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chart from './chart/index';
export default defineComponent({
  components: {
    Chart
  }
});
</script>

<style lang="scss" scoped>
$height: 273px;
.wrapper {
  padding: 12px 16px 0px 16px;
  height: $height;
  .inner {
    height: $height - 30px;
    &:before {
      content: '';
      display: table;
    }
    .title {
      margin-top: 10px;
      .text {
        height: 20px;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
}
</style>
