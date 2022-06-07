import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';
import Draw from './draw';
interface ISeries {
  name: string;
  type: string;
  stack: string;
  data: Array<number>;
}
export default defineComponent({
  components: {
    Draw
  },
  setup() {
    let data = reactive({ series: [] });
    onMounted(() => {
      data.series = reactive([
        {
          type: 'line',
          name: '产品线千行代码缺陷密度',
          symbol: 'circle',
          symbolSize: 6,
          data: [45, 20, 101, 134, 90, 230, 210],
          itemStyle: {
            color: '#000',
            borderColor: '#9500A2',
            borderWidth: 1
          },
          lineStyle: {
            color: '#9500A2',
            width: 1
          }
        }
      ]);
    });
    return () => {
      return (
        <div>
          <Draw cdata={data} />
        </div>
      );
    };
  }
});
