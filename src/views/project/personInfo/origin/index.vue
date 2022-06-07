<template>
  <div class="chart">
    <!-- B端 -->
    <div class="item B" @click="jump(departInfo['B端'])">
      <div class="text">{{ departInfo['B端'].dept_name }}</div>
      <div class="num">{{ departInfo['B端'].total }}人</div>
      <div class="out">
        <img :src="icImg" class="img i1" />
        <img :src="icImg" class="img i2" />
        <div class="line l1"></div>
      </div>
    </div>
    <div class="item C" @click="jump(departInfo['C端'])">
      <div class="text">{{ departInfo['C端'].dept_name }}</div>
      <div class="num">{{ departInfo['C端'].total }}人</div>
      <div class="out">
        <div class="line l1"></div>
      </div>
    </div>
    <div class="item Z" @click="jump(departInfo['中台'])">
      <div class="text">{{ departInfo['中台'].dept_name }}</div>
      <div class="num">{{ departInfo['中台'].total }}人</div>
      <div class="out">
        <img :src="icImg" class="img i1" />
        <div class="line l1"></div>
      </div>
    </div>
    <div class="item T" @click="jump(departInfo['测试'])">
      <div class="text">{{ departInfo['测试'].dept_name }}</div>
      <div class="num">{{ departInfo['测试'].total }}人</div>
      <div class="out">
        <img :src="icImg" class="img i1" />
        <div class="line l1"></div>
      </div>
    </div>
    <div class="item U" @click="jump(departInfo['UED'])">
      <div class="text">{{ departInfo['UED'].dept_name }}</div>
      <div class="num">{{ departInfo['UED'].total }}人</div>
      <div class="out">
        <img :src="icImg" class="img i1" />
        <div class="line l1"></div>
      </div>
    </div>
    <div class="center">
      <span> MAP研发</span>
      <img src="../../../../assets/project/img_center.png" class="img" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import icImg from '@/assets/project/img_ic.png';
import { useRouter } from 'vue-router';
import { defineProps, computed } from 'vue';
const router = useRouter();
const props = defineProps({
  departInfo: {
    type: Object,
    default: () => ({
      B端: { total: 0, dept_name: 'B端' },
      C端: { total: 0, dept_name: 'C端' },
      测试: { total: 0, dept_name: '测试' },
      UED: { total: 0, dept_name: 'UED' },
      中台: { total: 0, dept_name: '中台' }
    })
  }
});

const departInfo = computed(() => {
  return props.departInfo;
});
function jump(item) {
  router.push({ path: '/departInfo', query: item });
}
</script>

<style lang="scss" scoped>
.chart {
  position: relative;
  text-align: center;
  width: 100%;
  height: 260px;
  margin-top: -10px;
  .center {
    position: absolute;
    top: 79px;
    left: 158px;
    width: 151px;
    height: 151px;
    line-height: 151px;
    .img {
      position: absolute;
      left: 0px;
      z-index: 10;
      animation: roro 10s ease-in infinite;
    }
  }
  .item {
    width: 70px;
    height: 70px;
    border: 2px solid #00a7bb;
    color: #fff;
    font-weight: 400;
    position: absolute;
    background: linear-gradient(158deg, #00f2fe, #004edc);
    border-radius: 50%;
    cursor: pointer;
    .text {
      margin-top: 12px;
      font-size: 13px;
    }
    .num {
      font-size: 20px;
      line-height: 19px;
    }
    &.B {
      left: 21px;
      top: 68px;
      .i1 {
        top: -11px;
        right: -71px;
      }
      .i2 {
        top: 81px;
        right: 23px;
        transform: rotate(130deg);
      }
      .l1 {
        left: 62px;
        top: 60px;
        width: 107px;
        transform: rotate(16deg);
      }
    }
    &.C {
      left: 93px;
      top: 181px;
      .i1 {
        left: -2px;
        top: -62px;
        transform: rotate(-65deg);
      }
      .l1 {
        left: 58px;
        top: 5px;
        width: 46px;
        transform: rotate(-37deg);
      }
    }
    &.U {
      right: 93px;
      top: 36px;
      .i1 {
        left: -72px;
        top: -7px;
        transform: rotate(-140deg);
      }
      .l1 {
        left: -36px;
        top: 75px;
        width: 53px;
        transform: rotate(135deg);
      }
    }
    &.Z {
      right: 75px;
      bottom: 0px;
      .i1 {
        left: 71px;
        top: 30px;
        transform: rotate(35deg);
      }
      .l1 {
        left: -58px;
        top: -1px;
        width: 66px;
        transform: rotate(213deg);
      }
    }
    &.T {
      right: 0px;
      top: 92px;
      .i1 {
        left: -2px;
        top: -62px;
        transform: rotate(-65deg);
      }
      .l1 {
        left: -121px;
        top: 51px;
        width: 122px;
        transform: rotate(172deg);
      }
    }
    .img {
      width: 69px;
      height: 41px;
      position: absolute;
    }
    .line {
      position: absolute;
      width: 10px;
      border: 1px solid;
      border-image: linear-gradient(216deg, #4bf8ff, #006ed1) 10 10;
    }
  }
}
</style>
