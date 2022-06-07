<template>
  <a-modal
    ref="modal"
    :class="getClassInner(modalClass)"
    :style="getStyleInner(modalStyle)"
    :visible="visible"
    :getContainer="() => ContainerDom"
    v-bind="_attrs"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <BorderBox>
      <!-- <slot></slot> -->
      <template v-if="!isNoTitle" v-slot:title>
        <a-row class="s-modal-title-row" type="flex">
          <a-col class="left">
            <slot name="title">{{ title }}</slot>
          </a-col>
          <a-col v-if="switchFullscreen" class="right" @click="toggleFullscreen">
            <a-button class="ant-modal-fullscreen" type="link">
              <template #icon>
                <FullscreenExitOutlined v-if="innerFullscreen" />
                <FullscreenOutlined v-else />
              </template>
            </a-button>
          </a-col>
        </a-row>
      </template>
      <!-- 处理 scopedSlots -->
      <template v-for="slotName of scopedSlotsKeys" v-slot:[slotName]>
        <slot :name="slotName"></slot>
      </template>

      <!-- 处理 slots -->
      <template v-for="slotName of slotsKeys" v-slot:[slotName]>
        <slot :name="slotName"></slot>
      </template>
    </BorderBox>
  </a-modal>
</template>

<script lang="ts">
import { getClass, getStyle } from '@/utils/props-util';
import { triggerWindowResizeEvent } from '@/utils/util';
import { Modal, Row, Col, Button } from 'ant-design-vue';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
import BorderBox from '@/components/BorderBox/index.vue';
import { defineComponent, reactive, computed, ref, watch, onMounted } from 'vue';
export default defineComponent({
  name: ' SModal',
  components: {
    AButton: Button,
    AModal: Modal,
    ARow: Row,
    ACol: Col,
    BorderBox,
    FullscreenOutlined,
    FullscreenExitOutlined
  },
  props: {
    title: String,
    // 可使用 .sync 修饰符
    visible: Boolean,
    // 是否全屏弹窗，当全屏时无论如何都会禁止 body 滚动。可使用 .sync 修饰符
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 是否允许切换全屏（允许后右上角会出现一个按钮）
    switchFullscreen: {
      type: Boolean,
      default: false
    },
    okClose: {
      type: Boolean,
      default: true
    },

    parentDom: {
      // !!!!!注意很重要
      type: String,
      default: 'project' //默认id为project的
    }
  },

  setup(props, context) {
    const modal = ref();
    // 内部使用的 slots ，不再处理
    const usedSlots = reactive(['title']);
    // 实际控制是否全屏的参数
    let innerFullscreen = ref(props.fullscreen);
    // 一些未处理的参数或特殊处理的参数绑定到 a-modal 上
    let _attrs = computed(() => {
      let attrs = { ...context.attrs };
      if (innerFullscreen.value) {
        attrs['width'] = '100%';
      }
      return attrs;
    });

    // 默认挂在到父元素上，不然不会scale
    const ContainerDom = ref<HTMLElement | null>(null);
    let allSlotsKeys = computed(() => {
      return Object.keys(context.slots).concat(Object.keys(context.slots));
    });
    let isNoTitle = computed(() => {
      return !props.title && !allSlotsKeys.value.includes('title');
    });
    let isNoFooter = computed(() => {
      return _attrs.value['footer'] === null;
    });
    let modalClass = computed(() => {
      return {
        's-modal-box': true,
        fullscreen: innerFullscreen.value,
        'no-title': isNoTitle.value,
        'no-footer': isNoFooter.value
      };
    });
    let modalStyle = computed(() => {
      let style = {};
      if (innerFullscreen.value) {
        style['top'] = '0';
      }
      return style;
    });
    let slotsKeys = computed(() => {
      return Object.keys(context.slots).filter((key) => !usedSlots.includes(key));
    });
    let scopedSlotsKeys = computed(() => {
      return Object.keys(context.slots).filter((key) => !usedSlots.includes(key));
    });
    watch(
      () => props.visible,
      () => {
        if (props.visible) {
          innerFullscreen.value = props.fullscreen;
        }
      }
    );
    watch(innerFullscreen, (val) => {
      context.emit('update:fullscreen', val);
    });
    const modalClassObj = ref();
    const modalStyleObj = ref();
    onMounted(() => {
      modalClassObj.value = getClass(modal.value);
      modalStyleObj.value = getStyle(modal.value);
      ContainerDom.value = document.getElementById(props.parentDom as string);
    });
    const getClassInner = (className) => {
      return { ...modalClassObj, ...className };
    };
    const getStyleInner = (style) => {
      return { ...modalStyleObj, ...style };
    };
    function close() {
      context.emit('update:visible', false);
    }
    function handleOk() {
      if (props.okClose) {
        close();
      }
    }
    function handleCancel() {
      close();
    }

    function toggleFullscreen() {
      innerFullscreen.value = !innerFullscreen.value;
      triggerWindowResizeEvent();
    }
    return {
      modal,
      innerFullscreen,
      modalStyle,
      _attrs,
      modalClass,
      scopedSlotsKeys,
      slotsKeys,
      isNoTitle,
      ContainerDom,
      getClassInner,
      getStyleInner,
      close,
      handleOk,
      handleCancel,
      toggleFullscreen
    };
  }
});
</script>

<style lang="scss">
.ant-modal-mask {
  background-color: rgba(0, 0, 0, 0.8) !important;
}
.s-modal-box {
  color: #fff;
  padding-bottom: 0px;
  max-width: none;
  .ant-modal-content {
    background-color: transparent;
    box-shadow: none;
    .ant-modal-close {
      top: 30px;
      right: 26px;
      color: rgba(255, 255, 255, 0.75);
      &:hover {
        color: rgba(255, 255, 255, 0.95);
      }
      .anticon {
        font-size: 26px;
      }
    }
  }
  .ant-modal-body {
    padding: 0px;
  }
  // 主要区域
  .border1-box-content {
    padding: 11px 4px 4px 4px;
    // 显示内容区域
    .content-body {
      background: linear-gradient(158deg, #23515d, #0d142d);
      padding: 15px 46px 46px 37px;
    }
  }
  &.fullscreen {
    top: 0;
    left: 0;
    padding: 0;
    width: 100% !important;
    // 兼容1.6.2版本的antdv
    & .ant-modal {
      top: 0;
      padding: 0;
      height: 100vh;
    }

    & .ant-modal-content {
      height: 100vh;
      border-radius: 0;
      & .ant-modal-body {
        /* title 和 footer 各占 55px */
        height: calc(100% - 55px - 55px);
        overflow: auto;
      }
    }

    &.no-title,
    &.no-footer {
      .ant-modal-body {
        height: 100%;
      }
    }

    &.no-title.no-footer {
      .ant-modal-body {
        height: 100%;
      }
    }
  }

  .s-modal-title-row {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 400;
    height: 56px;
    line-height: 56px;
    font-size: 28px;
    margin-bottom: 41px;
    word-wrap: break-word;
    .left {
      width: calc(100% - 120px);
    }

    .right {
      width: 56px;
      .ant-modal-fullscreen {
        width: 56px;
        height: 56px;
        vertical-align: auto;
        color: rgba(255, 255, 255, 0.75);
        &:hover {
          color: rgba(255, 255, 255, 0.95);
        }
        .anticon {
          font-size: 24px;
        }
      }
    }
  }
}

// @media (max-width: 767px) {
//   .s-modal-box.fullscreen {
//     margin: 0;
//     max-width: 100vw;
//   }
// }
</style>
