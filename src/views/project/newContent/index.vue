<template>
  <div class="wrapper">
    <div class="title">4月上新内容</div>
    <div class="content">
      <ScrollBoard class="dv-scr-board" :config="config" @click="selectRow" />
    </div>
  </div>
  <DetailModal ref="detailModalDom" />
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import DetailModal from './modal.vue';
  import { ScrollBoard } from '@kjgl77/datav-vue3';
  export default defineComponent({
    components: { ScrollBoard, DetailModal },
    setup() {
      const detailModalDom = ref(null);
      const config = reactive({
        header: ['上线时间', '产品名称', '版本', '更新内容'],
        data: [
          ['4.11', '风来了', '10', '我是大数据大数据我是我是睡我家喂技术顶峰'],
          ['5.11', '雨来了', '9', '我是大数据大数据我是'],
          ['6.11', 'Map二期', '8', '我是大数据大数据我是'],
          ['7.11', 'Map二期', '7', '我是大数据大数据我是上新啦上新啦上新啦'],
          ['4.11', '232', '6', '我是大数据大数据我是'],
          ['4.11', 'Map二期', '5', '我是大数据大数据我是'],
          ['4.11', 'Map二期', '5', '我是大数据大数据我是'],
          ['4.11', '34', '3', '我是大数据大数据我是'],
          ['4.11', 'Map五期', '2', '我是大数据大数据我是'],
          ['4.15', 'Map二期', '1', '我是大数据大数据我是'],
        ],
        rowNum: 7, //表格行数
        // waitTime: 100000000,
        headerHeight: 45,
        headerBGC: 'transparent', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        // index: true,
        columnWidth: [100, 120, 60, 250],
        align: ['center'],
      });
      const selectRow = (row) => {
        detailModalDom.value.clickModal(row.row);
      };
      return { config, selectRow, detailModalDom };
    },
  });
</script>

<style lang="scss" scoped>
  $height: 508px;
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
  }
  @include deep() {
    .dv-scroll-board .header .header-item {
      font-size: 17px;
      font-weight: bold;
      color: #30e8fd;
    }
    .dv-scroll-board .rows .row-item {
      font-size: 19px;
    }
  }
</style>
