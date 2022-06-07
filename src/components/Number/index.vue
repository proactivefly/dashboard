<template>
  <div
    class="wrapper"
    :style="{ width: props.config.width + 'px', height: props.config.height + 'px' }"
  >
    <!-- 左边 -->
    <div
      class="item l"
      :style="{
        width: widthPercentUnit * 3.4 + 'px',
        height: heightPercentUnit * 8.1 + 'px',
        left: -(widthPercentUnit * 3.5) * 0.02 + 'px',
        top: heightPercentUnit * 8.2 * 0.1 + 'px',
        transform: 'skewY(15deg)'
      }"
    >
      <div class="inner">
        <div
          class="name"
          :style="{
            fontSize: heightPercentUnit * 8.1 * 0.092 + 'px',
            paddingRight: widthPercentUnit * 3.4 * 0.06 + 'px'
          }"
        >
          {{ props.config.leftInfo.name }}
        </div>
        <DigitalFlop
          :config="config1"
          class="num"
          :style="{
            width: widthPercentUnit * 3.4 + 'px',
            height: heightPercentUnit * 8.1 * 0.175 + 'px'
          }"
        />
      </div>
    </div>

    <!-- 中间 -->
    <div
      class="item c"
      :style="{
        width: widthPercentUnit * 4.5 + 'px',
        height: heightPercentUnit * 8.1 + 'px',
        bottom: '-2px'
      }"
    >
      <div class="inner">
        <div
          class="name"
          :style="{
            fontSize: widthPercentUnit * 4.6 * 0.08 + 'px',
            marginTop: heightPercentUnit * 8.1 * 0.13 + 'px'
          }"
        >
          {{ props.config.centerInfo.name }}
        </div>
        <DigitalFlop
          :config="config2"
          class="num"
          :style="{
            width: widthPercentUnit * 4.5 + 'px',
            height: heightPercentUnit * 8.1 * 0.3 + 'px'
          }"
        />
      </div>
    </div>
    <!-- 右边 -->
    <div
      class="item r"
      :style="{
        width: widthPercentUnit * 3.4 + 'px',
        height: heightPercentUnit * 8.1 + 'px',
        right: -(widthPercentUnit * 3.5) * 0.02 + 'px',
        top: heightPercentUnit * 8.2 * 0.1 + 'px',
        transform: 'skewY(-15deg)'
      }"
    >
      <div class="inner">
        <div
          class="name"
          :style="{
            fontSize: heightPercentUnit * 8.1 * 0.092 + 'px',
            paddingLeft: widthPercentUnit * 3.4 * 0.06 + 'px'
          }"
        >
          {{ props.config.rightInfo.name }}
        </div>
        <DigitalFlop
          :config="config3"
          class="num"
          :style="{
            width: widthPercentUnit * 3.4 + 'px',
            height: heightPercentUnit * 8.1 * 0.175 + 'px'
          }"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { reactive, defineProps, watch } from 'vue';
import { DigitalFlop } from '@kjgl77/datav-vue3';
const props = defineProps({
  config: {
    type: Object,
    default: () => {
      return {
        width: 'auto',
        height: 'auto',
        leftInfo: { name: '左侧标题', value: 0 },
        centerInfo: { name: '左侧标题', value: 0 },
        rightInfo: { name: '左侧标题', value: 0 }
      };
    }
  }
});

let widthPercentUnit = computed(() => {
  return props.config.width / 10;
});
let heightPercentUnit = computed(() => {
  return props.config.height / 10;
});
const config1 = reactive({
  number: [0],
  style: {
    fontSize: props.config.height * 0.15,
    fill: '#fff',
    fontFamily: 'PIXymbolsDigitClocksW90-Bd',
    textShadow: '0 0 25px #13aaec'
  }
});
const config2 = reactive({
  number: [0],
  style: {
    fontSize: props.config.height * 0.18,
    fill: '#fff',
    fontFamily: 'PIXymbolsDigitClocksW90-Bd',
    textShadow: '0 0 25px #13aaec'
  }
});
const config3 = reactive({
  number: [0],
  style: {
    fontSize: props.config.height * 0.15,
    fill: '#fff',
    fontFamily: 'PIXymbolsDigitClocksW90-Bd',
    textShadow: '0 0 25px #13aaec'
  }
});

watch(
  props,
  (val) => {
    config1.number[0] = val.config.leftInfo.value;
    config2.number[0] = val.config.centerInfo.value;
    config3.number[0] = val.config.rightInfo.value;
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  text-shadow: 0 0 25px #13aaec;
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-size: 100% 100%;
    background-image: url('../../assets/project/cn.png');
    text-align: center;
    .name {
      font-weight: 400;
      color: #fff;
      margin: 10px 0px 10px 0px;
    }
    .num {
      font-family: 'PIXymbolsDigitClocksW90-Bd';
    }
  }
}
</style>
