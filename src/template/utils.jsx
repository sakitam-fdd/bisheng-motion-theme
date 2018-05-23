/**
 * check is null
 * @param obj
 * @returns {boolean}
 */
const isNull = function (obj) {
  return obj == null;
};

/**
 * check is number
 * @param val
 * @returns {boolean}
 */
const isNumber = function (val) {
  return (typeof val === 'number') && !isNaN(val);
};

/**
 * 判断是否为对象
 * @param value
 * @returns {boolean}
 */
const isObject = function (value) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

/**
 * check is function
 * @param value
 * @returns {boolean}
 */
const isFunction = function (value) {
  if (!isObject(value)) {
    return false
  }
  return typeof value === 'function' || (value.constructor !== null && value.constructor === Function)
};

/**
 * is date value
 * @param val
 * @returns {boolean}
 */
const isDate = function (val) {
  return toString.call(val) === '[object Date]'
};

/**
 * 判断是否为合法字符串
 * @param value
 * @returns {boolean}
 */
const isString = function (value) {
  if (value == null) {
    return false
  }
  return typeof value === 'string' || (value.constructor !== null && value.constructor === String)
};

/**
 * merge
 * @param target
 * @returns {*}
 */
const merge = function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target
};

/**
 * foreach object or array
 * @param obj
 * @param fn
 */
const forEach = function (obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  if (typeof obj !== 'object') {
    obj = [obj];
  }
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
};

/**
 * check isEmpty object
 * @param object
 * @returns {boolean}
 */
const isEmpty = function (object) {
  let property;
  for (property in object) {
    return false;
  }
  return !property;
};

/**
 * bind
 * @param fn
 * @param context
 * @returns {Function}
 */
const bind = function (fn, context) {
  const args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
  return function() {
    return fn.apply(context, args || arguments);
  }
};

/**
 * 返回浮点数
 * @param path
 * @param zhCN
 * @returns {string}
 */
function getLocalizedPathname (path, zhCN) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  if (!zhCN) { // to enUS
    return /\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
  } else if (pathname === '/') {
    return '/index-cn';
  } else if (pathname.endsWith('/')) {
    return pathname.replace(/\/$/, '-cn/');
  }
  return `${pathname}-cn`;
}

export {
  bind,
  isDate,
  merge,
  isNull,
  forEach,
  isEmpty,
  isString,
  isObject,
  isNumber,
  isFunction,
  getLocalizedPathname
}
