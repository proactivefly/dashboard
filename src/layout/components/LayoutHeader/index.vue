<template>
  <a-layout-header bordered class="go-header">
    <header class="go-header-box">
      <div class="header-item left">
        <a-space>
          <slot name="left"></slot>
        </a-space>
      </div>
      <div class="header-item center">
        <slot name="center"></slot>
      </div>
      <div class="header-item right">
        <a-space>
          <slot name="ri-left"> </slot>
          <slot name="ri-right"> </slot>
        </a-space>
      </div>
    </header>
  </a-layout-header>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@include go(header) {
  &-box {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    .header-item {
      display: flex;
      align-items: center;
      &.left {
        justify-content: start;
      }
      &.center {
        justify-content: center;
      }
      &.right {
        justify-content: end;
      }
    }
    height: $--header-height;
    padding: 0 60px;
  }
}
</style>
