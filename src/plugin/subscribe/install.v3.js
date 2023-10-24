import $sub from './index';
export default {
  install: (app, options) => {
    app.config.globalProperties.$sub = $sub
  }
};
