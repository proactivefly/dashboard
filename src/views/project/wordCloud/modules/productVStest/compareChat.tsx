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
            data: ['生产环境bug', '测试环境bug'],
            bottom: '0%',
            itemGap: 40,
            itemWidth: 32,
            itemHeight: 21
          },
          label: {
            show: true,
            position: 'top'
          },
          xAxis: [
            {
              type: 'category',
              data: ['智农', '助手', '惠农', '大师', '中台', 'AI', '种子', '科研平台'],
              axisPointer: {
                type: 'shadow'
              },
              axisLine: { show: true, lineStyle: { color: '#0051A2' } },
              axisTick: { show: false },
              splitLine: { show: false, lineStyle: { color: '#0051A2' } } // grid
            }
          ],
          yAxis: {
            type: 'value',
            axisLine: { show: true, lineStyle: { color: '#0051A2' } },
            splitLine: { show: true, lineStyle: { color: '#0051A2' } }, // grid
            max: function (value) {
              return value.max + 5;
            }
          },
          grid: {
            left: '2%',
            show: true,
            right: '3%',
            top: '5%',
            containLabel: true,
            borderColor: '#0051A2',
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
          },
          series: [
            {
              name: '生产环境bug',
              type: 'bar',
              label: {
                color: '#FEF90C',
                fontSize: 20
              },
              barWidth: 32,
              tooltip: {
                valueFormatter: function (value: number) {
                  return value + '个';
                }
              },
              itemStyle: {
                borderRadius: [5, 5, 0, 0],
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#FEF90C' },
                    { offset: 1, color: '#FFFD9D' }
                  ],
                  global: false // 缺省为 false
                }
              },
              data: val.yData1
            },
            {
              name: '测试环境bug',
              type: 'bar',
              barWidth: 32,
              label: {
                color: '#4FACFE',
                fontSize: 20
              },
              tooltip: {
                valueFormatter: function (value: number) {
                  return value + '个';
                }
              },
              itemStyle: {
                borderRadius: [5, 5, 0, 0],
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#4FACFE' },
                    { offset: 1, color: '#00F2FE' }
                  ],
                  global: false // 缺省为 false
                }
              },
              data: val.yData2
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
      const height = '500px';
      const width = '100%';
      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      );
    };
  }
});
