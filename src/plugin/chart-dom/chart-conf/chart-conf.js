// 颜色主题
export const CHART_COLORS = () => ['#888', '#889'];

// title 标题组件
export const CHART_TITLE = () => ({
  text: ''
});

// tooltip
export const CHART_TOOLTIP = () => ({
  show: true
});

// legend 图例组件
export const CHART_LEGEND = () => ({
  data: []
});

// toolbox 
export const CHART_TOOLBOX = () => ({

});

// grid
export const CHART_GRID = () => ({});

// grids
export const CHART_GRIDS = () => [];

// xAxis
export const CHART_XAXIS = () => ({});

// yAxis
export const CHART_YAXIS = () => ({});

// series
export const CHART_SERIES = () => [];

// merge option
export function mergeOpt(_origin, _opt) {
  if (!_origin) {
    _origin = _opt;
    return;
  }
  for (const key in _opt) {
    const value = _opt[key];

    // 判断value是否是对象
    if (typeof _origin[key] == 'undefined') {
      _origin[key] = value;
    } else if (Array.isArray(value)) {
      _origin[key] = value;
    } else if (value instanceof Object) {
      mergeOpt(_origin[key], value);
    } else {
      _origin[key] = value;
    }
  }
}
