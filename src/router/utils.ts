import { getLocalStorage } from '@/utils/storage';
import { StorageEnum } from '@/enums/storageEnum';
import { cryptoDecode } from '@/utils/crypto';
import router from '@/router';
import { useMessage } from '@/hooks/useMessage';

const { createMessage } = useMessage();
/**
 * * 判断是否登录（现阶段是有 login 数据即可）
 * @return boolean
 */
export const loginCheck = () => {
  try {
    const info = getLocalStorage(StorageEnum.ACCESS_TOKEN_STORE);
    if (!info) return false;
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * * 根据名字跳转路由
 * @param pageName
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByName = (pageName: string, isReplace?: boolean, windowOpen?: boolean) => {
  if (windowOpen) {
    const path = fetchPathByName(pageName, 'href');
    openNewWindow(path);
    return;
  }
  if (isReplace) {
    router.replace({
      name: pageName
    });
    return;
  }
  router.push({
    name: pageName
  });
};

/**
 * * 根据名称获取路由信息
 * @param pageName
 * @param pageName
 */
export const fetchPathByName = (pageName: string, p?: string) => {
  try {
    const pathData = router.resolve({
      name: pageName
    });
    return p ? (pathData as any)[p] : pathData;
  } catch (error) {
    createMessage.error('查询路由信息失败，请联系管理员！');
  }
};
/**
 * * 新开页面
 * @param url
 */
export const openNewWindow = (url: string) => {
  return window.open(url, '_blank');
};
