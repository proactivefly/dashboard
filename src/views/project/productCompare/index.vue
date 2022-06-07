<template>
  <div class="wrapper">
    <div class="title">
      <span>近一年每月测试环境与生产环境bug比值</span>
    </div>
    <Chart :cdata="chartInfo" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import Chart from './draw';
import { bugTestVSprod } from '@/api/index';
import { useTime } from '@/hooks/timeHooks';
export default defineComponent({
  components: {
    Chart
  },
  setup() {
    const chartInfo = reactive({});
    const { getCurrentYearRange } = useTime();
    const { startTime, endTime, months } = getCurrentYearRange();
    onMounted(() => {
      bugTestVSprod({ after_date: startTime, before_date: endTime }).then((res: any) => {
        Object.assign(chartInfo, { xData: months, yData: res.values });
      });
    });
    return {
      chartInfo
    };
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;
  height: 315px;
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
