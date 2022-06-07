<template>
  <SModal
    title="本月质量总结"
    :visible="showDialog"
    @cancel="handleCancel"
    :width="1385"
    :footer="null"
  >
    <div class="content">
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
    </div>
  </SModal>
</template>
<script setup lang="ts">
import { nextTick, ref, defineExpose } from 'vue';
const showDialog = ref(false);
const table = ref(null);
defineExpose({
  clickModal
});
function clickModal(item) {
  console.log(item);
  showDialog.value = true;
  // 滚动到顶部
  nextTick(() => {
    table.value.scrollTop = 0;
  });
}
function handleCancel() {
  showDialog.value = false;
}
</script>
<style lang="scss" scoped>
.content {
  padding: 0px 80px 80px 80px;
  .table {
    overflow-y: scroll;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid #0051a2;
    border-radius: 6px;
    max-height: 450px;
    .row {
      padding: 35px 75px;
      font-size: 25px;
      font-weight: 400;
      border-bottom: 1px solid #0051a2;
      color: #ffffff;
    }
  }
}
</style>
