import type { AxiosRequestConfig} from 'axios';

export interface RequestConfig{
    url:string,
    data?:any,
    method?:TypesMethod,
    params?:any;
    options?:AxiosRequestConfig,
    contentType?:'json'|'urlencoded'|'multipart'
    prefixUrl?:'api',
    timeout?: number;
    responseType?: ResponseType;
}

export type TypesMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'|'HEAD'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'


export interface AxiosResponse {
    data: any;
    headers: any;
    request?: any;
    status: number;
    statusText: string;
    config: RequestConfig;
}