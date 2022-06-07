function classNames() {
  const classes = [];
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      // eslint-disable-next-line prefer-spread
      const inner = classNames.apply(null, arg);
      // const inner = { ...arg };
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, 'key') && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
}
const camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}
function objectCamelize(obj) {
  const res = {};
  Object.keys(obj).forEach((k) => (res[camelize(k)] = obj[k]));
  return res;
}
function parseStyleText(cssText = '', camel?) {
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
}

export function getClass(ele: any): object {
  let data: any = {};
  if (ele.data) {
    data = ele.data;
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data;
  }
  const tempCls = data.class || {};
  const staticClass = data.staticClass;
  let cls = {};
  staticClass &&
    staticClass.split(' ').forEach((c) => {
      cls[c.trim()] = true;
    });
  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach((c) => {
      cls[c.trim()] = true;
    });
  } else if (Array.isArray(tempCls)) {
    //@ts-ignore
    classNames(tempCls)
      .split(' ')
      .forEach((c) => {
        cls[c.trim()] = true;
      });
  } else {
    cls = { ...cls, ...tempCls };
  }
  return cls;
}

export function getStyle(ele, camel?) {
  getClass(ele);
  let data: any = {};
  if (ele.data) {
    data = ele.data;
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data;
  }

  let style = data.style || {};
  let staticStyle = data.staticStyle;
  staticStyle = staticStyle ? objectCamelize(data.staticStyle) : {};

  if (typeof style === 'string') {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    style = objectCamelize(style);
  }
  return { ...staticStyle, ...style };
}
