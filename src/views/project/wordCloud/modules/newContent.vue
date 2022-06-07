<template>
  <SModal
    title="本月上线内容"
    :visible="showDialog"
    @cancel="handleCancel"
    :width="1510"
    :footer="null"
  >
    <div class="content">
      <STable
        ref="tableDom"
        :columns="tableInfo.columns"
        :data="tableInfo.tableData"
        :maxHeight="500"
      ></STable>
    </div>
  </SModal>
</template>
<script setup lang="ts">
import { nextTick, ref, defineExpose, reactive } from 'vue';
import STable from '@/components/table/index.vue';
const showDialog = ref(false);
const tableDom = ref(null);
const tableInfo = reactive({
  columns: [
    { name: '上线时间', width: 175, key: 'time' },
    { name: '产品', width: 223, key: 'product' },
    { name: '版本', width: 168, key: 'version' },
    { name: '更新内容', width: 660, key: 'content' }
  ],
  tableData: []
});
for (let i = 0; i < 5; i++) {
  tableInfo.tableData.push({
    time: '4月11日',
    product: '大师',
    version: '1.1',
    id: i,
    content:
      '1. 在拜访中、有意向、确定方案、商务沟通、等待双签、已双签状态添加签约面积，预计销售金额、合同总金额、签约服务面积、合同总金额字段2. 不同业务场景计算上线签约面积'
  });
}
defineExpose({
  clickModal
});
function clickModal(item) {
  showDialog.value = true;
  // 滚动到顶部
  nextTick(() => {
    tableDom.value.scrollTop();
  });
}
function handleCancel() {
  showDialog.value = false;
}
</script>
<style lang="scss" scoped>
.content {
  padding: 0px 80px 80px 80px;
}
</style>
