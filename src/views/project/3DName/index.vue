<template>
  <div class="wrapper">
    <WordCloud
      width="628"
      height="484"
      canvasId="canvasIdNames"
      canvasWeightId="canvasWeightIdNames"
      :wordArray="wordArray"
      class="WordCloud"
      @selectItem="selectItem"
      :options="options"
      ref="word"
      @moveToCallback="moveToCallback"
    />
    <img src="../../../assets/project/circle-word.png" class="circlebg" />

    <div class="character">
      <div
        :class="['item', item.active ? 'active' : '']"
        v-for="(item, index) in characterReactive"
        :key="item.text"
        @click="jumpTo(item, index)"
      >
        <span class="text">{{ item.text }}</span>
      </div>
    </div>
  </div>
  <DeveloperModal ref="DeveloperDom" />
  <TesterModal ref="TesterDom" />
</template>

<script lang="ts" setup>
import WordCloud from '@/components/3DwordCloud/index.vue';
import DeveloperModal from './modules/developer/index.vue';
import TesterModal from './modules/test/index.vue';
import { reactive, ref } from 'vue';
const DeveloperDom = ref(null);
const TesterDom = ref(null);
const wordArray: any = reactive([
  { name: '蔡永维', id: 4, tag: 'C', role: 'develop' },
  { name: '康杰', id: 4, tag: 'K', role: 'develop' },
  { name: '李康永', id: 1, tag: 'L', role: 'develop' },
  { name: '刘东 ', id: 2, tag: 'L', role: 'develop' },
  { name: '刘文龙', id: 3, tag: 'L', role: 'test' },
  { name: '李亚鹏', id: 5, tag: 'L', role: 'test' },
  { name: '李敬', id: 5, tag: 'L', role: 'test' }
]);
// 覆盖默认配置项
const options = reactive({
  weightSizeMax: 54,
  weightSizeMin: 20,
  weightSize: 3, // 调整 tag 字体的大小，加个 权重
  textColor: '#8BFDFF',
  textHeight: 25 //标签高度
});
for (let i = 0; i < 30; i++) {
  if (i == 0) {
    wordArray.push({ name: `伍佰${i}`, light: false, tag: 'W' });
  } else {
    if (Math.random() > 0.5) {
      wordArray.push({ name: `刘帅${i}`, light: false, tag: 'L' });
    } else {
      wordArray.push({ name: `张亚东${i}`, light: false, tag: 'Z' });
    }
  }
}

const CHARCODE_A_UC = 65;
const uppercaseAlphabet = new Array(26)
  .fill(null)
  .map((v, i) => ({ text: String.fromCharCode(CHARCODE_A_UC + i), active: false }));
// 配置
const characterReactive = reactive(uppercaseAlphabet);
const word = ref(null);
function jumpTo(item, index) {
  // todo 变亮，跳到眼前
  characterReactive.map((item) => {
    item.active = false;
  });
  characterReactive[index].active = true;
  // 查找当前索引
  const wordIndex = wordArray.findIndex((wordItem) => {
    return wordItem.tag == item.text;
  });
  if (wordIndex >= 0) {
    word.value.moveToTagByIndex(wordIndex);
  } else {
    console.log('没找到这个姓氏');
  }
}
function moveToCallback() {
  setTimeout(() => {
    characterReactive.map((item) => {
      item.active = false;
    });
  }, 3000);
}
function selectItem(item) {
  if (item.role == 'developer') {
    DeveloperDom.value.clickModal(item);
  } else {
    TesterDom.value.clickModal(item);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 484px;
  position: relative;
  .WordCloud {
    margin: 0 auto;
    z-index: 99;
  }
  .circlebg {
    position: absolute;
    width: 650px;
    height: 500px;
    pointer-events: none;
    left: 50%;
    top: 0%;
    transform: translateX(-50%);
    z-index: 1;
  }
  .character {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 46px;
    .item {
      margin-left: 8px;
      font-size: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 50px;
      color: #8bfdff;
      cursor: pointer;
      &:hover {
        // color: red;
        // transform: scale(1.2);
        // transition: all cubic-bezier(0.075, 0.82, 0.165, 1);
        &::after {
          content: '';
          display: block;
          width: 0;
          margin-top: 5px;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 10px solid #8bfdff;
        }
      }
      &.active {
        // color: red;
        // transform: scale(1.2);
        &::after {
          content: '';
          display: block;
          width: 0;
          margin-top: 5px;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 10px solid #8bfdff;
        }
      }
    }
  }
}
</style>
