import { defineComponent, reactive } from 'vue';
import Number from '@/components/Number/index.vue';
import ProjectStatus from '@/components/projectStatus/index.vue';
import type { InterfaceConfig } from '@/components/projectStatus/types';
export default defineComponent({
  components: {
    Number,
    ProjectStatus
  },
  setup() {
    const numberConfig = reactive({
      leftInfo: { name: '2000年上线需求数', value: 25400 },
      centerInfo: { name: '所有上线需求总数', value: 25400 },
      rightInfo: { name: '本月上线需求数', value: 25400 },
      width: 520,
      height: 183
    });

    const statusInfo: InterfaceConfig = reactive({
      title: '本月需求完成情况',
      width: 450,
      height: 150,
      numbers: [1212, 1212, 1212]
    });
    return () => {
      return (
        <div class='flex-column-center'>
          <Number config={numberConfig} />
          <ProjectStatus config={statusInfo} />
        </div>
      );
    };
  }
});
