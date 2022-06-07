<template>
  <div class="wrapper">
    <div class="title">
      <span>各产品线近一年上线总需求数</span>
    </div>
    <Chart :cdata="chartInfo" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { getDemandTotal } from '@/api/index';
import Chart from './chart';
import { useTime } from '@/hooks/timeHooks';
import { useGlobal } from '@/store/modules/global';
export default defineComponent({
  components: {
    Chart
  },
  setup() {
    const globalState = useGlobal();
    const chartInfo = reactive({});
    const { getCurrentYearRange } = useTime();
    const { startTime, endTime, months } = getCurrentYearRange();
    //计算
    const calcTotal = (arr) => {
      globalState.setDemandTotalYear(arr); //近一年
      globalState.setDemandTotalMonth(arr[arr.length - 1]); //近一月
    };
    onMounted(() => {
      getDemandTotal({ after_date: startTime, before_date: endTime, type: 'DONE' }).then(
        (res: any) => {
          calcTotal(res.values);
          Object.assign(chartInfo, { xData: months, yData: res.values });
        }
      );
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
  height: 290px;
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
