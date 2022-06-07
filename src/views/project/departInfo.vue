<template>
  <div id="project" ref="appRef">
    <div class="bg">
      <Loading v-if="loading">Loading...</Loading>
      <div class="host-body" v-else>
        <div class="top">
          <div class="title">{{ dept_name }}人员信息看板</div>
        </div>
        <div class="content">
          <div class="left">
            <div class="first">
              <WordCloud />
            </div>
            <div class="second"><DetartProjectDetail /></div>
            <div class="three">
              <Border>
                <DefectsTop10 />
              </Border>
            </div>
          </div>
          <div class="center">
            <div class="first">
              <NameGlobal />
            </div>
            <div class="two">
              <Border>
                <CodeDefectsCurrentYear />
              </Border>
            </div>
          </div>
          <div class="right">
            <div class="first">
              <Border>
                <DemandCompareYear />
              </Border>
            </div>
            <div class="second">
              <Border>
                <NewContent />
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
import { defineComponent, ref, onMounted, onUnmounted, toRefs } from 'vue';
import WordCloud from './wordCloud/index.vue';
import DefectsTop10 from './defectsTop10/index.vue';
import NewContent from '@/views/project/newContent/index.vue';
import useDraw from '@/utils/useDraw';
import Border from '@/components/BorderBox/index.vue';
import DemandCompareYear from '@/views/project/demandCompareYear/index.vue';
import CodeDefectsCurrentYear from '@/views/project/codeDefectsCurrentYear/index.vue';
import NameGlobal from '@/views/project/3DName/index.vue';
import DetartProjectDetail from '@/views/project/departProjectDetail/index';
import { Loading } from '@kjgl77/datav-vue3';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: {
    DemandCompareYear,
    CodeDefectsCurrentYear,
    DetartProjectDetail,
    NewContent,
    WordCloud,
    NameGlobal,
    DefectsTop10,
    Border,
    Loading
  },
  setup() {
    type QueryInfo = {
      dept_id: number;
      dept_name: string;
      total: number;
    };
    const routeInfo = useRoute();
    const loading = ref<boolean>(true);
    const decorationColors = ['#568aea', '#000000'];
    const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
    const cancelLoading = () => {
      setTimeout(() => {
        loading.value = false;
      }, 3000);
    };
    onMounted(() => {
      cancelLoading();
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
      ...toRefs(routeInfo.query as unknown as QueryInfo)
    };
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/departInfo.scss';
</style>
