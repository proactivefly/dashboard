<template>
  <div class="wrapper">
    <div class="title">
      <span>近一年上线需求对比</span>
    </div>
    <Chart />
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
$height: 405px;
.wrapper {
  padding: 16px;
  height: $height;
  .title {
    margin-top: 8px;
    span {
      height: 20px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
