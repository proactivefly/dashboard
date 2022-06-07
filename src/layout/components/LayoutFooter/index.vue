<template>
  <div class="go-footer">
    <slot>
      <a-space :size="50">
        <a-text depth="3">
          <a italic href="https://beian.miit.gov.cn/" target="_blank"> 京ICP备2021034585号-1 </a>
        </a-text>
      </a-space>
    </slot>
  </div>
</template>
<style lang="scss" scoped>
@include go(footer) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 40px;
  height: $--footer-height;
}
</style>
