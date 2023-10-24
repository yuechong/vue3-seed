import * as echarts from 'echarts';
import {
  CHART_COLORS,
  CHART_TITLE,
  CHART_TOOLTIP,
  CHART_TOOLBOX,
  CHART_GRID,
  CHART_LEGEND,
  CHART_XAXIS,
  CHART_YAXIS,
  CHART_SERIES,
  mergeOpt
} from './chart-conf';

// 计数
let uid = 0;

/**
 * 图表实例
 */
export class Chart {
  constructor(dom) {
    this._chart = null;
    this._option = null;
    this._init(dom);
  }

  _init(dom) {
    this._chart = echarts.init(dom);
    return this._chart;
  }

  //配置项合并
  _mergeOpt(_option) {
    if (!this._option) {
      this._option = _option;
      return;
    }
    // 合并
    mergeOpt(this._option, _option);
    // 空数据判断
    // if(!Array.isArray(this._option?.series)){
    //   if(this._option?.series?.data.length===0){
    //     // 设置空数据提示
    //   }
    // }
  }

  _setOption(option, opt) {
    this._chart.setOption(option, opt);
  }

  _on() {
    this._chart.on(...arguments);
  }

  _off(eventName, handler = null) {
    if (handler) {
      this._chart.off(eventName, handler);
    } else {
      this._chart.off(eventName);
    }
  }

  _resize() {
    this._chart.resize();
  }

  _clear() {
    this._chart.clear();
  }

  _destroyed() {
    this._chart.dispose();
    this._chart = null;
    this._option = null;
  }
}

/**
 * 图表work
 */
export class ChartWork {
  constructor(opt) {
    this._maps = Object.create(null);
    this._defaultOption = opt;
  }

  getChartByUid(uid) {
    const _instance = this._maps[uid];
    if (!_instance) {
      throw new Error(`${uid} 未找到实例化图表`);
    }
    return _instance;
  }

  /**
   * 初始化
   * @param {*} dom HTML
   * @returns
   */
  init(dom) {
    uid++;
    const _instance = new Chart(dom);
    this._maps[uid] = _instance;
    if (this._defaultOption) {
      _instance._mergeOpt(this._defaultOption);
    }
    return uid;
  }
  /**
   * 图表重新渲染尺寸
   * @param {*} uid 图表编号
   */
  resize(uid) {
    if (uid) {
      const _instance = this.getChartByUid(uid);
      _instance && _instance._resize();
    } else if (uid === 0) {
      Object.values(this._maps).forEach((chart) => {
        chart && chart._resize();
      });
    } else {
      throw new Error(`ChartWork resize 0代表全部，uid代表具体的图表`);
    }
  }

  // 清空重绘
  repaint(uid) {
    if (uid) {
      const _instance = this.getChartByUid(uid);
      if (_instance) {
        _instance.clear();
        _instance._setOption(_instance.option);
      }
    }
  }

  /**
   * 设置图表实例的配置项以及数据
   * @param {*} uid 图表编号
   * @param {*} option 图表配置
   * @param {*} opt 图表配置opt选参
   */
  setOption(uid, option, opt = {}) {
    const _instance = this.getChartByUid(uid);
    if (_instance) {
      _instance._mergeOpt(option);
      console.log('option', option);
      _instance._setOption(option, opt);
    }
  }

  /**
   * 图表缩放区域
   * @param {*} uid
   * @param {*} state
   */
  dataZoom(uid, state = true) {
    console.log('dataZoom', uid);
    const _instance = this.getChartByUid(uid);
    if (_instance) {
      _instance._chart.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        // 启动或关闭
        dataZoomSelectActive: !!state
      });
    }
  }
  resetDataZoom(uid) {
    const _instance = this.getChartByUid(uid);
    if (_instance) {
      _instance._chart.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        // 启动或关闭
        dataZoomSelectActive: false
      });
      _instance._chart.dispatchAction({
        type: 'dataZoom',
        // 开始位置的百分比，0 - 100
        start: 0,
        // 结束位置的百分比，0 - 100
        end: 100
      });
    }
  }
  /**
   * 监听事件
   * @param {*} uid
   * @param {*} eventName
   * @param {*} query
   * @param {*} handler
   * @param {*} context
   */
  on(uid, ...arg) {
    const _instance = this.getChartByUid(uid);
    _instance && _instance._on(...arg);
  }

  off(uid, eventName, handler = null) {
    const _instance = this.getChartByUid(uid);
    _instance && _instance._off(eventName, handler);
  }

  /**
   * 图表销毁
   * @param {*} uid 图表编号
   */
  destroyed(uid) {
    if (uid) {
      const _instance = this.getChartByUid(uid);
      _instance && _instance._destroyed();
      this._maps[uid] = null;
    } else if (uid === 0) {
      Object.values(this._maps).forEach((chart) => {
        chart && chart._destroyed();
      });
      this._maps = Object.create(null);
    } else {
      throw new Error(`ChartWork destroyed 0代表全部，uid代表具体的图表`);
    }
  }

  /**
   * 生成options
   * @param {*} opt
   * @returns
   */
  generator(opt) {
    let options = {
      color: CHART_COLORS(),
      title: CHART_TITLE(),
      tooltip: CHART_TOOLTIP(),
      toolbox: CHART_TOOLBOX(),
      grid: CHART_GRID(),
      legend: CHART_LEGEND(),
      xAxis: CHART_XAXIS(),
      yAxis: CHART_YAXIS(),
      series: CHART_SERIES()
    };
    mergeOpt(options, opt);
    return options;
  }
}
