import $sub from './index';
export default {
  install: (Vue, options) => {
    Object.defineProperty(Vue.prototype, '$sub', {
      get: () => $sub
    });
  }
};
