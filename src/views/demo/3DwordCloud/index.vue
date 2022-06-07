<template>
  <div class="world-cloud-3d">
    <div class="world-cloud-canvas-wrapper" :style="{ width: width + 'px', height: height + 'px' }">
      <canvas :id="canvasId" :width="width" :height="height"> </canvas>
    </div>
    <div style="display: none" :id="canvasWeightId" class="canvasWeight"></div>

    <div class="character" :style="{ width: width + 'px' }">
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
</template>

<script lang="ts">
import TagCanvas from 'tag-canvas';
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  onUnmounted,
  watch,
  toRefs,
  PropType
} from 'vue';
import type { IWordItem } from './types';
const PropsType = {
  canvasId: {
    type: String,
    require: true
  },
  canvasWeightId: {
    type: String,
    require: true
  },
  wordArray: {
    type: Array as PropType<IWordItem[]>,
    require: true,
    default: () => []
  },
  width: {
    type: [Number, String],
    default: 400
  },
  height: {
    type: [Number, String],
    default: 400
  },
  textColor: {
    type: String,
    default: '#8BFDFF'
  }
};
export default defineComponent({
  name: '3DWordColud',
  props: PropsType,
  setup(props, { expose }) {
    const CHARCODE_A_UC = 65;
    const uppercaseAlphabet = new Array(26)
      .fill(null)
      .map((v, i) => ({ text: String.fromCharCode(CHARCODE_A_UC + i), active: false }));
    // 配置
    const characterReactive = reactive(uppercaseAlphabet);
    const options = reactive({
      activeCursor: 'pointer',
      maxSpeed: 0.01, // 添加最大的运动速度
      minSpeed: 0.01, // 添加最小的运动速度这样就可以保证一直运动，不会停止
      textHeight: 25,
      outlineMethod: 'colour', // tag hover 之后的 轮廓效果
      fadeIn: 800,
      outlineColour: '#fff456aa',
      outlineOffset: 0,
      shape: 'sphere', //形状 ，默认球体 vcylinder 圆筒 hring：水平圆环 vrin垂直圆环g(0.5)
      depth: 0.97,
      minBrightness: 0.2,
      clickToFront: 400, //如果设置为数字，则在激活之前，所选标记将在以下几毫秒内移动到前面。
      wheelZoom: false,
      dragControl: true, //启用后，云在拖动时移动，而不是基于鼠标位置
      freezeActive: true, //置为 在标记突出显示时暂停移动。true
      freezeDecel: true, ///
      reverse: true, // 运动方向与鼠标移动方向相反
      shadowBlur: 2,
      shuffleTags: false, // 随机标签
      shadowOffset: [1, 1],
      initial: [0.1, 0.1], // 给词云添加一个初始的运动方向
      textFont: null, // 字体设置为 null 就会继承 每个 tag的a 标签的字体
      textColour: props.textColor, // 字体颜色设置为 null 就会继承 每个 tag的a 标签的字体颜色
      weight: true, // weight 打开，就可以根据默认的字体的大小作为权重，对tag 的样式进行调整
      weightMode: 'size', // 样式调整的方式
      weightSize: 1 // 调整 tag 字体的大小，加个 权重
    });
    const startWorldCloud = function (updateFlag?: boolean) {
      createTagListDom();
      try {
        // 如果不是更新，说明是第一次渲染，就启动 tagcanvas, 否则就代表更新
        if (!updateFlag) {
          TagCanvas.Start(props.canvasId, props.canvasWeightId, options);
        } else {
          TagCanvas.Update(props.canvasId);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const createTagListDom = function () {
      const { wordArray } = props;
      let res = [...(wordArray as IWordItem[])];
      let fragment = new DocumentFragment();
      for (let i = 0; i < res.length; i++) {
        let a = document.createElement('a');
        // 字符串长度大于10就要换行
        if (res[i].name.length > 10) {
          let charArr = res[i].name.split('');
          charArr.splice(10, 0, '<br>');
          res[i].name = charArr.join('');
        }
        a.innerHTML = res[i].name;
        a.href = 'javascript:void(0)';
        a.onclick = () => selectItem(res[i]);
        // 如果是要加重展示就 设置属性为 huge 或large, 否则就设置属性为 medium 或small
        if (res[i].light) {
          let readomValue = Math.random();
          a.className = readomValue > 0.5 ? 'huge' : 'large';
        } else {
          let readomValue = Math.random();
          a.className = readomValue > 0.5 ? 'medium' : 'small';
        }

        fragment.append(a);
      }
      // 更新 tagContainer中的 tag元素
      let tagsContainer = document.querySelector('#' + props.canvasWeightId);
      tagsContainer.innerHTML = '';
      tagsContainer.append(fragment);
    };
    let timer = ref();
    function moveToTagByIndex(index) {
      TagCanvas.TagToFront(props.canvasId, {
        index: index,
        active: true,
        callback: () => {
          TagCanvas.Pause(props.canvasId);
          resetStatus();
        }
      });
    }

    function resetStatus() {
      if (timer.value) clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        TagCanvas.Resume(props.canvasId);
        characterReactive.map((item) => {
          item.active = false;
        });
      }, 10000);
    }
    function jumpTo(item, index) {
      // todo 变亮，跳到眼前
      characterReactive.map((item) => {
        item.active = false;
      });
      characterReactive[index].active = true;
      // 查找当前索引
      const wordIndex = (props.wordArray as Array<IWordItem>).findIndex((wordItem) => {
        return wordItem.tag == item.text;
      });
      if (wordIndex >= 0) {
        moveToTagByIndex(wordIndex);
      } else {
        console.log('没哟图');
      }
    }
    expose({ moveToTagByIndex });
    function selectItem(item) {
      console.log(item);
    }
    watch(props, () => {
      startWorldCloud(true);
    });
    onMounted(() => {
      startWorldCloud();
    });
    onUnmounted(() => {
      TagCanvas.Delete(props.canvasId);
    });
    return {
      ...toRefs(props),
      characterReactive,
      jumpTo
    };
  }
});
</script>

<style lang="scss" scoped>
.world-cloud-3d {
  .canvasWeight {
    font-size: 12px;
    .huge {
      font-size: 30px;
      color: #f5576caa;
    }
    .large {
      font-size: 25px;
      color: #38f9d7aa;
    }
    .medium {
      font-size: 20px;
      color: #a18cd1aa;
    }
    .small {
      font-size: 15px;
      color: #a18cd1aa;
    }
  }
  .character {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .item {
      margin-left: 8px;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 50px;
      color: #8bfdff;
      cursor: pointer;
      &:hover {
        color: red;
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
        color: red;
        // transform: scale(1.2);
        &::after {
          content: '';
          display: block;
          width: 0;
          margin-top: 5px;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 10px solid #fea;
        }
      }
    }
  }
}
</style>
