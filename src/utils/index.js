const randomItem = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

/**
 * uuid
 * @date 2021-07-15
 * @returns {string} uuid
 */
export const getUUID = () =>
  randomItem() +
  randomItem() +
  '-' +
  randomItem() +
  '-' +
  randomItem() +
  '-' +
  randomItem() +
  '-' +
  randomItem() +
  randomItem() +
  randomItem();

let startX, startY, sessionX, sessionY, left, top;
export const documentMouseDown = function (e, selfX, selfY) {
  const { x, y, target } = e;
  startX = x;
  startY = y;
  sessionX = left = selfX;
  sessionY = top = selfY;
};
export const documentMouseMove = function (e, callback) {
  const { x, y } = e;
  sessionX = x - startX + left;
  sessionY = y - startY + top;
  callback(sessionX, sessionY);
};
export const documentMouseUp = function (e, callback) {
  callback(sessionX, sessionY);
};

/**
 * 数组查询下标
 * @param {*} arr 数组
 * @param {*} key
 * @param {*} value
 * @returns index
 */
export const arrIndex = (arr, key, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == value) {
      return i;
    }
  }
  return -1;
};

// export const bindEvent = (el,eventName,callback,){
//   // 判断事件
//   const isSupportTouch = "ontouchend" in document ? true : false;
//   el.addEventListener(eventName,callback,false);
// }

/**
 * 去抖动
 * @date 2021-07-15
 * @param {function} fn
 * @param {number} delay
 * @returns {any}
 */
export const debounce = (fn, delay) => {
  let timeoutID = null;
  return function () {
    const context = this;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(context, arguments);
    }, delay);
  };
};

/**
 * 节流函数
 * @date 2021-07-15
 * @param {function} fn
 * @param {number} wait
 * @returns {any}
 */
export const throttle = (fn, wait) => {
  let previous = 0;
  // eslint-disable-next-line func-names
  return function () {
    const now = Date.now();
    if (now - previous > wait) {
      fn.apply(this, arguments);
      previous = now;
    }
  };
};

// 获取坐标之间的举例
export const getDistance = function (start, stop) {
  return Math.hypot(stop.x - start.x, stop.y - start.y);
};

/**
 * diff
 * @date 2021-07-15
 * @param {object} self 自身数据object
 * @param {object} target 对比数据object
 * @param {array} whiteKey=[] key 忽略
 * @returns {object} 差异的数据object
 */
export const diffParams = (self, target, whiteKey = []) => {
  let obj = {};
  for (let key in self) {
    if (whiteKey.length && whiteKey.includes(key)) {
      continue;
    }
    if (self[key] !== null && typeof self[key] === 'object') {
      obj[key] = self[key];
      continue;
    }
    if (self[key] != target[key]) {
      obj[key] = self[key];
    }
  }
  return obj;
};

/**
 * diff 对象对比
 * @param {*} target
 * @param {*} data
 * @param {array} keys key
 * @returns params
 */
export const diffObject = (target, data, keys = []) => {
  let params = {};

  const isSameFn = (target, data, key) => {
    // 对比target是否有改动
    if (typeof target[key] === 'object') {
      if (Array.isArray(target[key]) && target[key].length !== data[key].length) {
        // console.log('数组长度不一致');
        return true;
      }
      //for in
      for (const ikey in target[key]) {
        let bool = isSameFn(target[key], data[key], ikey);
        if (bool) {
          return true;
        }
      }
    } else {
      // 判断undefiend null !=
      if (target[key] != data[key]) {
        // console.log(key + ':' + target[key] + '！==' + data[key]);
        return true;
      }
    }
    return false;
  };
  keys.forEach((key) => {
    if (typeof target[key] === 'object') {
      if (isSameFn(target, data, key)) {
        // console.log('key set', key);
        // console.log('data set', target[key]);
        params[key] = target[key];
      }
    } else {
      if (target[key] !== data[key]) {
        params[key] = target[key];
      }
    }
  });
  return params;
};

