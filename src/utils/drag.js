/**
 * 拖拽js
 */

const noloop = () => {};
// bind
if (!('bind' in Function)) {
  Function.prototype.bind = function (context) {
    var self = this;
    return function () {
      return self.apply(context, arguments);
    };
  };
}

// 获取坐标之间的举例
const getDistance = function (start, stop) {
  return Math.hypot(stop.x - start.x, stop.y - start.y);
};
class Drag {
  constructor({
    el,
    targetBoxEl,
    isClone = false,
    moveFn = noloop,
    endFn = noloop,
    zoomFn = noloop,
    outFn = noloop
  }) {
    this._el = el;
    this._targetBoxEl = targetBoxEl;
    this.isMobile =
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0;
    console.log('触屏支持', this.isMobile);
    this._isClone = isClone;
    this._cloneNode = null;
    this._moveFn = moveFn;
    this._endFn = endFn;
    this._zoomFn = zoomFn;
    this._outFn = outFn;

    // 自身x，y值
    this._x = null;
    this._y = null;
    // mousedown x，y坐标
    this._startX = null;
    this._startY = null;
    this._endX = null;
    this._endY = null;
    // mousemove 计算的自身的x，y坐标值
    this._sessionX = null;
    this._sessionY = null;
    // zoom
    this._zoom1 = null;
    this._zoom2 = null;

    // 限制
    this._xlimit = null;
    this._ylimit = null;

    this.moveScope = this.documentMouseMove.bind(this);
    this.upScope = this.documentMouseUp.bind(this);
    return this;
  }

  clearZoomData() {
    this._zoom1 = null;
    this._zoom2 = null;
  }

  bindZoom(zoomFn) {
    this._zoomFn = zoomFn;
    return this;
  }

  /**
   * 绑定事件
   * @param {*} moveFn
   * @param {*} endFn
   */
  bindMoveAndEnd(moveFn, endFn) {
    this._moveFn = moveFn;
    this._endFn = endFn;
    return this;
  }

  /**
   * 设置自身x，y
   * @param {*} x
   * @param {*} y
   */
  setSelfXY(x, y) {
    this._sessionX = this._x = x;
    this._sessionY = this._y = y;
    return this;
  }

  /**
   * 初始化mousedown，touchstart事件
   * @param {*} x
   * @param {*} y
   * @param {*} moveFn
   * @param {*} endFn
   */
  init(x, y) {
    this._sessionX = this._x = x;
    this._sessionY = this._y = y;

    this.downScope = this.domMousedown.bind(this);
    this.isMobile
      ? this._el.addEventListener('touchstart', this.downScope, true)
      : this._el.addEventListener('mousedown', this.downScope, true);
    return this;
  }
  /**
   * mousedown 事件，绑定移动事件
   * @param {*} e
   */
  domMousedown(e) {
    // console.log('TCL: Drag -> domMousedown -> domMousedown', e);
    e.preventDefault();

    let { x, y } = this.getPosi(e);
    this._startX = x;
    this._startY = y;

    this.createCloneNode();

    if (this.isMobile) {
      const e1 = e?.touches[0];
      this._zoom1 = { x: e1.pageX, y: e1.pageY };
      if (e?.touches.length > 1) {
        const e2 = e?.touches[1];
        this._zoom2 = { x: e2.pageX, y: e2.pageY };
      }
      document.addEventListener('touchmove', this.moveScope, true);
      document.addEventListener('touchend', this.upScope, true);
    } else {
      document.addEventListener('mousemove', this.moveScope, true);
      document.addEventListener('mouseup', this.upScope, true);
    }
  }

  documentMouseMove(e) {
    // console.log('TCL: Drag -> documentMouseMove -> documentMouseMove', e);
    // 双指操作缩放
    if (this.isMobile && e?.touches?.length > 1) {
      const events1 = e.touches[0];
      // zoom
      const events2 = e.touches[1];
      // 第2个点在move的时候获取
      if (!this._zoom2) {
        this._zoom2 = { x: events2.pageX, y: events2.pageY };
      }

      // 双指缩放比例计算
      const zoom =
        getDistance(
          {
            x: events1.pageX,
            y: events1.pageY
          },
          {
            x: events2.pageX,
            y: events2.pageY
          }
        ) / getDistance(this._zoom1, this._zoom2);

      const centerPoint = {
        x: (events1.pageX + events2.pageX) / 2,
        y: (events1.pageY + events2.pageY) / 2
      };
      //双指放大缩小
      this._zoomFn(zoom, centerPoint);
      return;
    }
    // 单指，清空双指数据
    this.clearZoomData();
    // 单指操作拖拽
    let { x, y } = this.getPosi(e);
    this._sessionX = x - this._startX + this._x;
    this._sessionY = y - this._startY + this._y;

    this._endX = x;
    this._endY = y;
    this.setCloneNodeXY(x, y);
    // callback
    this._moveFn(this._sessionX, this._sessionY, e);
  }

