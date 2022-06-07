import { Router } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { loginCheck } from './utils';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: true }); // NProgress Configuration
export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === to.name);
    if (isErrorPage === -1) {
      next({ name: PageEnum.ERROR_PAGE_NAME_404 });
    }
    // if (!loginCheck()) {
    if (false) {
      // 目前没登录
      if (to.name === PageEnum.BASE_LOGIN_NAME) {
        next();
      }
      next({ name: PageEnum.BASE_LOGIN_NAME });
    }
    next();
  });

  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title;
    NProgress.done();
  });

  // 错误
  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
