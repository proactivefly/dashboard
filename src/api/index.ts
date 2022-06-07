import request from '@/utils/http';
import { useRequest } from '@/hooks';
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  });
};

export const useLogin = (data) => {
  return useRequest(login, data);
};

export const doLogout = () => {
  return request({
    url: '/sys/logut',
    method: 'POST'
  });
};

// 按月统计年度bug
export const getBugTotal = (params) => {
  return request({
    url: '/bugs/list/total',
    method: 'GET',
    data: params
  });
};
// 年度需求总数
export const getDemandTotal = (params) => {
  return request({
    url: '/requirements/list/total',
    method: 'GET',
    data: params
  });
};
// 一年产品总发版次数
export const getReleaseTimes = (params) => {
  return request({
    url: '/release/list/total',
    method: 'GET',
    data: params
  });
};
// 各部门人员情况
export const getDepartMembers = (params) => {
  return request({
    url: '/user/dept',
    method: 'GET',
    data: params
  });
};
// 后台按产品维度统计本月千行代码缺陷密度
export const getCodeDefectByProduct = (params) => {
  return request({
    url: '/defectrate/project/list/total',
    method: 'GET',
    data: params
  });
};
// 每月测试环境与生产环境bug比值
export const bugTestVSprod = (params) => {
  return request({
    url: '/envbug/list/total',
    method: 'GET',
    data: params
  });
};
