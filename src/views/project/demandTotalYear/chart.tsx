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
            bottom: '5%',
            containLabel: true
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
              name: '各产品线近一年上线总需求数',
              type: 'line',
              smooth: true,
              data: val.yData,
              showSymbol: false,
              lineStyle: {
                color: '#25F1FE',
                width: 2
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
                      color: '#01A88C' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#D6FAF7' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              },
              itemStyle: {
                color: '#00C29F'
              }
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
      const height = '220px';
      const width = '100%';
      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      );
    };
  }
});