export const diffArray = (target, data) => {
  // 长度判断
  if (target.length !== data.length) {
    return true;
  }
  for (let i = 0; i < target.length; i++) {
    const item = target[i];
    if (typeof item === 'object') {
      let bool = Object.keys(item).every((k) => {
        // console.error('TCL: diffArray -> ', item[k]);
        // console.error('TCL: diffArray -> ', data[i][k]);
        return item[k] == data[i][k];
      });
      if (!bool) {
        return true;
      }
    }
  }
  return false;
};

const isMobile = 'ontouchend' in document ? true : false;
/**
 * dom 绑定点击事件
 * @param {*} el
 * @param {*} callback
 */
export const tap = function (el, callback) {
  if (isMobile) {
    el.addEventListener('touchstart', callback);
  } else {
    el.addEventListener('click', callback);
  }
};
/**
 * dom 解绑点击事件
 * @param {*} el
 * @param {*} callback
 */
export const untap = function (el, callback) {
  if (isMobile) {
    el.removeEventListener('touchstart', callback);
  } else {
    el.removeEventListener('click', callback);
  }
};

/**
 * 验证数字
 * @param {*} value
 * @param {*} numLen 整数长度
 * @param {*} digsLen 小数长度
 * @returns
 */
export const checkNum = function (value, numLen = 4, digsLen = 4) {
  // 小数点加前缀0. 2个字符长度
  // 值空
  if (typeof value == 'undefined') {
    return Promise.reject('请输入');
  }
  // 正则校验通过
  if (/^[+-]?\d+(\.\d+)?$/.test(value)) {
    // 格式化数字
    value = parseFloat(value);
    const digs = value.toString().split('.')[1] || 0;
    const num = Math.abs(Math.trunc(value));

    // 判断整数长度
    // 判断小数点位数
    if (num.toString().length <= numLen && digs.toString().length <= digsLen) {
      return Promise.resolve();
    }
    if (num.toString().length > numLen) {
      return Promise.reject('数字超出合理范围');
    }
    if (digs.toString().length > digsLen) {
      return Promise.reject('精度超出允许范围');
    }
  }
  return Promise.reject('请输入数字');
};

export const checkNumVildFn = function (value, numLen = 4, digsLen = 4, validFn, validTxt) {
  if (!(validFn instanceof Function)) {
    validFn = function () {
      return true;
    };
  }
  console.log('----------------checkNumVildFn', typeof value);
  console.log('-----------checkNumVildFn', value);

  // 小数点加前缀0. 2个字符长度
  // 值空
  if (typeof value == 'undefined' || value === '' || value === null) {
    return Promise.resolve();
  }
  // 正则校验通过
  if (/^[+-]?\d+(\.\d+)?$/.test(value)) {
    // 格式化数字
    value = parseFloat(value);
    const digs = value.toString().split('.')[1] || 0;
    const num = Math.abs(Math.trunc(value));
    // 判断整数长度
    // 判断小数点位数
    if (num.toString().length <= numLen && digs.toString().length <= digsLen && validFn(value)) {
      return Promise.resolve();
    }
    if (num.toString().length > numLen) {
      return Promise.reject('数字超出合理范围');
    }
    if (digs.toString().length > digsLen) {
      return Promise.reject('精度超出允许范围');
    }
    if (!validFn(value)) {
      return Promise.reject(validTxt);
    }
  }
  return Promise.reject('请输入数字');
};



// //获取文件名，不带后缀
// var file_name=file_path.replace(/(.*\/)*([^.]+).*/ig,"$2");


// //获取文件后缀
// 1.var FileExt=file_path.replace(/.+\./,"");
// 2.var fileExtension = file_path.substring(file_path.lastIndexOf('.') + 1);


// //截取文件后缀
// var reg = /\.\w+$/;
// var file_name = file_path.replace(reg,'');

// 作者：瓶子iu
// 链接：https://juejin.cn/post/6844903895899045895
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。