/**
 * 订阅-发布模式
 * 先订阅后发布
 */

class Sub {
  constructor(debug = true) {
    this.__debug = debug;
    this.eventsMap = Object.create(null);
    this.storeEmit = Object.create(null);
  }

  /**
   * 发布
   * @param {*} eventName 事件name
   * @param {*} data 事件data
   */
  emit(eventName, data) {
    this.__debug &&
      // eslint-disable-next-line no-console
      console.info(`emit /name:${eventName} /data:${JSON.stringify(data)}  /path: ${window.location.pathname}`);
    const eventsMap = this.eventsMap;
    // eventName 类型判断
    if (typeof eventName !== 'string') {
      throw new Error('第一个参数必须为字符串');
    }
    //判断event是否已在订阅中
    if (!eventsMap[eventName] || !eventsMap[eventName].length) {
      // eslint-disable-next-line no-console
      console.log(`${eventName} 未有可订阅的函数执行，进入缓存队列保存`);
      // 缓存该函数
      this.storeEmit[eventName] = (function(eventName, data) {
        return function() {
          this.emit(eventName, data);
          eventName = data = null;
        };
      })(eventName, data);
    } else {
      const lenth = eventsMap[eventName].length - 1;
      for (let i = lenth; i >= 0; i--) {
        const item = eventsMap[eventName][i];
        item.update(data);
        // once 只运行一次
        if (item.once) {
          eventsMap[eventName].splice(i, 1);
        }
      }
    }
  }

  /**
   * 订阅
   * @param {*} eventName 事件name
   * @param {*} callback function
   * @returns function 取消订阅
   */
  on(eventName, callback) {
    const eventsMap = this.eventsMap;
    // eventName 类型判断
    if (typeof eventName !== 'string') {
      throw new Error('第一个参数必须为字符串');
    }
    // callback 类型判断
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw new Error('第二个参数必须为函数');
    }

    let isCreate = false;

    //判断event是否已在订阅中
    if (!eventsMap[eventName]) {
      eventsMap[eventName] = [];
      isCreate = true;
    }
    eventsMap[eventName].push({ update: callback, once: false, __path: window.location.pathname });
    // 取出缓存数据
    const emitFn = this.storeEmit[eventName];
    if (emitFn && isCreate) {
      emitFn.call(this);
      this.storeEmit[eventName] = null;
    }
    // 获取该订阅的在数组的位置
    let index = eventsMap[eventName].length - 1;
    return function() {
      // eslint-disable-next-line no-console
      console.log('destory sub', eventName);
      eventsMap[eventName].splice(index, 1);
      eventName = index = null;
    };
  }

  /**
   * 订阅 一次性 阅后即焚
   * @param {*} eventName
   * @param {*} callback
   */
  once(eventName, callback) {
    // eventName 类型判断
    if (typeof eventName !== 'string') {
      throw new Error('第一个参数必须为字符串');
    }
    // callback 类型判断
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw new Error('第二个参数必须为函数');
    }
    //判断event是否已在订阅中
    if (!this.eventsMap[eventName]) {
      this.eventsMap[eventName] = [];
    }
    this.eventsMap[eventName].push({ update: callback, once: true });
  }
  /**
   * 手动取消订阅
   * @param {*} eventName
   * @param {*} callback
   * @returns
   */
  remove(eventName, callback) {
    const fns = this.eventsMap[eventName];
    if (!fns) {
      return false;
    }
    if (!callback) {
      fns && (fns.length = 0);
    } else {
      for (let index = fns.length - 1; index > -1; index--) {
        if (callback === fns[index]) {
          fns.splice(index, 1);
          break;
        }
      }
    }
  }
}

const $sub = new Sub();

export default $sub;
