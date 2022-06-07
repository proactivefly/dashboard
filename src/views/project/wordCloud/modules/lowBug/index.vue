<template>
  <SModal
    title="开发自测及LowBug情况"
    :visible="showDialog"
    @cancel="handleCancel"
    :width="1635"
    :footer="null"
  >
    <div class="content">
      <div class="content flex-row-center">
        <Border1 class="item">
          <p class="title">2022年4月开发自测情况</p>
          <div class="table-w">
            <div class="table">
              <div class="table-left">
                <div class="th">项目名称</div>
                <div class="th">测试用例条数目</div>
                <div class="th">开发自测用例条目数</div>
                <div class="th">开发自测通过率</div>
                <div class="th">测试第一轮用例通过率</div>
                <div class="th">提测后, 第一轮测试发现bug数</div>
              </div>
              <div class="table-body-conainer">
                <div class="table-body">
                  <div class="row flex-row-start">
                    <div class="td">智农</div>
                    <div class="td">惠农</div>
                    <div class="td">助手</div>
                    <div class="td">大师</div>
                    <div class="td">中台</div>
                    <div class="td">AI</div>
                    <div class="td">种子</div>
                    <div class="td">科研平台</div>
                  </div>
                  <div class="row flex-row-start" v-for="item in 5" :key="item">
                    <div class="td">12</div>
                    <div class="td">23</div>
                    <div class="td">34</div>
                    <div class="td">454</div>
                    <div class="td">2332</div>
                    <div class="td">23</div>
                    <div class="td">2323</div>
                    <div class="td">344</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Border1>

        <Border1 class="item">
          <div>
            <p class="title">近一年上线需求数对比</p>
            <div class="chart-wrapper">
              <CompareChat :cdata="chartInfo" />
            </div>
          </div>
        </Border1>
      </div>
    </div>
  </SModal>
</template>
<script setup lang="ts">
import { nextTick, ref, defineExpose, reactive } from 'vue';
import CompareChat from './compareChat';
const showDialog = ref(false);
const chartInfo = reactive({});
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
defineExpose({
  clickModal
});
function clickModal(item) {
  console.log(item);
  showDialog.value = true;
  nextTick(() => {
    Object.assign(chartInfo, result);
  });
}
function handleCancel() {
  showDialog.value = false;
}
</script>
<style lang="scss" scoped>
$borderColor: #074987;
.content {
  height: 500px;
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

    .table {
      line-height: normal;
      display: flex;
      background: linear-gradient(158deg, #23515d, #0d142d);
      flex-direction: row;
      align-items: stretch;
      .table-left {
        width: 303px;
        height: 367px;
        .th {
          border: 1px solid #074987;
          border-bottom: none;
          font-size: 23px;
          color: #48c5f5;
          height: 57px;
          display: flex;
          font-weight: bold;
          flex-direction: row;
          align-items: center;
          padding-left: 24px;
          &:last-child {
            border-bottom: 1px solid #074987;
            height: 86px;
          }
        }
      }

      .table-body-conainer {
        width: 426px;
        height: 371px;
        border-bottom: 1px solid #074987;
        overflow-x: scroll;
        .table-body {
          width: 800px;
          .row {
            flex-direction: row;
            .td {
              padding-left: 12px;
              height: 57px;
              display: flex;
              flex-direction: row;
              align-items: center;
              width: 100px;
              border: 1px solid #074987;
              border-right: none;
              border-bottom: none;
              font-size: 23px;
              color: #ffffff;
              &:last-child {
                width: 200px;
                border-right: 1px solid #074987;
              }
              &:first-child {
                border-left: none;
              }
            }
            &:last-child {
              .td {
                border-bottom: 1px solid #074987;
                height: 67px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
