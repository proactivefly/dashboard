import type { UserInfo } from '#/store';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { PageEnum } from '@/enums/pageEnum';
import { StorageEnum } from '@/enums/storageEnum';
import { login, doLogout } from '@/api';
import { useMessage } from '@/hooks/useMessage';
import { routerTurnByName } from '@/router/utils';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { LoginParams, GetUserInfo } from '@/api/types';
const { createMessage } = useMessage();

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getLocalStorage(StorageEnum.USER_INFO_STORE) || {};
    },
    getToken(): string {
      return this.token || getLocalStorage(StorageEnum.ACCESS_TOKEN_STORE);
    }
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setLocalStorage(StorageEnum.ACCESS_TOKEN_STORE, info);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      setLocalStorage(StorageEnum.USER_INFO_STORE, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
    },
    /**
     * @description: login
     */
    async login(params: LoginParams): Promise<GetUserInfo | null> {
      try {
        const data = await login(params);
        // const { token } = data;
        return this.afterLoginAction();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(): Promise<null> {
      if (!this.getToken) return null;
      // get user info
      // const userInfo = await this.getUserInfoAction();
      // return userInfo;
      routerTurnByName(PageEnum.BASE_HOME_NAME);
    },
    async logout() {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          createMessage.error('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setUserInfo(null);
      routerTurnByName(PageEnum.BASE_LOGIN, true);
    }
  }
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
