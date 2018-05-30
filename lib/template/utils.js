import React from 'react';
import ticker from 'rc-tween-one/lib/ticker';
import easingTypes from 'tween-functions';

const isNull = function (obj) {
  return obj == null;
};

const isNumber = function (val) {
  return typeof val === 'number' && !isNaN(val);
};

const isObject = function (value) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

const isFunction = function (value) {
  if (!isObject(value)) {
    return false;
  }
  return typeof value === 'function' || value.constructor !== null && value.constructor === Function;
};

const isDate = function (val) {
  return toString.call(val) === '[object Date]';
};

const isString = function (value) {
  if (value == null) {
    return false;
  }
  return typeof value === 'string' || value.constructor !== null && value.constructor === String;
};

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
  return target;
};

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

const isEmpty = function (object) {
  let property;
  for (property in object) {
    return false;
  }
  return !property;
};

const bind = function (fn, context) {
  const args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
  return function () {
    return fn.apply(context, args || arguments);
  };
};

function getLocalizedPathname(path, zhCN) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  if (!zhCN) {
    return (/\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '')
    );
  } else if (pathname === '/') {
    return '/index-cn';
  } else if (pathname.endsWith('/')) {
    return pathname.replace(/\/$/, '-cn/');
  }
  return `${pathname}-cn`;
}

function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, c => {
    ret.push(c);
  });
  return ret;
}

function currentScrollTop() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}

function scrollTo(number) {
  const scrollTop = currentScrollTop();
  if (scrollTop !== number) {
    const tickerId = `scrollToTop-${Date.now()}`;
    const startFrame = ticker.frame;
    ticker.wake(tickerId, () => {
      const moment = (ticker.frame - startFrame) * ticker.perFrame;
      const ratio = easingTypes.easeInOutCubic(moment, scrollTop, number, 450);
      window.scrollTo(window.scrollX, ratio);
      if (moment >= 450) {
        ticker.clear(tickerId);
      }
    });
  }
}

function scrollClick(e) {
  const id = e.currentTarget.getAttribute('href').split('#')[1];
  const element = document.getElementById(id);
  let toTop;
  if (element) {
    toTop = element.getBoundingClientRect().top;
    const docTop = document.documentElement.getBoundingClientRect().top;
    toTop = Math.round(toTop) - Math.round(docTop);
    scrollTo(toTop);
  }
}

export { bind, isDate, merge, isNull, forEach, isEmpty, isString, isObject, isNumber, isFunction, getLocalizedPathname, toArrayChildren, currentScrollTop, scrollTo, scrollClick };