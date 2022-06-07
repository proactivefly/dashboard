<template>
  <div class="table-wrapper">
    <div class="table">
      <div class="table-head">
        <div class="row">
          <div
            class="th"
            v-for="item in props.columns"
            :key="item.key"
            :style="{ width: item.width + 'px' }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="table-body" ref="tableBody" :style="{ maxHeight: props.maxHeight + 'px' }">
        <div class="row" v-for="(item, index) in props.data" :key="index">
          <div
            class="td"
            :style="{ width: props.columns[index].width + 'px' }"
            v-for="(key, index) in fileds"
            :key="key"
          >
            {{ item[key] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { defineProps, ref, nextTick, defineExpose, withDefaults } from 'vue';
import type { IColumn } from './types';

interface ITableProps {
  columns: Array<IColumn>;
  data: Array<any>;
  maxHeight?: number;
}
// 方法一有默认值
const props = withDefaults(defineProps<ITableProps>(), {
  columns: () => [],
  data: () => [],
  maxHeight: 500
});

// 方法二无默认值

// const props=defineProps<ITableProps>();

// 方法三

// const props = defineProps({})

const fileds = computed(() => {
  return props.columns.map((item) => item.key);
});
const tableBody = ref(null);
function scrollTop() {
  tableBody.value.scrollTop = 0;
}

defineExpose({
  scrollTop
});
</script>
<style lang="scss" scoped>
.table {
  border: 1px solid #0051a2;
  border-radius: 6px;
  .table-head {
    .row {
      height: 69px;
    }
  }
  .table-body {
    overflow-y: auto;
  }
}
.row {
  display: flex;
  flex-direction: row;
  .th,
  .td {
    padding: 18px;
    font-size: 25px;
    border-right: 1px solid #0051a2;
    border-top: 1px solid #0051a2;
    display: flex;
    line-height: 30px;
    justify-content: flex-start;
  }
  .th {
    color: #48c5f5;
    height: 100%;
    &:last-child {
      flex: 1;
      border-right: none;
    }
  }
  .td {
    color: #fff;
    &:last-child {
      flex: 1;
      border-right: none;
    }
  }
}
</style>
