<template>
  <SModal title="详情" :visible="showDialog" @cancel="handleCancel" :width="1200" :footer="null">
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
      { name: '更新内容', width: 660, key: 'content' },
    ],
    tableData: [],
  });
  defineExpose({
    clickModal,
  });
  function clickModal(item) {
    showDialog.value = true;
    // 滚动到顶部
    nextTick(() => {
      tableInfo.tableData = [
        {
          time: item[0],
          product: item[1],
          version: item[2],
          content: item[3],
        },
      ];
    });
  }
  function handleCancel() {
    showDialog.value = false;
  }
</script>
<style lang="scss" scoped>
  .content {
    padding: 0px 80px 80px 80px;
    height: 150px;
  }
</style>
