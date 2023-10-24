import { ref, h, isRef, createApp } from 'vue';
import Drag from '@/utils/drag';

function mergeOptions(target, opts) {
  for (const key in opts) {
    if (typeof target.value[key] === 'undefined') {
      target.value[key] = opts[key];
    }
  }
}

/**
 * 创建overbiew组件
 * @param {*} _options
 * @returns
 */
function createOverViewComponent(_options) {
  return createApp({
    expose: ['positionEffect', 'initFloatBox'],
    data() {
      return {
        options: _options,
        floatbox: {
          width: '0px',
          height: '0px',
          left: 0,
          top: 0,
          position: 'absolute',
          'z-index': 1000
        },
        ovbPlay: 'block',
        ovbOpacity: 0,
        ratio: undefined,
        translateX: 0,
        translateY: 0,
        scale: 1,
        xlimit: undefined,
        ylimit: undefined,
        floatBoxInstance: undefined
      };
    },
    computed: {
      //区域盒子
      boxEl() {
        return this.options.boxEl;
      },
      imgEl() {
        return this.options.imgEl; //图片元素
      },
      imgSrc() {
        return this.options.imgSrc;
      },
      title() {
        return this.options.title;
      },
      width() {
        return this.options.width;
      },
      bottom() {
        return this.options.bottom;
      },
      right() {
        return this.options.right;
      }
    },
    render() {
      return h(
        'div',
        {
          class: 'img-overview',
          style: {
            position: 'absolute',
            'z-index': 999,
            bottom: this.bottom,
            right: this.right,
            width: this.width,
            display: this.ovbPlay,
            opacity: this.ovbOpacity
          }
        },
        [
          h('h3', {}, this.title),
          h(
            'div',
            {
              class: 'img-overview-handel',
              id: 'img-overview-handel',
              style: { position: 'relative' }
            },
            [
              h('img', { '^src': this.imgSrc, '^width': this.width }),
              h('div', {
                class: 'img-overview-floatbox',
                id: 'img-overview-target',
                style: this.floatbox
              })
            ]
          )
        ]
      );
    },
    watch: {
      imgSrc() {
        setTimeout(() => {
          if (this.imgEl.offsetWidth) {
            this.initFloatBox();
          }
        });
      }
    },
    mounted() {
      const self = this;
      // 监听鸟瞰图
      const floatBoxInstance = new Drag({
        el: this.boxEl.querySelector('#img-overview-target'),
        targetBoxEl: this.boxEl.querySelector('#img-overview-handel'),
        isClone: true,
        moveFn(x, y, e) {
          console.log(x, y);
          const { xlimit, ylimit } = floatBoxInstance.xyLimit();
          document.body.style.overflow = 'hidden';

          if (x < 0) {
            self.floatbox.left = '0px';
          } else if (x > xlimit) {
            self.floatbox.left = xlimit + 'px';
          } else {
            self.floatbox.left = x + 'px';
          }

          if (y < 0) {
            self.floatbox.top = '0px';
          } else if (y > ylimit) {
            self.floatbox.top = ylimit + 'px';
          } else {
            self.floatbox.top = y + 'px';
          }

          self.setFloatBoxEffect();
        },
        endFn(x, y, e) {
          console.log('end');
          // 更新初始位置
          floatBoxInstance.setSelfXY(parseFloat(self.floatbox.left), parseFloat(self.floatbox.top));
          document.body.style.overflow = '';
        },
        outFn() {
          // 更新初始位置
          floatBoxInstance.setSelfXY(parseFloat(self.floatbox.left), parseFloat(self.floatbox.top));
          document.body.style.overflow = '';
          console.log('outFn');
        }
      }).init(0, 0);

      this.floatBoxInstance = floatBoxInstance;
    },
    unmounted() {
      this.floatBoxInstance && this.floatBoxInstance.destroyed();
    },
    methods: {
      /**
       * 计算比列窗口大小
       */
      initFloatBox(_scale) {
        _scale = _scale ? _scale : this.scale;
        console.log('_scale', _scale);
        // 清除缓存的边界数据
        this.floatBoxInstance && this.floatBoxInstance.clearXYLimit();
        console.log('-------------------initFloatBox');
        const boxW = this.boxEl.offsetWidth,
          boxH = this.boxEl.offsetHeight,
          imgW = this.imgEl.offsetWidth,
          imgH = this.imgEl.offsetHeight;
        const { width } = this.boxEl.querySelector('#img-overview-handel').getBoundingClientRect();
        console.log('boxW', boxW);
        console.log('boxH', boxH);
        console.log('imgW', imgW);
        console.log('imgH', imgH);
        console.log('_scale', _scale);

        // 判断是否展示鸟瞰图
        if (imgW * _scale < boxW && imgH * _scale < boxH) {
          console.log('图片小于知识库出');
          this.ovbPlay = 'none';
          this.ovbOpacity = 0;
          return;
        }
        this.ovbPlay = 'block';
        this.ovbOpacity = 1;

        // 占比
        const relativeRatio = width / (imgW * _scale);
        console.log('relativeRatio', relativeRatio);
        this.ratio = relativeRatio;
        this.floatbox.width = boxW * relativeRatio + 'px';
        this.floatbox.height = boxH * relativeRatio + 'px';
        console.log(' this.floatbox', this.floatbox.width);
      },
      /**
       * 获取极值left top
       */
      xyLimit() {
        if (!this.xlimit) {
          const { width: boxWidth, height: BoxHeight } = this.boxEl
            .querySelector('#img-overview-handel')
            .getBoundingClientRect();
          const { width, height } = this.boxEl
            .querySelector('#img-overview-target')
            .getBoundingClientRect();
          this.xlimit = boxWidth - width;
          this.ylimit = BoxHeight - height;
          if (width >= boxWidth) {
            this.xlimit = 0;
          }
          if (height >= BoxHeight) {
            this.ylimit = 0;
          }
        }
        return { xlimit: this.xlimit, ylimit: this.ylimit };
      },
      /**
       * 图纸三要素改变响应
       * @param {*} _translateX
       * @param {*} _translateY
       * @param {*} _scale
       */
      positionEffect(_translateX, _translateY, _scale) {
        // 重新计算大小
        if (this.scale != _scale) {
          this.vm.initFloatBox(_scale);
        }
        this.transformX = _translateX;
        this.transformY = _translateY;
        this.scale = _scale;

        // 将偏移应用到鸟瞰图上
        let left = -_translateX * this.ratio,
          top = -_translateY * this.ratio;
        const { xlimit, ylimit } = this.xyLimit();
        if (left < 0) {
          left = 0;
        }
        if (left > xlimit) {
          left = xlimit;
        }
        if (top < 0) {
          top = 0;
        }
        if (top > ylimit) {
          top = ylimit;
        }
        this.floatbox.left = left + 'px';
        this.floatbox.top = top + 'px';
      },
      setFloatBoxEffect() {
        console.log('-------setFloatBoxEffect-------------');
        const w = parseFloat(this.floatbox.left),
          h = parseFloat(this.floatbox.top);
        this.transformX = -(w / this.ratio);
        this.transformY = -(h / this.ratio);

        this.options.moveCallback &&
          this.options.moveCallback({ transformX: this.transformX, transformY: this.transformY });
      }
    }
  });
}

