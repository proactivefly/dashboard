<template>
  <div class="wrapper">
    <div class="title">
      <span>本月千行代码缺陷密度</span>
    </div>
    <Chart :cdata="chartInfo" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import Chart from './chart';
import { getCodeDefectByProduct } from '@/api/index';
import { useTime } from '@/hooks/timeHooks';
const chartInfo = reactive({});
const { getCurrentMonthRange } = useTime();
const { monthStart, monthEnd } = getCurrentMonthRange();
onMounted(() => {
  getCodeDefectByProduct({ after_date: monthStart, before_date: monthEnd }).then((res: any) => {
    Object.assign(chartInfo, { yData: res.values, xData: res.category });
  });
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;
  height: 321px;
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
