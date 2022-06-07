<template>
  <div id="project" ref="appRef">
    <div class="bg">
      <a-button @click="changeNum">改变数字</a-button>
      <p>{{ globalData.num }}——————————{{ num }}</p>
      <DigitalFlop :config="config" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive, nextTick, watch } from 'vue';
import useDraw from '@/utils/useDraw';
import { DigitalFlop } from '@kjgl77/datav-vue3';
import { useGlobal } from '@/store/modules/global';
import { storeToRefs } from 'pinia';
const globalData = useGlobal();
var a = '我是a';
const { num } = storeToRefs(useGlobal());
const config = reactive({
  number: [num.value],
  span: a,
  style: {
    fontSize: 150,
    fill: '#fff',
    fontFamily: 'PIXymbolsDigitClocksW90-Bd',
    textShadow: '0 0 25px #13aaec'
  }
});

function changeNum() {
  globalData.num++;
  console.log('改变之后globalData', globalData.num);
  a = '我是B';
  console.log(config.number[0]);
  console.log(config.span);
  // config.number[0] = globalData.num;
}
// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
// 生命周期
onMounted(() => {
  windowDraw();
  calcRate();
});
onUnmounted(() => {
  unWindowDraw();
});

watch(
  config,
  () => {
    console.log('config变化了');
  },
  { deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
#project {
  color: #d3d6dd;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  .bg {
    width: 100%;
    height: 100%;
    padding: 30px;
  }
}
</style>
<style lang="scss" scoped>
.content {
  height: 450px;
  .item {
    flex: 1;
    height: 400px;
  }
}

p {
  font-size: 50px;
}
</style>