class OverViewBox {
  constructor(options = ref({})) {
    this.vm = undefined;
    if (!isRef(options)) {
      options = ref(options);
    }
    this.boxEl = options.value?.boxEl;
    mergeOptions(options, { title: '鸟瞰图', width: '10%', bottom: '28px', right: '0px' });
    // 创建app
    this.app = createOverViewComponent(options);
    this.mount();
  }

  mount() {
    const div = document.createElement('div');
    div.setAttribute('id', 'ov-dom');
    this.boxEl.appendChild(div);
    this.vm = this.app.mount(div);
    console.log('-------this.vm---------', this.vm);
    console.log('-------this.vm---------', this.vm.$data);
  }

  destroyed() {
    this.app.unmount();
    this.vm = null;
    this.app = null;
  }

  /**
   * 图纸位置改变
   * @param {*} _translateX
   * @param {*} _translateY
   * @param {*} _scale
   */
  setTranslateEffect(_translateX, _translateY, _scale) {
    this.vm.positionEffect(_translateX, _translateY, _scale);
  }
}

/**
 * 鸟瞰图
 * @param {*} options
 */
function useOverviewBox(options = {}) {
  //  options  属性
  //  boxEl    dom 必须
  // imgEl     dom 必须
  // imgSrc    string 必须
  // title     string
  // width     string
  // bottom    number
  // right     number
  // moveCallback function
  if (options.moveCallback && !(options.moveCallback instanceof Function)) {
    throw new Error('moveCallback must be function');
  }

  return new OverViewBox(options);
}

export default useOverviewBox;

// 鸟看图使用，挂载后方可使用dom
// ovb = useOverviewBox(ref({
//   boxEl: document.getElementById('paint-inner-box'),
//   imgEl: document.getElementById('paint-img'),
//   imgSrc: imgSrc,
//   moveCallback: (params) => {
//     transformX = params.transformX;
//     transformY = params.transformY;
//     domStyle.transform = `translate(${transformX}px, ${transformY}px) translateZ(0) scale(${scale.value})`;
//   }
// }));
