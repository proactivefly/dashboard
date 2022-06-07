<template>
  <div class="wrapper">
    <WordCloud
      canvasId="canvasIdAra"
      canvasWeightId="canvasWeightIdAra"
      width="500"
      height="228"
      :wordArray="wordArray"
      :lineBreakLength="5"
      @selectItem="selectItem"
      :options="options"
    />
  </div>
  <!-- 质量报 -->
  <Quality ref="QualityDom" />
  <!-- 上新内容 -->
  <NewContent ref="NewContentDom" />
  <!-- 测试与线上对比 -->
  <ProductVSTest ref="ProductVSTestDom" />
  <!-- 质量提升 -->
  <QualityUp ref="QualityUpDom" />
  <!-- 开发自测与LowBug情况 -->
  <LowBug ref="LowBugDom" />
  <!-- bug分布 -->
  <BugDistribute ref="BugDistributeDom" />
  <!-- 每月提交bug数 -->
  <PickBugTotal ref="PickBugTotalDom" />
</template>

<script lang="ts" setup>
import WordCloud from '@/components/3DwordCloud/index.vue';
import Quality from './modules/quality.vue';
import NewContent from './modules/newContent.vue';
import ProductVSTest from './modules/productVStest/index.vue';
import QualityUp from './modules/qualityUp.vue';
import LowBug from './modules/lowBug/index.vue';
import BugDistribute from './modules/bugDistribute/index.vue';
import PickBugTotal from './modules/pickBugTotal/index.vue';
import { reactive, ref, onMounted } from 'vue';
interface HTMLElementPlus extends HTMLElement {
  clickModal(arg: any): void;
}
const QualityDom = ref(null);
const NewContentDom = ref<HTMLElementPlus | null>(null);
const ProductVSTestDom = ref<HTMLElementPlus | null>(null);
const QualityUpDom = ref<HTMLElementPlus | null>(null);
const LowBugDom = ref<HTMLElementPlus | null>(null);
const BugDistributeDom = ref<HTMLElementPlus | null>(null);
const PickBugTotalDom = ref<HTMLElementPlus | null>(null);
const wordArray = reactive([
  { name: '本月各产品生产环境与测试环境bug对比', id: 1 },
  { name: '本月已上线需求中每人提交的Bug数 ', id: 2 },
  { name: '本月质量总结', id: 3 },
  { name: '本月上线内容', id: 4 },
  { name: '本月质量提升活动情况', id: 5 },
  { name: '开发自测及LowBug情况', id: 6 },
  { name: '近一年测试环境Bug情况分布', id: 7 }
]);
onMounted(() => {
  setTimeout(() => {}, 3000);
});
// 一些tag-canvas 配置项
const options = reactive({
  stretchX: 1.5, // x轴拉长
  weightSizeMax: 32,
  weightSizeMin: 20,
  weightSize: 1 // 调整 tag 字体的大小，加个 权重
});
const selectItem = (item) => {
  if (item.id == 3) {
    QualityDom.value.clickModal(item);
  } else if (item.id == 4) {
    NewContentDom.value.clickModal(item);
  } else if (item.id == 1) {
    ProductVSTestDom.value.clickModal(item);
  } else if (item.id == 5) {
    QualityUpDom.value.clickModal(item);
  } else if (item.id == 6) {
    LowBugDom.value.clickModal(item);
  } else if (item.id == 7) {
    BugDistributeDom.value.clickModal(item);
  } else if (item.id == 2) {
    PickBugTotalDom.value.clickModal(item);
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;
  height: 260px;
  border-radius: 10px;
}
</style>
