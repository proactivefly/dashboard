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
    const currentMonth = new Date().getMonth() + 1 + '月';
    watch(
      () => props.cdata,
      (val: any) => {
        options = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            top: '15%',
            left: '3%',
            right: '7%',
            bottom: '15%',
            containLabel: true
          },
          label: {
            show: true,
            position: 'top'
          },
          legend: {
            itemGap: 40,
            data: [
              { name: currentMonth },
              {
                name: '平均值',
                itemStyle: { color: 'red', opacity: 0 },
                lineStyle: { color: 'red' }
              }
            ],
            bottom: '0%',
            selectedMode: false,
            itemStyle: {
              color: '#00F2FE'
            },
            itemWidth: 40
          },
          xAxis: {
            type: 'category',
            data: ['智农', '惠农', '助手', '大师', '中台', 'AI', '种子', '科研平台'],
            axisLine: { show: true, lineStyle: { color: '#0051A2' } },
            axisTick: { show: false },
            splitLine: { show: false, lineStyle: { color: '#0051A2' } }, // grid
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: 'value',
            max: function (value) {
              return value.max + 0.2;
            },
            axisLine: { show: true, lineStyle: { color: '#0051A2' } },
            splitLine: { show: true, lineStyle: { color: '#0051A2' } } // grid
          },
          series: [
            {
              name: currentMonth,
              type: 'bar',
              data: val.yData,
              barWidth: 20,
              markLine: {
                label: {
                  color: 'red'
                },
                data: [
                  {
                    type: 'average',
                    name: '平均值',
                    symbol: 'none',
                    label: {
                      position: 'end'
                    },
                    lineStyle: {
                      color: 'red',
                      type: 'solid'
                    }
                  }
                ]
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
                    { offset: 0, color: '#00F2FE' },
                    { offset: 0.6, color: '#00F2FE' },
                    { offset: 1, color: '#4FACFE' }
                  ],
                  global: false // 缺省为 false
                }
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
      const height = '250px';
      const width = '100%';
      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      );
    };
  }
});
