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
          grid: {
            top: '15%',
            left: '3%',
            right: '10%',
            bottom: '15%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            formatter: (value) => {
              let result = value[0];
              return `
                <div>${result.axisValue}</div>
                <div>
                  <span class="chart-item-style" style="background-color:${result.borderColor}"></span>
                  ${result.seriesName}：${result.value}次
                </div> 
              `;
            }
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
              name: '产品总发版次数',
              type: 'line',
              symbol: 'circle',
              symbolSize: 6,
              data: val.yData,
              itemStyle: {
                color: '#000',
                borderColor: '#F3AA16',
                borderWidth: 1
              },
              lineStyle: {
                color: '#F3AA16',
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
