import { defineStore } from 'pinia';
import { sum } from 'lodash-es';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { StorageEnum } from '@/enums/storageEnum';
export const useGlobal = defineStore({
  id: 'global',
  state: () => {
    return {
      demandTotal: 0, //所有上线需求
      demandTotalYear: 0, //当年上线需求,
      demandTotalMonth: 0, //当月 上线需求
      demandMonth_pending: 0, //当月开发中
      demandMonth_unbegin: 0, //当月未开始,
      num: 0
    };
  },
  getters: {
    getDemandTotal() {
      return this.demandTotal || getLocalStorage(StorageEnum.DEMAND_TOTAL) || 0;
    },
    getDemandTotalYear() {
      return this.demandTotalYear || getLocalStorage(StorageEnum.DEMAND_TOTAL_YEAR) || 0;
    },
    getDemandTotalMonth() {
      return this.demandTotalMonth || getLocalStorage(StorageEnum.DEMAND_TOTAL_MONTH) || 0;
    },
    getDmandTotalMonth_pending() {
      return (
        this.demandMonth_pending || getLocalStorage(StorageEnum.DEMAND_TOTAL_MONTH_PENDING) || 0
      );
    },
    getDmandTotalMonth_unbegin() {
      return (
        this.demandMonth_unbegin || getLocalStorage(StorageEnum.DEMAND_TOTAL_MONTH_UNBEGIN) || 0
      );
    }
  },
  actions: {
    setDemandTotal(demandArr = []) {
      this.demandTotal = sum(demandArr);
      setLocalStorage(StorageEnum.DEMAND_TOTAL, this.demandTotal);
    },
    setDemandTotalYear(demandArr) {
      this.demandTotalYear = sum(demandArr);
      setLocalStorage(StorageEnum.DEMAND_TOTAL_YEAR, this.demandTotalYear);
    },
    setDemandTotalMonth(demandArr) {
      this.demandTotalMonth = sum(demandArr);
      setLocalStorage(StorageEnum.DEMAND_TOTAL_MONTH, this.demandTotalMonth);
    },
    setDemandTotalMouth_UnBegin(demandArr) {
      this.demandMonth_pending = sum(demandArr);
      setLocalStorage(StorageEnum.DEMAND_TOTAL_MONTH_PENDING, this.demandMonth_pending);
    },
    setDemandTotalMouth_Pending(demandArr) {
      this.demandMonth_unbegin = sum(demandArr);
      setLocalStorage(StorageEnum.DEMAND_TOTAL_MONTH_UNBEGIN, this.demandMonth_unbegin);
    }
  }
});
export function useGlobalWithOut(store) {
  return useGlobal(store);
}
