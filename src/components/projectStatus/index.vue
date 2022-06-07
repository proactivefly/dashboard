<template>
  <div
    class="wrapper"
    :style="{
      width: props.config.width + 'px',
      height: props.config.height + 'px'
    }"
  >
    <div
      class="title"
      :style="{
        fontSize: props.config.height * 0.0925 + 'px'
      }"
    >
      {{ props.config.title }}
    </div>
    <div class="container">
      <div
        class="item i1"
        :style="{
          width: props.config.width * 0.405 + 'px',
          height: props.config.height * 1.32 + 'px'
        }"
      >
        <span
          class="num"
          :style="{
            fontSize: props.config.height * 0.0925 + 'px',
            marginTop: props.config.height * 0.507 + 'px'
          }"
          >{{ props.config.numbers[0] }}</span
        >
      </div>
      <div
        class="item i2"
        :style="{
          width: props.config.width * 0.405 + 'px',
          height: props.config.height * 1.18 + 'px'
        }"
      >
        <span
          class="num"
          :style="{
            fontSize: props.config.height * 0.0925 + 'px',
            marginTop: props.config.height * 0.38 + 'px'
          }"
          >{{ props.config.numbers[1] }}</span
        >
      </div>
      <div
        class="item i3"
        :style="{
          width: props.config.width * 0.405 + 'px',
          height: props.config.height * 1.32 + 'px'
        }"
      >
        <span
          class="num"
          :style="{
            fontSize: props.config.height * 0.0925 + 'px',
            marginTop: props.config.height * 0.507 + 'px'
          }"
          >{{ props.config.numbers[2] }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { InterfaceConfig } from '@/components/projectStatus/types';
const props = defineProps({
  config: {
    type: Object as PropType<InterfaceConfig>,
    default: () => {
      return {
        title: '标题',
        width: 'auto',
        height: 'auto',
        numbers: [0, 0, 0]
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  overflow: hidden;
  .title {
    text-align: center;
    font-family: Adobe Heiti Std;
    color: #ffffff;
    position: absolute;
    top: 15%;
    left: 50%;
    text-shadow: 0 0 25px #13aaec;
    transform: translateX(-50%);
  }
  .container {
    position: absolute;
    bottom: 5px;
    width: 100%;
    height: 100%;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 0%;
      pointer-events: none;
      .num {
        font-weight: bold;
      }
      &.i1 {
        background: url('../../assets/project/online.png') no-repeat;
        background-size: 100% 100%;
        left: -5%;
      }
      &.i2 {
        background: url('../../assets/project/pending.png') no-repeat;
        background-size: 100% 100%;
        left: 50%;
        transform: translateX(-50%);
        bottom: 3%;
      }
      &.i3 {
        background: url('../../assets/project/no_begain.png') no-repeat;
        background-size: 100% 100%;
        right: -5%;
      }
    }
  }
}
</style>
