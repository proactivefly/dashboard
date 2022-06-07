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
            data: ['智农', '助手', '惠农', '大师', '中台', 'AI', '种子', '科研平台'],
            bottom: '0%',
            itemGap: 20,
            itemStyle: { opacity: 0 },
            itemWidth: 30
          },
          label: {
            show: true,
            position: 'top'
          },
          xAxis: [
            {
              type: 'category',
              data: val.xData,
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
              data: val.zhinong,
              type: 'line',
              symbol: 'none',
              smooth: true,
              name: '智农'
            },
            {
              data: val.huinong,
              type: 'line',
              symbol: 'none',
              smooth: true,
              name: '惠农'
            },
            {
              data: val.zhushou,
              type: 'line',
              symbol: 'none',
              smooth: true,
              name: '助手'
            },
            {
              data: val.dashi,
              type: 'line',
              symbol: 'none',
              smooth: true,
              name: '大师'
            },
            {
              data: val.zhongtai,
              type: 'line',
              symbol: 'none',
              smooth: true,
              name: '中台'
            },
            {
              data: val.ai,
              type: 'line',
              symbol: 'none',
              smooth: true,
              name: 'AI'
            },
            {
              data: val.zhongzi,
              type: 'line',
              symbol: 'none',
              smooth: true,
              name: '种子'
            },
            {
              data: val.keyan,
              type: 'line',
              symbol: 'none',
              smooth: true,
              name: '科研平台'
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
