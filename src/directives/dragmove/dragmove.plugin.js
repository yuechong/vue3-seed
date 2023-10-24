export default {
  install(Vue, config) {
    /**
     * 获取滚动条的高度
     * @returns
     */
    function getScrollTop() {
      var scroll_top = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
      } else if (document.body) {
        scroll_top = document.body.scrollTop;
      }
      return scroll_top;
    }

    /**
     * mousedown
     * @param {*} e
     * @param {*} el
     * @param {*} targetParentId
     * @returns
     */
    function dragMouseDownFn(e, el, targetParentId) {
      e = e || window.event;
      const parentPointBox = targetParentId
        ? document.getElementById(targetParentId)
        : el.parentNode;
      const boundRect = parentPointBox.getBoundingClientRect();
      el.__bodyMove = false;
      el.dataset.parentX = boundRect.x;
      el.dataset.parentY = boundRect.y + getScrollTop();
      el.dataset.parentW = boundRect.width;
      el.dataset.parentH = boundRect.height;
      el.dataset.maxX = boundRect.width - el.getBoundingClientRect().width - 1;
      el.dataset.maxY = boundRect.height - el.getBoundingClientRect().height - 1;
      el.dataset.offsetX = e.offsetX;
      el.dataset.offsetY = e.offsetY;
      document.body.removeEventListener('mouseup', el.__dragMouseUpFn, true);
      document.body.addEventListener('mouseup', el.__dragMouseUpFn, true);
      document.body.removeEventListener('mousemove', el.__dragBodyMoveFn);
      document.body.addEventListener('mousemove', el.__dragBodyMoveFn);
      e.preventDefault();
      return false;
    }

    /**
     * bodymove
     * @param {*} e
     * @param {*} el
     */
    function dragBodyMoveFn(e, el) {
      e = e || window.event;
      el.__bodyMove = true;
      const { pageX, pageY } = e;
      let zoffsetX = +el.dataset['zoffsetX'] || 0,
        zoffsetY = +el.dataset['zoffsetY'] || 0;
      const left = pageX - el.dataset.offsetX - el.dataset.parentX + zoffsetX;
      const top = pageY - el.dataset.offsetY - el.dataset.parentY + zoffsetY;
      const maxX = +el.dataset.maxX + zoffsetX;
      const maxY = +el.dataset.maxY + zoffsetY;
      // 处理边界
      if (left < 0 || left > maxX || top < 0 || top > maxY) {
        if (left < 0) {
          el.style.left = '0px';
        }
        if (left > maxX) {
          el.style.left = maxX + 'px';
        }
        if (top < 0) {
          el.style.top = '0px';
        }
        if (top > maxY) {
          el.style.top = maxY + 'px';
        }
        // console.log('边界范围里了');
        // 取消监听
        document.body.removeEventListener('mousemove', el.__dragBodyMoveFn);
        el.dataset.pecentX = (left / el.dataset.parentW) * 100 + '%';
        el.dataset.pecentY = (top / el.dataset.parentH) * 100 + '%';
        return false;
      }

      el.style.left = left + 'px';
      el.style.top = top + 'px';
    }

    /**
     * mouseup
     * @param {*} e
     * @param {*} el
     * @returns
     */
    function dragMouseUpFn(e, el) {
      document.body.removeEventListener('mouseup', el.__dragMouseUpFn, true);
      e = e || window.event;
      // 点击即释放
      if (!el.__bodyMove) {
        // 取消监听
        document.body.removeEventListener('mousemove', el.__dragBodyMoveFn);
        return;
      }

      const offsetX = parseFloat(el.style.left);
      const offsetY = parseFloat(el.style.top);
      el.dataset.pecentX = (offsetX / el.dataset.parentW) * 100 + '%';
      el.dataset.pecentY = (offsetY / el.dataset.parentH) * 100 + '%';
      const event = new CustomEvent('moveEvent', {
        detail: {
          left: el.dataset.pecentX,
          top: el.dataset.pecentY,
          offsetX,
          offsetY
        }
      });
      el.dispatchEvent(event);
      // 取消监听
      document.body.removeEventListener('mousemove', el.__dragBodyMoveFn);
    }

    /**
     * 拖动
     *  value：targetId
     * data-set disabled
     */
    Vue.directive('dragmove', {
      created(el, binding) {
        console.log('el', el);
        /**
         * mouseDown
         * @param {*} e
         */
        el.__dragMouseDownFn = (e) => {
          console.log('__dragMouseDownFn');
          e = e || window.event;
          const targetParentId = binding.value;
          dragMouseDownFn(e, el, targetParentId);
        };
        /**
         * body move
         * @param {*} e
         */
        el.__dragBodyMoveFn = (e) => {
          // console.log('__dragBodyMoveFn');
          e = e || window.event;
          dragBodyMoveFn(e, el);
        };
        /**
         * mouseup
         * @param {*} e
         */
        el.__dragMouseUpFn = (e) => {
          // console.log('__dragMouseUpFn');
          e = e || window.event;
          dragMouseUpFn(e, el);
        };
      },
      mounted: (el, binding) => {
        // el.style['user-select'] = 'none';
        const disabled = el.dataset.disabled;
        if (disabled ==='true' && disabled) {
          /**
           * 处理数据
           */
          el.dataset.pecentX = el.style.left;
          el.dataset.pecentY = el.style.top;
          return;
        }
        el.removeEventListener('mousedown', el.__dragMouseDownFn);
        el.addEventListener('mousedown', el.__dragMouseDownFn);
      },
      updated: (el, binding) => {
        const disabled = el.dataset.disabled;
        if (disabled) {
          return;
        }
        el.removeEventListener('mousedown', el.__dragMouseDownFn);
        // console.log('addEventListener');
        el.addEventListener('mousedown', el.__dragMouseDownFn);
      },
      beforeUnmount(el) {
        el.removeEventListener('mousedown', el.__dragMouseDownFn);
        document.body.removeEventListener('mousemove', el.__dragBodyMoveFn);
        document.body.removeEventListener('mouseup', el.__dragMouseUpFn, true);
        el.__dragMouseDownFn = null;
        el.__dragBodyMoveFn = null;
        el.__dragMouseUpFn = null;
        el.__bodyMove = null;
      }
    });
  }
};
