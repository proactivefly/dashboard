<template>
  <SModal
    title="测试人员信息表"
    :visible="showDialog"
    @cancel="handleCancel"
    :width="1385"
    :footer="null"
  >
    <div class="flex-row-start content">
      <Border1 class="item person-info">
        <div>
          <div class="desc-item">
            <div class="key">姓名</div>
            <div class="value">{{ userInfo.name }}</div>
          </div>
          <div class="desc-item">
            <div class="key">本月提交测试bug数</div>
            <div class="value">{{ userInfo.pickBUGNumber }}</div>
          </div>
          <div class="desc-item">
            <div class="key">本月完成测试用例数</div>
            <div class="value">{{ userInfo.caseNum }} %</div>
          </div>
        </div>
      </Border1>

      <!-- trend -->
      <Border1 class="item trand">
        <div>
          <div class="desc-item"><div class="key">近一年内每月提交bug趋势</div></div>
          <div class="chat-w">
            <ChartInfo :cdata="chartData" />
          </div>
        </div>
      </Border1>

      <!-- defect -->
      <Border1 class="item defect">
        <div>
          <div class="desc-item">
            <div class="key">近一年每月完成测试用例趋势</div>
          </div>
          <div class="chat-w">
            <ChartInfo :cdata="chartData1" />
          </div>
        </div>
      </Border1>
    </div>
  </SModal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, defineExpose } from 'vue';
import ChartInfo from './chart';
const showDialog = ref(false);
defineExpose({
  clickModal
});

// chart数据
const chartData = reactive({ xData: [], yData: [] });
const chartData1 = reactive({ xData: [], yData1: [] });
const userInfo = reactive({
  name: '王旭',
  pickBUGNumber: 123,
  caseNum: 8
});

function clickModal(item) {
  showDialog.value = true;
  getInfo(item);
}
function handleCancel() {
  showDialog.value = false;
}
function getInfo(item) {
  console.log(item);
  userInfo.name = item.name;
  nextTick(() => {
    Object.assign(chartData, {
      xData: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
      yData: [45, 20, 101, 134, 90, 230, 210],
      color: '#25F1FE',
      avgColor: 'red',
      name: '每月提交bug数',
      label: '提交bug数'
    });

    Object.assign(chartData1, {
      xData: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
      yData: [45, 20, 101, 134, 90, 230, 210],
      color: '#FDDC08',
      avgColor: '#EC42D6',
      name: '每月完成测试用例数',
      label: '完成测试用例数'
    });
  });
}
</script>
<style lang="scss" scoped>
.item {
  padding: 32px 29px;
  height: 440px;
  &:not(:last-child) {
    margin-right: 44px;
  }
  &.person-info {
    width: 290px;
  }
  &.trand {
    width: 461px;
    .chat-w {
      margin-top: 20px;
    }
  }
  &.defect {
    flex: 1;
  }
}
</style>
