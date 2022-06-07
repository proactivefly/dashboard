export function moment(timestamps = null) {
  const d = timestamps ? new Date(timestamps) : new Date();
  const [year, month, day, hour, minute, second]: string[] = [
    String(d.getFullYear()),
    String(d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`),
    String(d.getDate() >= 10 ? d.getDate() : `0${d.getDate()}`),
    String(d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`),
    String(d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`),
    String(d.getSeconds() >= 10 ? d.getSeconds() : `0${d.getSeconds()}`)
  ];

  return {
    format(patterns = 'YYYY-MM-DD HH:mm:SS') {
      return patterns
        .replace(/YYYY/g, year)
        .replace(/MM/g, month)
        .replace(/DD/g, day)
        .replace(/HH/g, hour)
        .replace(/mm/g, minute)
        .replace(/SS/g, second);
    }
  };
}

/**
 * @description 格式化人民币 eg:10000 => 10,000.00
 * @param {*} money
 */
export function formatMoney(money, decimal = 2) {
  if (Number(money) === 0 || Number.isNaN(Number(money))) return '0.00';
  return Number(money)
    .toFixed(decimal)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event: any = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, true);
  event.eventType = 'message';
  window.dispatchEvent(event);
}

/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
export function parseUrlParams(url) {
  const params = {};
  if (!url || url === '' || typeof url !== 'string') {
    return params;
  }
  const paramsStr = url.split('?')[1];
  if (!paramsStr) {
    return params;
  }
  const paramsArr = paramsStr.replace(/&|=/g, ' ').split(' ');
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1];
    params[paramsArr[i * 2]] = value === 'true' ? true : value === 'false' ? false : value;
  }
  return params;
}

export function debounce<T>(delay: number, callback: (...args: T[]) => void, vm: T) {
  let lastTime;
  return function () {
    const args: IArguments = arguments;
    clearTimeout(lastTime);
    lastTime = setTimeout(() => {
      callback.call(vm, ...args);
    }, delay);
  };
}
export function observerDomResize(dom: HTMLElement, callback: () => void) {
  const MutationObserver = window.MutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });

  return observer;
}
export function deepMerge(target: any, merged: any) {
  for (const key in merged) {
    if (target[key] && typeof target[key] === 'object') {
      deepMerge(target[key], merged[key]);

      continue;
    }

    if (typeof merged[key] === 'object') {
      target[key] = deepClone(merged[key], true);

      continue;
    }

    target[key] = merged[key];
  }

  return target;
}

/**
 * @description Clone an object or array
 * @param {Object|Array} object Cloned object
 * @param {Boolean} recursion   Whether to use recursive cloning
 * @return {Object|Array} Clone object
 */
export function deepClone(object: any, recursion: boolean = false) {
  if (!object) return object;
  const { parse, stringify } = JSON;
  if (!recursion) return parse(stringify(object));
  const clonedObj: Record<string, any> = object instanceof Array ? [] : {};

  if (object && typeof object === 'object') {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (object[key] && typeof object[key] === 'object')
          clonedObj[key] = deepClone(object[key], true);
        else clonedObj[key] = object[key];
      }
    }
  }

  return clonedObj;
}
