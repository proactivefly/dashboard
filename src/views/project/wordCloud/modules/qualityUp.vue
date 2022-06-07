<template>
  <SModal
    title="本月质量总结"
    :visible="showDialog"
    @cancel="handleCancel"
    :width="1509"
    :footer="null"
  >
    <div class="content">
      <p class="tip">
        本月C端完成6次codeReview和6次项目复盘，B端完成1次复盘会和一次codereview，完成其它各端暂未做分析。
      </p>
      <Tabs v-model:activeKey="activeKey" type="card">
        <TabPane key="1" tab="B端">
          <div class="table" ref="table">
            <div class="row">
              1. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
            <div class="row">
              2. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
            <div class="row">
              3. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
            <div class="row">
              4. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
          </div>
        </TabPane>
        <TabPane key="2" tab="C端">
          <div class="table" ref="table">
            <div class="row">沃尔沃今儿我今儿就</div>
            <div class="row">
              2. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
            <div class="row">
              3. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
            <div class="row">
              4. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
          </div>
        </TabPane>
        <TabPane key="3" tab="中台">
          <div class="table" ref="table">
            <div class="row">沃尔沃今儿我今儿就</div>
            <div class="row">
              2. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
            <div class="row">
              3. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
            <div class="row">
              4. 本月发版内容，主要为大师补充协议、目标管理、ITS，助手线上订单、子公司数据迁移，智
              农370版本，监测诊断平台、撒配项目、水肥决策项目等。
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </SModal>
</template>
<script setup lang="ts">
import { nextTick, ref, defineExpose } from 'vue';
import { Tabs, TabPane } from 'ant-design-vue';
const showDialog = ref(false);
var activeKey = ref('1');
defineExpose({
  clickModal
});
function clickModal(item) {
  console.log(item);
  showDialog.value = true;
  // 滚动到顶部
  nextTick(() => {
    document.querySelector('.ant-tabs-content').scrollTop = 0;
  });
}
function handleCancel() {
  showDialog.value = false;
}
</script>
<style lang="scss" scoped>
.content {
  padding: 0px 60px 0px 60px;
  height: 500px;
  .tip {
    font-size: 25px;
    color: #ffffff;
  }
  :deep {
    .ant-tabs-nav {
      margin: 0px;
      .ant-tabs-tab {
        font-size: 23px;
        color: #ffffff;
        opacity: 0.25;
        &.ant-tabs-tab-active {
          height: 56px;
          opacity: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #0051a2;
          .ant-tabs-tab-btn {
            color: #ffffff;
          }
        }
      }
    }
    .ant-tabs-content {
      background-color: rgba(255, 255, 255, 0.05);
      height: 350px;
      overflow-y: scroll;
      border: 1px solid #0051a2;
      border-radius: 6px;
    }
  }
  .table {
    .row {
      padding: 35px 75px;
      font-size: 25px;
      line-height: normal;
      border-bottom: 1px solid #0051a2;
      color: #ffffff;
    }
  }
}
</style>