  documentMouseUp(e) {
    console.log('TCL: Drag -> documentMouseUp -> documentMouseUp', e);
    // zoom
    this._zoom1 = null;
    this._zoom2 = null;
    // 销毁事件
    if (this.isMobile) {
      document.removeEventListener('touchend', this.upScope, true);
      document.removeEventListener('touchmove', this.moveScope, true);
    } else {
      document.removeEventListener('mouseup', this.upScope, true);
      document.removeEventListener('mousemove', this.moveScope, true);
    }
    // 判断up区域
    if (this.containArea(this._endX, this._endY)) {
      // callback
      this._endFn(this._sessionX, this._sessionY, e);
    } else {
      console.log('not in box');
      this._outFn();
    }

    this.destroyedCloneNode();
  }

  createCloneNode() {
    if (this._isClone) {
      if (this._cloneNode) {
        this._cloneNode.style.display = 'block';
      } else {
        this._cloneNode = this._el.cloneNode();
        this._cloneNode.innerHTML = this._el.innerHTML;
        this._cloneNode.style.position = 'absolute';
        this._cloneNode.style.zIndex = 999;
        document.body.appendChild(this._cloneNode);
      }

      this.setCloneNodeXY(this._startX, this._startY);
    }
  }
  setCloneNodeXY(x, y) {
    if (this._isClone) {
      this._cloneNode.style.left = x + 'px';
      this._cloneNode.style.top = y + 'px';
    }
  }
  destroyedCloneNode() {
    if (this._isClone) {
      this._cloneNode.style.display = 'none';
    }
  }

  // 获取x，y 坐标
  getPosi(e) {
    let x = e.pageX || e?.touches[0].pageX;
    let y = e.pageY || e?.touches[0].pageY;
    return { x, y };
  }

  /**
   * 边界检测
   * @param {*} x
   * @param {*} y
   * @returns bool
   */
  containArea(x, y) {
    if (this._targetBoxEl) {
      const { left, top, bottom, right } = this._targetBoxEl.getBoundingClientRect();
      console.log(
        'TCL: Drag -> containArea -> this._targetBoxEl.getBoundingClientRect()',
        this._targetBoxEl.getBoundingClientRect()
      );
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      if (x >= left && x <= right && y >= top && y <= bottom + scrollHeight) {
        return true;
      }
      return false;
    }
    return true;
  }

  isInnerArea(x, y) {
    const { width: boxWidth, height: BoxHeight } = this._targetBoxEl.getBoundingClientRect();
    const { width, height } = this._el.getBoundingClientRect();

    const limtX = boxWidth - width,
      limtY = BoxHeight - height;

    if (x >= 0 && x <= limtX && y >= 0 && y <= limtY) {
      return true;
    }
    return false;
  }
  /**
   * 返回x，y 范围内极限值
   * @returns
   */
  xyLimit() {
    if (!this._xlimit) {
      const { width: boxWidth, height: BoxHeight } = this._targetBoxEl.getBoundingClientRect();
      const { width, height } = this._el.getBoundingClientRect();
      this._xlimit = boxWidth - width;
      this._ylimit = BoxHeight - height;
      if (width >= boxWidth) {
        this._xlimit = 0;
      }
      if (height >= BoxHeight) {
        this._ylimit = 0;
      }
    }
    return { xlimit: this._xlimit, ylimit: this._ylimit };
  }
  clearXYLimit(){
    this._xlimit = null;
    this._ylimit = null;
  }

  cancelMoveEvent() {
    // 销毁事件
    if (this.isMobile) {
      document.removeEventListener('touchend', this.upScope, true);
      document.removeEventListener('touchmove', this.moveScope, true);
    } else {
      document.removeEventListener('mouseup', this.upScope, true);
      document.removeEventListener('mousemove', this.moveScope, true);
    }
  }

  destroyed() {
    this.isMobile
      ? this._el.removeEventListener('touchstart', this.downScope, true)
      : this._el.removeEventListener('mousedown', this.downScope, true);

    this._cloneNode && document.body.removeChild(this._cloneNode);
  }
}

export default Drag;
