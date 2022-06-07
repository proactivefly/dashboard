<template>
  <SModal
    title="开发人员信息表"
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
            <div class="key">本月提交代码数</div>
            <div class="value">{{ userInfo.codeDefect }}</div>
          </div>
          <div class="desc-item">
            <div class="key">本月本人缺陷密度</div>
            <div class="value">{{ userInfo.codeDefect }} %</div>
          </div>
          <div class="desc-item">
            <div class="key">本月本产品线缺陷密度</div>
            <div class="value">{{ userInfo.productDefect }} %</div>
          </div>
        </div>
      </Border1>

      <!-- trend -->
      <Border1 class="item trand">
        <div>
          <div class="desc-item"><div class="key">近一年内每月提交代码趋势</div></div>
          <div class="chat-w">
            <ChartCommit :cdata="chartData" />
          </div>
        </div>
      </Border1>

      <!-- defect -->
      <Border1 class="item defect">
        <div>
          <div class="desc-item">
            <div class="key">
              近一年内每月本人缺陷密度趋势 /<br />
              近一年内每月本产品线缺陷密度趋势
            </div>
          </div>
          <div class="chat-w">
            <ChartCodeDefect :cdata="chartData1" />
          </div>
        </div>
      </Border1>
    </div>
  </SModal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, defineExpose } from 'vue';
import ChartCommit from './chartCommit';
import ChartCodeDefect from './chartCodeDefect';
const showDialog = ref(false);
defineExpose({
  clickModal
});

// chart数据
const chartData = reactive({ xData: [], yData: [] });
const chartData1 = reactive({ xData: [], yData1: [], yData2: [] });
const userInfo = reactive({
  name: '王旭',
  codeTotal: 123,
  codeDefect: 8,
  productDefect: 9
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
  nextTick(() => {
    Object.assign(chartData, {
      xData: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
      yData: [45, 20, 101, 134, 90, 230, 210]
    });

    Object.assign(chartData1, {
      xData: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
      yData1: [45, 20, 101, 134, 90, 230, 210],
      yData2: [25, 30, 901, 100, 34, 20, 80]
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
