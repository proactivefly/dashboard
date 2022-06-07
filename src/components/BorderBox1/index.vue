<template>
  <div
    ref="borderBox2"
    class="border2"
    :style="`border: 1px solid ${state.mergedColor[0]}; background-color: ${backgroundColor}`"
  >
    <svg class="border-svg-container" :width="width" :height="height">
      <polyline
        class="border-line-width"
        :stroke="state.mergedColor[1]"
        :points="`0, 30 0, 0 30, 0`"
      />
      <!-- <polyline
        class="border-line-width"
        :stroke="state.mergedColor[1]"
        :points="`${width - 25}, 0 ${width}, 0 ${width}, 25`"
      /> -->
      <polyline
        class="border-line-width"
        :stroke="state.mergedColor[1]"
        :points="`${width - 30}, ${height} ${width}, ${height} ${width}, ${height - 30}`"
      />
      <!-- <polyline
        class="border-line-width"
        :stroke="state.mergedColor[1]"
        :points="`0, ${height - 25} 0, ${height} 25, ${height}`"
      /> -->
    </svg>

    <div class="border2-box-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import autoResize from '@/utils/autoResize';
import { deepClone, deepMerge } from '@/utils/util';
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

const borderBox2 = ref<HTMLElement | null>(null);

const state = reactive({
  // [填充色]
  defaultColor: ['#297392', '#48C5F5'],

  mergedColor: []
});

const { width, height } = autoResize(borderBox2);

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
.border2 {
  position: relative;
  width: 100%;
  height: 100%;

  .border-svg-container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    & > polyline {
      fill: none;
      stroke-linecap: round;
    }
  }

  .border-line-width {
    stroke-width: 5;
    z-index: 10;
  }
  .border2-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
