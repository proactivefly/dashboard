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
            trigger: 'item'
          },
          legend: {
            bottom: '0%',
            // type: 'scroll',
            left: 'center',
            width: 350,
            itemStyle: {
              borderWidth: 0
            },
            itemWidth: 18,
            itemHeight: 18,
            itemGap: 20,
            textStyle: { color: '#fff', fontSize: 18 },
            pageTextStyle: {
              color: '#fff'
            },
            pageIconColor: '#fff',
            pageIconInactiveColor: '#aaa'
          },
          title: {
            text: val.title,
            top: '36%',
            textAlign: 'center',
            left: '49%',
            textStyle: {
              color: '#fff',
              fontSize: 16,
              fontWeight: '400'
            }
          },
          series: [
            {
              name: val.title,
              type: 'pie',
              top: 0,
              radius: ['45%', '60%'],
              center: ['50%', '40%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderColor: '#143B4C',
                borderWidth: 6
              },
              label: {
                show: true,
                position: 'outside',
                color: '#fff',
                formatter: (value) => {
                  return value.value;
                }
              },

              labelLine: {
                show: true,
                length: 0,
                length2: 30,
                showAbove: true
              },
              // emphasis: {
              //   label: {
              //     show: true,
              //     fontSize: '40',
              //     fontWeight: 'bold'
              //   }
              // },
              data: val.data
            },
            {
              type: 'pie',
              radius: ['40%', '43%'],
              center: ['50%', '40%'],
              silent: true,
              emptyCircleStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#63A3FF' },
                    { offset: 0.5, color: '#B6DCFF' },
                    { offset: 1, color: '#72BEFF' }
                  ],
                  global: false // 缺省为 false
                }
              },
              label: { show: false }
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
      const height = '400px';
      const width = '100%';
      return (
        <div>
          <echart ref={chartRef} height={height} width={width} />
        </div>
      );
    };
  }
});
