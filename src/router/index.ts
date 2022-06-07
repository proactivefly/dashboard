import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './router-guards';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/project'
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/demo/index.vue')
  },
  {
    path: '/project',
    name: PageEnum.BASE_HOME_NAME,
    component: () => import('@/views/project/index.vue')
  },
  {
    path: '/departInfo',
    name: PageEnum.DEPART_INFO_NAME,
    component: () => import('@/views/project/departInfo.vue')
  },
  {
    path: '/login',
    name: PageEnum.BASE_LOGIN_NAME,
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/error/404',
    name: PageEnum.ERROR_PAGE_NAME_404,
    component: () => import('@/views/exception/404.vue')
  },
  {
    path: '/error/403',
    name: PageEnum.ERROR_PAGE_NAME_403,
    component: () => import('@/views/exception/403.vue')
  },
  {
    path: '/error/500',
    name: PageEnum.ERROR_PAGE_NAME_500,
    component: () => import('@/views/exception/500.vue')
  },
  {
    path: '/:path(.*)*',
    name: PageEnum.ERROR_PAGE_NAME_404,
    component: () => import('@/views/exception/404.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
