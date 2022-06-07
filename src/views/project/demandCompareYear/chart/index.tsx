import { defineComponent, onMounted, reactive } from 'vue';
import Draw from './draw';
export default defineComponent({
  components: {
    Draw
  },
  setup() {
    let data = reactive({ series: [] });
    onMounted(() => {
      data.series = reactive([
        {
          name: '上线需求个数',
          type: 'line',
          smooth: true,
          data: [45, 20, 101, 134, 90, 230, 210],
          showSymbol: false,
          lineStyle: {
            color: '#FADD21',
            width: 1
          },
          areaStyle: {
            opacity: 0.6,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#FFFDE1' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#FADD21' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          },
          itemStyle: {
            color: 'yellow'
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
