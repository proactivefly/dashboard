<template>
  <div id="project" ref="appRef">
    <div class="bg">
      <Loading v-if="loading">Loading...</Loading>
      <div class="host-body" v-else>
        <div class="top">
          <div class="title">研发部门人员项目进度看板</div>
        </div>
        <div class="content">
          <div class="left">
            <div class="first">
              <WordCloud />
            </div>
            <div class="second">
              <Border>
                <PersonInfo />
              </Border>
            </div>
            <div class="three">
              <Border>
                <ProductCompare />
              </Border>
            </div>
          </div>
          <div class="center">
            <div class="first">
              <Number />
            </div>
            <div class="second">
              <ProjectStatus />
            </div>
            <div class="three">
              <Border>
                <ReaseTrend />
              </Border>
            </div>
          </div>
          <div class="right">
            <div class="first">
              <Border>
                <DemandTotalYear />
              </Border>
            </div>
            <div class="second">
              <Border>
                <BugCompare />
              </Border>
            </div>
            <div class="three">
              <Border>
                <CodeDefects />
              </Border>
            </div>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  import WordCloud from './wordCloud/index.vue';
  import CodeDefects from './codeDefects/index.vue';
  import ProductCompare from './productCompare/index.vue';
  import PersonInfo from './personInfo/index.vue';
  import useDraw from '@/utils/useDraw';
  import DemandTotalYear from '@/views/project/demandTotalYear/index.vue';
  import BugCompare from '@/views/project/bugCompare/index.vue';
  import ReaseTrend from '@/views/project/releaseTrend/index.vue';
  import Number from '@/views/project/number/index';
  import ProjectStatus from '@/views/project/projectStatus/index';
  import { Loading } from '@kjgl77/datav-vue3';
  export default defineComponent({
    components: {
      ProjectStatus,
      BugCompare,
      ReaseTrend,
      WordCloud,
      CodeDefects,
      Number,
      DemandTotalYear,
      ProductCompare,
      PersonInfo,
      Loading,
    },
    setup() {
      const loading = ref<boolean>(true);
      const decorationColors = ['#568aea', '#000000'];
      // * 适配处理
      const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
      const cancelLoading = () => {
        setTimeout(() => {
          loading.value = false;
        }, 2000);
      };
      // 生命周期
      onMounted(() => {
        cancelLoading();
        // todo 屏幕适应
        windowDraw();
        calcRate();
      });
      onUnmounted(() => {
        unWindowDraw();
      });
      return {
        loading,
        appRef,
        decorationColors,
      };
    },
  });
</script>

<style scoped lang="scss">
  @import '@/assets/scss/project.scss';
</style>
