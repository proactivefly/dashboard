import { defineComponent, reactive, watch } from 'vue';
import ProjectStatus from '@/components/projectStatus/index.vue';
import { InterfaceConfig } from '@/components/projectStatus/types';
import { getDemandTotal } from '@/api/index';
import { useTime } from '@/hooks/timeHooks';
import { useGlobal } from '@/store/modules/global';

export default defineComponent({
  components: { ProjectStatus },
  setup() {
    const statusInfo: InterfaceConfig = reactive({
      title: '本月需求完成情况',
      width: 740,
      height: 270,
      numbers: [0, 0, 0]
    });
    enum PROJECT_STATUS {
      DONE = 'DONE', //完成
      DOING = 'DOING', //正在做
      WILLDO = 'WILLDO' // 未开始
    }
    const globalState = useGlobal();
    const { getDemandTotalMonth, getDmandTotalMonth_pending, getDmandTotalMonth_unbegin } =
      useGlobal();
    const { getCurrentYearRange } = useTime();
    const { nowDate, endTime } = getCurrentYearRange(); //最后一个月
    // 注意这的endTime是月初
    const totalTimeRange_pending = reactive({
      after_date: endTime,
      before_date: nowDate,
      type: PROJECT_STATUS.DOING
    });
    // 当月正在开发中
    getDemandTotal(totalTimeRange_pending).then((res: any) => {
      globalState.setDemandTotalMouth_Pending(res.values);
    });

    const totalTimeRange_unbegin = reactive({
      after_date: endTime,
      before_date: nowDate,
      type: PROJECT_STATUS.WILLDO
    });
    // 未开始
    getDemandTotal(totalTimeRange_unbegin).then((res: any) => {
      globalState.setDemandTotalMouth_UnBegin(res.values);
    });
    watch(globalState, () => {
      statusInfo.numbers = [
        getDemandTotalMonth,
        getDmandTotalMonth_pending,
        getDmandTotalMonth_unbegin
      ];
    });
    return () => {
      return <ProjectStatus config={statusInfo} />;
    };
  }
});
