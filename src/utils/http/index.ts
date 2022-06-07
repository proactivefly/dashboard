import Request from './request';
import { AxiosResponse } from 'axios';
// import { checkStatus } from './request/checkStatus';
import type { RequestConfig } from './request/types';
import { useMessage } from '@/hooks/useMessage';
import { ResultEnum } from '@/enums/httpEnum';
const { createMessage } = useMessage();
export interface HttpResponse<T> {
  statusCode: number;
  desc: string;
  result: T;
}

// 重写请求类型
interface HttpRequestConfig<T, R> extends RequestConfig<HttpResponse<R>> {
  data?: T;
}

const request = new Request({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => config,
    // 业务层
    responseInterceptors: (response: AxiosResponse) => {
      const {
        data,
        config: { url }
      } = response;
      const { code, result, message } = response.data;
      // 后台统一返结果，以下判断没用
      if (code == 500) {
        createMessage.error(`系统错误:${url} 状态码:${code}`);
        throw new Error(message);
      } else {
        return data;
      }

      // const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
      // if (hasSuccess) {
      //   return result;
      // } else {
      //   checkStatus(code, message);
      //   return result;
      //   createMessage.error(message);
      //   // throw new Error(message);
      // }
    },
    // 网络层报错
    responseInterceptorsCatch: (error) => {
      const { code, message } = error || {};
      const err: string = error?.toString?.() ?? '';
      let errMessage = '';
      // 判断是否属于超时 或者网络异常，不是就走checkStatus
      try {
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
          errMessage = '请求超时';
        }
        if (err?.includes('Network Error')) {
          errMessage = '';
        }
        createMessage.error(errMessage);
        // 等价于 new Promise(error => reject(error))
        return Promise.reject(error);
      } catch (error) {
        console.log(error);
        throw new Error(error as unknown as string);
      }
    }
  }
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {HttpRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const HttpRequest = <D = any, T = any>(config: HttpRequestConfig<D, T>) => {
  const { method = 'GET' } = config;
  if (method === 'get' || method === 'GET') {
    config.params = config.data;
  }
  return request.request<HttpResponse<T>>(config);
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default HttpRequest;
