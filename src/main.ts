import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from '@/store';
// 引入全局css
import './assets/scss/style.scss';
// 引入 全局注册组件
import PublicComponent from '@/components/componentInstall';
import { registerGlobComp } from '@/components/registerGlobComp';
const app = createApp(App);
app.use(PublicComponent);
registerGlobComp(app);
setupStore(app);
setupRouter(app);
app.mount('#app');
