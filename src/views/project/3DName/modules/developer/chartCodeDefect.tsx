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
            data: [{ name: '每月本人缺陷密度' }, { name: '每月本产品线缺陷密度' }],
            bottom: '8%',
            itemGap: 30,
            left: '15%',
            itemStyle: { opacity: 0 }
          },
          grid: {
            left: '2%',
            top: '5%',
            show: true,
            height: '198px',
            right: '3%',
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
              name: '每月本人缺陷密度',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              data: val.yData1,
              itemStyle: {
                color: '#202E45',
                borderColor: '#FDDC08',
                borderWidth: 1
              },
              lineStyle: {
                color: '#FDDC08',
                width: 1
              }
            },
            {
              name: '每月本产品线缺陷密度',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 6,
              data: val.yData2,
              itemStyle: {
                color: '#202E45',
                borderColor: '#EC42D6',
                borderWidth: 1
              },
              lineStyle: {
                color: '#EC42D6',
                width: 1
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
