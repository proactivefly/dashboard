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
                  <span class="chart-item-style" style="background-color:${
                    result.borderColor
                  }"></span>
                  ${result.seriesName}：${result.value.toFixed(2)}%
                </div> 
              `;
            }
          },
          legend: {
            itemGap: 40,
            data: [
              { name: '测试环境预生产环境bug比值' },
              {
                name: '平均值',
                itemStyle: { color: 'red', opacity: 0 },
                lineStyle: { color: 'red' }
              }
            ],
            bottom: '0%',
            selectedMode: false,
            itemStyle: {
              color: '#25F1FE'
            },
            itemWidth: 40
          },
          grid: {
            top: '15%',
            left: '3%',
            right: '10%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: val.xData,
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
              name: '测试环境预生产环境bug比值',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              data: val.yData,
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
              markPoint: {
                symbolSize: 40,
                label: {
                  fontSize: 10,
                  color: '#000'
                },
                itemStyle: {
                  color: '#25F1FE'
                },
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },

              itemStyle: {
                color: '#000',
                borderColor: '#25F1FE',
                borderWidth: 1
              },
              lineStyle: {
                color: '#25F1FE',
                width: 1
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
      const height = '240px';
      const width = '100%';
      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      );
    };
  }
});
