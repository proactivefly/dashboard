<template>
  <div ref="borderBox" class="dv-border-box">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <linearGradient id="PSgrad_0" x1="0%" x2="0%" y1="100%" y2="0%">
          <stop offset="0%" stop-color="rgb(79,172,254)" stop-opacity="1" />
          <stop offset="100%" stop-color="rgb(0,242,254)" stop-opacity="1" />
        </linearGradient>
      </defs>
      <!-- 整体线框 -->
      <path
        :fill="backgroundColor"
        :stroke="state.mergedColor[0]"
        :d="`
          M 3 10  L ${width - d8 * 2} 10  M ${width - d8} 10 L ${width - 3} 10 L ${width - 3} ${
          height - 3
        } 
          L 3 ${height - 3} L 3 10
        `"
      />
      <!-- 上边三角塔 -->
      <path fill-rule="evenodd" :fill="state.mergedColor[0]" d="M 10 2 L 170 2 L 180 10 L 2 10 z" />
      <circle
        fill-rule="evenodd"
        fill="url(#PSgrad_0)"
        r="2"
        :cx="`${width - 2 * d8 + d16}`"
        cy="10"
      ></circle>

      <circle
        fill-rule="evenodd"
        fill="url(#PSgrad_0)"
        r="3"
        :cx="`${width - 2 * d8 + d16 * 2}`"
        cy="10"
      ></circle>
      <circle
        fill-rule="evenodd"
        fill="url(#PSgrad_0)"
        r="3"
        :cx="`${width - 2 * d8 + d16 * 3}`"
        cy="10"
      ></circle>
      <circle
        fill-rule="evenodd"
        fill="url(#PSgrad_0)"
        r="3"
        :cx="`${width - 2 * d8 + d16 * 4}`"
        cy="10"
      ></circle>
      <circle
        fill-rule="evenodd"
        fill="url(#PSgrad_0)"
        r="3"
        :cx="`${width - 2 * d8 + d16 * 5}`"
        cy="10"
      ></circle>
    </svg>
    <div class="border1-box-content">
      <div class="content-body">
        <!-- 标题 -->
        <slot name="title"></slot>
        <!-- 默认内容 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import autoResize from '@/utils/autoResize';
import { deepClone, deepMerge } from '@/utils/util';
import { computed } from '@vue/reactivity';
import { defineProps, ref, reactive, watch, onMounted } from 'vue';
const props = defineProps({
  color: {
    type: Array,
    default: () => []
  },
  backgroundColor: {
    type: String,
    default: 'transparent'
  }
});

const borderBox = ref<HTMLElement | null>(null);
const { width, height } = autoResize(borderBox);
const d8 = computed(() => {
  return width.value / 8;
});
const d16 = computed(() => {
  return width.value / 8 / 6;
});
const state = reactive({
  defaultColor: ['#48C5F5', '#48C5F5'],
  mergedColor: []
});

watch(
  () => props.color,
  () => {
    mergeColor();
  }
);

onMounted(() => {
  mergeColor();
});

function mergeColor() {
  state.mergedColor = deepMerge(deepClone(state.defaultColor, true), props.color || []);
}
</script>

<style lang="scss" scoped>
.dv-border-box {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 10;
    pointer-events: none;
  }

  .border1-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
