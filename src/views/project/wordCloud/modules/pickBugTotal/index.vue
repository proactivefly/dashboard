<template>
  <SModal
    title="本月已上线需求中每人提交的Bug数"
    :visible="showDialog"
    @cancel="handleCancel"
    :width="1700"
    :footer="null"
  >
    <div class="content flex-row-start-start">
      <div class="item" v-for="(item, index) in 4" :key="index">
        <CircleChat :cdata="chartInfo1" />
      </div>
    </div>
  </SModal>
</template>
<script setup lang="ts">
import { nextTick, ref, defineExpose, reactive } from 'vue';
import CircleChat from './circleChat';
const showDialog = ref(false);
const chartInfo1 = reactive({
  title: '助手bug分布情况',
  data: []
});
defineExpose({
  clickModal
});
function clickModal(item) {
  console.log(item);
  showDialog.value = true;
  nextTick(() => {
    chartInfo1.data = [
      { value: 1048, name: '王棒' },
      { value: 735, name: '李双清' },
      { value: 580, name: '陈荣鹏' },
      { value: 484, name: '何晶' },
      { value: 300, name: '李金娥' },
      { value: 100, name: '路长远' },
      { value: 340, name: '王金波' }
    ];
  });
}
function handleCancel() {
  showDialog.value = false;
}
</script>
<style lang="scss" scoped>
.content {
  height: 450px;
  .item {
    flex: 1;
    height: 400px;
  }
}
</style>
s
