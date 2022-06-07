<template>
  <SModal
    title="本月各产品线生产环境与测试环境bug对比"
    :visible="showDialog"
    @cancel="handleCancel"
    :width="1000"
    :footer="null"
  >
    <div class="content">
      <CompareChat :cdata="chartInfo" />
    </div>
  </SModal>
</template>
<script setup lang="ts">
import { nextTick, ref, defineExpose, reactive } from 'vue';
import CompareChat from './compareChat';
const showDialog = ref(false);
const chartInfo = reactive({});
var temp = {
  yData1: [0, 5, 0, 0, 0, 0, 0, 0],
  yData2: [10, 59, 0, 42, 12, 0, 0, 45]
};
defineExpose({
  clickModal
});
function clickModal(item) {
  console.log(item);
  showDialog.value = true;
  nextTick(() => {
    Object.assign(chartInfo, temp);
  });
}
function handleCancel() {
  showDialog.value = false;
}
</script>
<style lang="scss" scoped>
.content {
  padding: 0px 30px 10px 30px;
}
</style>
