import { defineComponent, watch, ref, shallowReactive } from 'vue';
// 声明类型
const PropsType = {
  cdata: {
    type: Object,
    require: true
  }
} as const;

// 定义主体
export default defineComponent({
  props: PropsType,
  setup(props) {
    const chartRef = ref();
    let options: any = shallowReactive({});
    watch(
      () => props.cdata,
      (val: any) => {
        options = {
          tooltip: {
            trigger: 'axis',
            formatter: (value) => {
              let result = value[0];
              return `
                <div>${result.axisValue}</div>
                <div>
                  <span class="chart-item-style" style="background-color:${result.color}"></span>
                  ${result.seriesName}：${result.value}个
                </div> 
              `;
            }
          },
          grid: {
            top: '15%',
            left: '3%',
            right: '10%',
            bottom: '15%',
            containLabel: true
          },
          legend: {
            itemGap: 40,
            data: [
              { name: '总bug数' },
              {
                name: '平均值',
                itemStyle: { color: 'red', opacity: 0 },
                lineStyle: { color: 'red' }
              }
            ],
            bottom: '0%',
            selectedMode: false,
            itemStyle: {
              color: '#FADD21'
            },
            itemWidth: 40
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: val.xData,
            axisLabel: {
              interval: 0
            },
            axisLine: { show: true, lineStyle: { color: '#0051A2' } },
            axisTick: { show: false },
            splitLine: { show: false, lineStyle: { color: '#0051A2' } } // grid
          },
          yAxis: {
            type: 'value',
            axisLine: { show: true, lineStyle: { color: '#0051A2' } },
            splitLine: { show: true, lineStyle: { color: '#0051A2' } } // grid
          },
          series: [
            {
              name: '总bug数',
              type: 'line',
              smooth: true,
              data: val.yData,
              symbol: 'circle',
              symbolSize: 6,
              markLine: {
                label: {
                  color: '#25F1FE'
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
                      color: '#25F1FE',
                      type: 'solid'
                    }
                  }
                ]
              },
              itemStyle: {
                color: '#FADD21',
                borderColor: '#FADD21',
                borderWidth: 1
              },
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
              }
            },
            {
              name: '平均值',
              type: 'line'
            }
          ]
        };
        // 手动触发更新
        if (chartRef.value) {
          // 通过初始化参数打入数据
          chartRef.value.initChart(options);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );

    return () => {
      const height = '210px';
      const width = '100%';
      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      );
    };
  }
});
