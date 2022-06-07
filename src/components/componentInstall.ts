import type { DefineComponent } from 'vue';

const component = Object.create(null);
/* eslint-disable */
import Echart from './echartCanvas/index';
import SModal from '@/components/Modal/index.vue';
import Border from '@/components/BorderBox/index.vue';
import Border1 from '@/components/BorderBox1/index.vue';
component.install = function (vue: DefineComponent) {
  // ECharts 图表渲染
  vue.component('echart', Echart);
  vue.component('SModal', SModal);
  vue.component('Border', Border);
  vue.component('Border1', Border1);
};
export default component;
