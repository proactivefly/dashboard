import moment from 'moment';
// 获取当近一年时间段
function getCurrentYearRange(format = 'YYYY-MM-DD') {
  let beforeYear = moment().subtract(1, 'years').format('YYYY-MM');
  let nowYear = moment().format('YYYY-MM');
  let monthArr = getMonthBetween(beforeYear, nowYear)['months'];
  return {
    startTime: beforeYear + '-01',
    endTime: nowYear + '-01', //注意只取月初，服务端要求
    months: monthArr,
    nowDate: moment().format('YYYY-MM-DD') //当月几号
  };
}
// 获取年份之间月份数组
function getMonthBetween(startYear, endYear) {
  const startDate = moment(startYear);
  const endDate = moment(endYear);
  const allYearMonth = [];
  const months = [];
  while (endDate > startDate || startDate.format('M') === endDate.format('M')) {
    allYearMonth.push(startDate.format('YYYY-MM'));
    months.push(startDate.format('M') + '月');
    startDate.add(1, 'month');
  }
  return {
    yearMonths: allYearMonth,
    months: months
  };
}
// 获取当前月 月初到月末
function getCurrentMonthRange() {
  let monthStart = moment().month(moment().month()).startOf('month').format('YYYY-MM-DD');
  let monthEnd = moment().month(moment().month()).endOf('month').format('YYYY-MM-DD');
  return {
    monthStart,
    monthEnd
  };
}
export function useTime() {
  return {
    getCurrentYearRange,
    getCurrentMonthRange
  };
}
