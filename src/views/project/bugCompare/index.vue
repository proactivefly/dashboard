<template>
  <div class="wrapper">
    <div class="title">
      <span>近一年线上bug月对比</span>
    </div>
    <Chart :cdata="chartInfo" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import Chart from './chart';
import { getBugTotal } from '@/api/index';
import { useTime } from '@/hooks/timeHooks';
const chartInfo = reactive({});
const { getCurrentYearRange } = useTime();
const { startTime, endTime, months } = getCurrentYearRange();
onMounted(() => {
  getBugTotal({ after_date: startTime, before_date: endTime }).then((res: any) => {
    Object.assign(chartInfo, { xData: months, yData: res.values });
  });
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;
  height: 283px;
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
