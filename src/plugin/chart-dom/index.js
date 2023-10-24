import ChartDom from './index.vue';
import { ChartWork } from './chart-conf/chart-work';
export default {
  install: (app, options = {}) => {
    // 在这里编写插件代码
    app.component('chart-dom', ChartDom);

    window.$chartWork = new ChartWork(options);
    // 默认resize
    window.addEventListener('resize', function () {
      window.$chartWork.resize(0);
    });
  }
};
