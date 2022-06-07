<template>
  <div class="go-login-box">
    <div class="go-login-box-bg">
      <aside class="bg-img-box">
        <transition-group name="list-complete">
          <template v-for="item in bgList" :key="item">
            <div class="bg-img-box-li list-complete-item">
              <img :src="getImageUrl(item, 'chart/charts')" alt="chart" />
            </div>
          </template>
        </transition-group>
      </aside>
    </div>
    <!-- 登录框 -->
    <div class="go-login">
      <div class="go-login-carousel">
        <Carousel dots autoplay>
          <img
            v-for="(item, i) in carouselImgList"
            :key="i"
            class="go-login-carousel-img"
            :src="getImageUrl(item, 'login')"
            alt="image"
          />
        </Carousel>
      </div>
      <div class="login-account">
        <div class="login-account-container">
          <div class="translate">
            <a-card class="login-account-card" title="登录">
              <div class="login-account-top">
                <img
                  class="login-account-top-logo"
                  src="~@/assets/images/login/logo.png"
                  alt="展示图片"
                />
              </div>
              <a-form ref="formRef" size="large" :model="formInline" :rules="rules">
                <a-form-item name="username">
                  <a-input v-model:value="formInline.username" placeholder="请输入账号">
                    <template #prefix>
                      <UserOutlined></UserOutlined>
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="password">
                  <a-input-password
                    v-model:value="formInline.password"
                    type="password"
                    placeholder="请输入密码"
                  >
                    <template #prefix>
                      <LockOutlined></LockOutlined>
                    </template>
                  </a-input-password>
                </a-form-item>
                <a-form-item>
                  <div class="flex justify-between">
                    <div class="flex-initial">
                      <a-checkbox v-model:checked="autoLogin">自动登录</a-checkbox>
                    </div>
                  </div>
                </a-form-item>
                <a-form-item>
                  <a-button
                    type="primary"
                    @click="handleSubmit"
                    size="large"
                    :loading="loading"
                    block
                    >登录</a-button
                  >
                </a-form-item>
              </a-form>
            </a-card>
          </div>
        </div>
      </div>
    </div>

    <div class="go-login-box-footer"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import shuffle from 'lodash/shuffle';
import { useMessage } from '@/hooks/useMessage';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Carousel } from 'ant-design-vue';
import { useUserStore } from '@/store/modules/user';
import { InputPassword } from 'ant-design-vue';
const userStore = useUserStore();
const formRef = ref();
const loading = ref(false);
const autoLogin = ref(true);
const { notification, createErrorModal } = useMessage();
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const formInline = reactive<FormState>({
  username: 'admin',
  password: '12345',
  remember: true
});

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
};

// 定时器
const shuffleTimiing = ref();

// 轮播图
const carouselImgList = ['one', 'two', 'three'];

// 背景图
const bgList = ref([
  'bar_y',
  'bar_x',
  'line_gradient',
  'line',
  'funnel',
  'heatmap',
  'map',
  'pie',
  'radar'
]);

// 处理url获取
const getImageUrl = (name: string, folder: string) => {
  return require(`@/assets/images/${folder}/${name}.png`);
};

// 打乱
const shuffleHandle = () => {
  shuffleTimiing.value = setInterval(() => {
    bgList.value = shuffle(bgList.value);
  }, 4000);
};
// 点击事件
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const data = await formRef.value.validate();
  if (!data) return;
  try {
    loading.value = true;
    const userInfo = await userStore.login({
      password: data.password,
      username: data.account
    });
    if (userInfo) {
      notification.success({
        message: '登录成功',
        description: `欢迎您: ${userInfo.realName}`,
        duration: 3
      });
    }
  } catch (error) {
    console.log(error);
    createErrorModal({
      title: '错误提示',
      content: error
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  shuffleHandle();
});
</script>

<style lang="scss" scoped>
$width: 450px;
$go-login-height: 100vh;
$account-img-height: 210px;
$footer-height: 50px;
$carousel-width: 30%;
$carousel-image-height: 60vh;

* {
  box-sizing: border-box;
}
@include go(login-box) {
  height: $go-login-height;
  overflow: hidden;
  background-image: linear-gradient(120deg, #18181c 0%, #18181c 100%);
  @include background-image('background-image');
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: 60px;
  }
  &-divider {
    margin: 0;
    padding-top: 0;
  }
  @include go(login) {
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: $go-login-height;
    width: 100vw;
    &-carousel {
      width: $carousel-width;
      margin-top: 100px;
      min-width: 500px;
      &-img {
        display: block;
        margin: 0 auto;
        height: $carousel-image-height;
      }
    }
    .login-account {
      display: flex;
      flex-direction: column;
      margin: 0 160px;
      &-container {
        width: $width;
        @include deep() {
          .ant-card-head {
            border-bottom: none;
            .translate {
              --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
            }
          }
          .ant-input-affix-wrapper {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      }
      &-card {
        background-color: #232324b3;
        backdrop-filter: blur(20px);
        box-shadow: 0 0 20px 5px #2828284d;
        --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 6px;
        color: rgb(24, 24, 28);
        border-color: rgba(255, 255, 255, 0.09);
        box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.24), 0 3px 6px 0 rgba(0, 0, 0, 0.18),
          0 5px 12px 4px rgba(0, 0, 0, 0.12);
        padding-top: 19px;
        padding-bottom: 20px;
        padding-left: 24px;
        font-size: 14px;
      }

      &-top {
        padding-top: 10px;
        text-align: center;
        height: $account-img-height;
        margin-bottom: 20px;
        .login-account-top-logo {
          width: 150px;
        }
      }
    }
  }

  &-footer {
    z-index: 2;
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  &-bg {
    z-index: 0;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url('../../assets/images/login/login-bg.png') no-repeat 0 -120px;
    padding-left: 38%;
    .bg-img-box {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: 770px;
      margin-right: -20px;
      &-li {
        img {
          margin-right: 20px;
          margin-top: 20px;
          width: 230px;
          border-radius: 16px;
          opacity: 0.9;
        }
      }
    }
  }
}

@media only screen and (max-width: 1200px) {
  .bg-img-box,
  .bg-slot,
  .go-login-carousel {
    display: none !important;
  }
  .go-login-box-footer {
    position: relative;
  }
}

@include deep() {
  .ant-carousel .slick-dots li {
    button {
      background: gray;
    }

    &.slick-active {
      button {
        background: #fff;
      }
    }
  }
}
</style>
