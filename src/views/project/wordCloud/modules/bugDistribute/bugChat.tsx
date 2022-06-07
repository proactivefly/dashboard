import { defineComponent, watch, ref, shallowReactive } from 'vue';
// 声明类型
const PropsType = {
  cdata: {
    type: Object,
    require: true
  }
} as const;

export default defineComponent({
  props: PropsType,
  setup(props) {
    const chartRef = ref();
    let options: any = shallowReactive({});
    watch(
      () => props.cdata,
      (val: any) => {
        options = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: ['整体', '平均值'],
            bottom: '0%',
            itemGap: 20,
            itemStyle: { opacity: 0 },
            itemWidth: 30
          },
          xAxis: [
            {
              type: 'category',
              data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月'
              ],
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: { color: '#fff', fontSize: 16 },
              axisLine: { show: true, lineStyle: { color: '#0051A2' } },
              axisTick: { show: false },
              splitLine: { show: false, lineStyle: { color: '#0051A2' } } // grid
            }
          ],
          yAxis: {
            type: 'value',
            axisLine: { show: true, lineStyle: { color: '#0051A2' } },
            splitLine: { show: true, lineStyle: { color: '#0051A2' } }, // grid
            axisLabel: { color: '#fff', fontSize: 16 }
          },
          grid: {
            left: '2%',
            show: true,
            right: '3%',
            top: '5%',
            height: '280px',
            containLabel: true,
            borderColor: '#0051A2',
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
          },
          series: [
            {
              name: '整体',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              data: val.yData,
              markLine: {
                data: [
                  {
                    type: 'average',
                    name: '平均值',
                    symbol: 'none',
                    label: {
                      position: 'insideEndTop',
                      distance: 10,
                      color: '#EC42D6'
                    },
                    lineStyle: {
                      color: '#EC42D6',
                      type: 'solid'
                    }
                  }
                ]
              },
              itemStyle: {
                color: '#000',
                borderColor: '#FDDC08',
                borderWidth: 1
              },
              lineStyle: {
                color: '#FDDC08',
                width: 1
              }
            },
            {
              name: '平均值',
              type: 'line'
            }
          ]
        };
        if (chartRef.value) {
          chartRef.value.initChart(options);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );

    return () => {
      const height = '350px';
      const width = '100%';
      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      );
    };
  }
});
