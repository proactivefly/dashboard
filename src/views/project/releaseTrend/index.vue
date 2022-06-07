<template>
  <div class="wrapper">
    <div class="inner">
      <div class="title">
        <span class="text">一年内产品总发版次数趋势</span>
      </div>
      <Chart :cdata="chartInfo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import Chart from './chart';
import { getReleaseTimes } from '@/api/index';
import { useTime } from '@/hooks/timeHooks';
const chartInfo = reactive({});
const { getCurrentYearRange } = useTime();
const { startTime, endTime, months } = getCurrentYearRange();
onMounted(() => {
  getReleaseTimes({ after_date: startTime, before_date: endTime }).then((res: any) => {
    Object.assign(chartInfo, { xData: months, yData: res.values });
  });
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 12px 16px 0px 16px;
  height: 300px;
  .inner {
    background-color: #080e18;
    height: 284px;
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
