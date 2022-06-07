<template>
  <div class="world-cloud-3d">
    <div class="world-cloud-canvas-wrapper" :style="{ width: width + 'px', height: height + 'px' }">
      <canvas :id="canvasId" :width="width" :height="height"> </canvas>
    </div>
    <div style="display: none" :id="canvasWeightId" class="canvasWeight"></div>
  </div>
</template>

<script lang="ts">
import TagCanvas from 'tag-canvas';
import { defineComponent, reactive, onMounted, onUnmounted, watch, toRefs, PropType } from 'vue';
import type { IWordItem } from './types';
import { deepClone } from '@/utils/util';
export default defineComponent({
  name: '3DWordColud',
  props: {
    canvasId: {
      type: String,
      default: 'canvasId'
    },
    canvasWeightId: {
      type: String,
      default: 'canvasWeightId'
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
    options: {
      type: Object,
      default: () => {}
    },
    lineBreakLength: {
      //标签大于多少换行
      type: Number,
      default: 10
    }
  },
  setup(props, { expose, emit }) {
    const defaultOptions = reactive({
      activeCursor: 'pointer',
      maxSpeed: 0.01, // 添加最大的运动速度
      minSpeed: 0.01, // 添加最小的运动速度这样就可以保证一直运动，不会停止
      textHeight: 22,
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
      // stretchX:1, // Stretch or compress the cloud horizontally. 水平拉伸词云
      shuffleTags: false, // 随机标签
      shadowOffset: [1, 1],
      initial: [0.1, 0.1], // 给词云添加一个初始的运动方向
      textFont: null, // 字体设置为 null 就会继承 每个 tag的a 标签的字体
      textColour: '#8BFDFF', // 字体颜色设置为 null 就会继承 每个 tag的a 标签的字体颜色
      weight: true, // weight 打开，就可以根据默认的字体的大小作为权重，对tag 的样式进行调整
      weightMode: 'size', // 样式调整的方式
      weightSize: 1 // 调整 tag 字体的大小，加个 权重
      // weightSizeMax:'',
      // weightSizeMin:''
    });
    // 覆盖配置项
    Object.assign(defaultOptions, props.options);
    const startWorldCloud = function (updateFlag?: boolean) {
      createTagListDom();
      try {
        // 如果不是更新，说明是第一次渲染，就启动 tagcanvas, 否则就代表更新
        if (!updateFlag) {
          TagCanvas.Start(props.canvasId, props.canvasWeightId, defaultOptions);
        } else {
          TagCanvas.Update(props.canvasId);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const createTagListDom = function () {
      let res = deepClone(props.wordArray);
      // let res = [...(props.wordArray as IWordItem[])];
      let fragment = new DocumentFragment();
      for (let i = 0; i < res.length; i++) {
        let a = document.createElement('a');
        // 字符串长度大于10就要换行
        if (res[i].name.length > props.lineBreakLength) {
          let charArr = res[i].name.split('');
          charArr.splice(props.lineBreakLength as number, 0, '<br>');
          res[i].name = charArr.join('');
        }
        a.innerHTML = res[i].name;
        a.href = 'javascript:void(0)';
        a.onclick = () => selectItem(res[i]);
        fragment.append(a);
      }
      // 更新 tagContainer中的 tag元素
      let tagsContainer = document.querySelector('#' + props.canvasWeightId);
      if (tagsContainer) {
        tagsContainer.innerHTML = '';
        tagsContainer.append(fragment);
      }
    };
    function moveToTagByIndex(index) {
      TagCanvas.TagToFront(props.canvasId, {
        index: index,
        active: true,
        callback: () => {
          // TagCanvas.Pause(props.canvasId);
          // resetStatus();
          // 回调
          emit('moveToCallback', index);
        }
      });
    }

    function resetStatus() {
      TagCanvas.Resume(props.canvasId);
    }
    function jumpTo(index) {
      moveToTagByIndex(index);
    }
    expose({ moveToTagByIndex });
    function selectItem(item) {
      emit('selectItem', item);
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
      jumpTo,
      resetStatus
    };
  }
});
</script>

<style lang="scss" scoped>
.world-cloud-3d {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
