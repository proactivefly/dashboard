<template>
  <div class="wrapper">
    <div class="title">
      <span>研发各部门人员情况</span>
    </div>
    <div>
      <origin :departInfo="departInfo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import Origin from './origin/index.vue';
import { getDepartMembers } from '@/api/index';
export default defineComponent({
  components: {
    Origin
  },
  setup() {
    const departInfo = reactive({
      B端: { total: 0, dept_name: 'B端' },
      C端: { total: 0, dept_name: 'C端' },
      测试: { total: 0, dept_name: '测试' },
      UED: { total: 0, dept_name: 'UED' },
      中台: { total: 0, dept_name: '中台' }
    });

    function resetArr(arr) {
      let obj = {};
      arr.map((item) => {
        obj[item.dept_name] = item;
      });
      return obj;
    }
    onMounted(() => {
      getDepartMembers({ parent_id: 101 }).then((res) => {
        Object.assign(departInfo, resetArr(res));
      });
    });
    return {
      departInfo
    };
  }
});
</script>

<style lang="scss" scoped>
$box-height: 328px;
$box-width: 100%;
.wrapper {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .title {
    margin-top: 8px;
    span {
      height: 20px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
