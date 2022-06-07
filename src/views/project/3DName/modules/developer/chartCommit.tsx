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
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item'
          },
          legend: {
            itemGap: 40,
            itemStyle: { opacity: 0 },
            data: [
              { name: '每月提交代码数' },
              {
                name: '平均值',
                lineStyle: { color: 'red' }
              }
            ],
            bottom: '0%',
            selectedMode: false
          },
          grid: {
            left: '2%',
            show: true,
            height: '198px',
            right: '3%',
            top: '13%',
            containLabel: true,
            borderColor: '#0051A2',
            backgroundColor: 'rgba(255, 255, 255, 0.05)'
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
              name: '每月提交代码数',
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
                      distance: 10
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
      const height = '300px';
      const width = '100%';
      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      );
    };
  }
});
