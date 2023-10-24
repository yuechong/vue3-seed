import PerfectScrollbar from 'perfect-scrollbar';
export default {
  mounted(el, binding) {
    el.__ps = new PerfectScrollbar(el);
  },
  beforeUnmount(el){
    el.__ps && el.__ps.destroy();
  }
};
// Those requirements are met in the CSS in the package, but please keep in mind when you'd like to change the CSS files.
// the container must have an overflow: hidden css style.
// the scrollbar's position must be absolute.
// the scrollbar-x must have bottom or top, and the scrollbar-y must have right or left.

// <div style="height:200px;position:relative;overflow:hidden"></div>
