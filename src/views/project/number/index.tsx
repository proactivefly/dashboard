import { defineComponent, reactive, watch } from 'vue';
import Number from '@/components/Number/index.vue';
import { getDemandTotal } from '@/api/index';
import { useTime } from '@/hooks/timeHooks';
import { useGlobal } from '@/store/modules/global';
export default defineComponent({
  components: {
    Number
  },
  setup() {
    const globalState = useGlobal();
    const { getCurrentYearRange } = useTime();
    const { endTime } = getCurrentYearRange(); //最后一个月
    const totalTimeRange = reactive({
      after_date: '2016-01-01',
      before_date: endTime,
      type: 'DONE'
    });

    getDemandTotal(totalTimeRange).then((res: any) => {
      globalState.setDemandTotal(res.values);
    });

    const numberConfig = reactive({
      leftInfo: {
        name: `${new Date().getFullYear()}年上线需求数`,
        value: 0
      },
      centerInfo: { name: '所有上线需求总数', value: 0 },
      rightInfo: { name: '本月上线需求数', value: 0 },
      width: 740,
      height: 281
    });

    watch(globalState, (val) => {
      numberConfig.leftInfo.value = val.getDemandTotalYear;
      numberConfig.centerInfo.value = val.getDemandTotal;
      numberConfig.rightInfo.value = val.getDemandTotalMonth;
    });
    return () => {
      return (
        <div>
          <Number config={numberConfig} />
        </div>
      );
    };
  }
});
