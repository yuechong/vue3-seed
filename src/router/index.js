import { createRouter, createWebHistory } from 'vue-router';
import { beforeEach, afterEach } from './intercepter';
import RouteApp from './route-app';
// import LayoutView from '../views/LayoutView/index.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/layout-view/index.vue'),
      // redirect: { path: '/home' },
      children: RouteApp()
    },
    // 重定向
    {
      path: '/redirect/:path*',
      redirect: (to) => {
        const { path } = to.params;
        // 在这里根据传递的参数动态计算重定向目标
        return path;
      }
    }
  ]
});

// 路由拦截
router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;
// 重置
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // the relevant part
}