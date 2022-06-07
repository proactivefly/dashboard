<template>
  <div class="wrapper">
    <div class="title">开发人员缺陷密度TOP10</div>
    <div class="content">
      <ScrollBoard class="dv-scr-board" :config="config" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ScrollBoard } from '@kjgl77/datav-vue3';
export default defineComponent({
  components: { ScrollBoard },
  setup() {
    const config = reactive({
      header: ['姓名', '代码数', 'bug数', '缺陷密度'],
      data: [
        ['张三1', '1232', '10', '0.3'],
        ['张三1', '3432', '9', '0.2'],
        ['张三-3', '2333', '8', '0.5'],
        ['张三-4', '343', '7', '0.6'],
        ['张三-5', '232', '6', '0.6'],
        ['张三-6', '2323', '5', "<span  class='colorGrass'>0.65</span>"],
        ['张三-7', '343', '5', "<span  class='colorGrass'>0.67</span>"],
        ['张三-8', '34', '3', "<span  class='colorRed'>0.34</span>"],
        ['张三-9', '343', '2', "<span  class='colorRed'>0.23</span>"],
        ['张三-10', '343', '1', "<span  class='colorGrass'>0.43</span>"]
      ],
      rowNum: 7, //表格行数
      headerHeight: 45,
      headerBGC: 'transparent', //表头
      oddRowBGC: '#0f1325', //奇数行
      evenRowBGC: '#171c33', //偶数行
      // index: true,
      columnWidth: [100],
      align: ['center']
    });
    return { config };
  }
});
</script>

<style lang="scss" scoped>
$height: 413px;
.wrapper {
  padding: 18px 16px;
  height: $height;
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  .content {
    margin-top: 10px;
    height: $height - 36px - 28px;
  }
  @include deep() {
    .dv-scroll-board .rows .row-item {
      font-size: 17px;
    }
  }
}
</style>
