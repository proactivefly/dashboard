import { useMessage } from '@/hooks/useMessage';
import { useUserStoreWithOut } from '@/store/modules/user';

const { createMessage } = useMessage();
const error = createMessage.error!;

export function checkStatus(status: number, msg: string): void {
  const userStore = useUserStoreWithOut();
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      userStore.setToken(undefined);
      userStore.logout();
      errMessage = msg || '用户没有权限（令牌、用户名、密码错误）!';
      break;
    case 403:
      errMessage = '用户得到授权，但是访问是被禁止的。!';
      break;
    // 404请求不存在
    case 404:
      errMessage = '网络请求错误,未找到该资源!';
      break;
    case 405:
      errMessage = '网络请求错误,请求方法未允许!';
      break;
    case 500:
      errMessage = '服务器错误,请联系管理员!';
      break;
    case 501:
      errMessage = '网络未实现!';
      break;
    case 504:
      errMessage = '网络超时!';
      break;
    case 505:
      errMessage = 'http版本不支持该请求!';
      break;
    default:
  }

  if (errMessage) {
    error({ content: errMessage, key: `global_error_message_status_${status}` });
  }
}
