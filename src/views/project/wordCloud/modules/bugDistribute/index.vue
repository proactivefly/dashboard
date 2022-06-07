<template>
  <SModal
    title="近一年测试环境bug情况分布"
    :visible="showDialog"
    @cancel="handleCancel"
    :width="1635"
    :footer="null"
  >
    <div class="content flex-row-center">
      <Border1 class="item">
        <p class="title">近一年每月Bug数整体情况分布</p>
        <div class="chart-wrapper">
          <BugChat :cdata="bugChartInfo" />
        </div>
      </Border1>

      <Border1 class="item">
        <div>
          <p class="title">近一年每月Bug数产品线情况分布</p>
          <div class="chart-wrapper">
            <CompareChat :cdata="chartInfo" />
          </div>
        </div>
      </Border1>
    </div>
  </SModal>
</template>
<script setup lang="ts">
import { nextTick, ref, defineExpose, reactive } from 'vue';
import CompareChat from './compareChat';
import BugChat from './bugChat';
const showDialog = ref(false);
const chartInfo = reactive({});
const bugChartInfo = reactive({});
var result = {
  xData: ['5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月'],
  zhinong: [2, 3, 4, 1, 2, 3, 4, 1, 3, 4, 5, 6],
  huinong: [2, 3, 4, 4, 9, 7, 4, 1, 3, 4, 5, 6],
  dashi: [2, 3, 4, 1, 2, 3, 4, 6, 3, 9, 5, 6],
  zhushou: [2, 4, 4, 7, 2, 12, 4, 8, 3, 4, 5, 6],
  zhongtai: [2, 3, 4, 9, 2, 3, 4, 1, 3, 4, 5, 6],
  ai: [2, 3, 4, 3, 4, 5, 4, 9, 3, 4, 5, 6],
  zhongzi: [2, 5, 4, 1, 6, 3, 7, 7, 3, 5, 6],
  keyan: [10, 3, 1, 1, 3, 2, 4, 1, 3, 4, 5, 3]
};
var result1 = {
  yData: [102, 33, 134, 123, 43, 52, 74, 12, 13, 55, 75, 93]
};
defineExpose({
  clickModal
});
function clickModal(item) {
  console.log(item);
  showDialog.value = true;
  nextTick(() => {
    Object.assign(chartInfo, result);
    Object.assign(bugChartInfo, result1);
  });
}
function handleCancel() {
  showDialog.value = false;
}
</script>
<style lang="scss" scoped>
.item {
  flex: 1;
  height: 485px;
  padding: 27px 17px 17px 17px;
  &:first-child {
    margin-right: 40px;
  }
  .title {
    font-size: 25px;
    color: #ffffff;
    margin-bottom: 27px;
    padding-left: 17px;
  }
}
</style>
