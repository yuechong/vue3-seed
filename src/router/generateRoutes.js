import RouteApp from './route-app';
import $router, { resetRouter } from '@/router';

/**
 * 重定向
 * @param {*} routes
 */
const generateRedict = routes => {
  routes.forEach(item => {
    if (item.redirect) {
      // console.log('item', item);
      // console.log(routes);
      if (typeof routes[0]['children'] !== 'undefined' && routes[0]['children'].length > 0) {
        item.redirect = routes[0].children[0].path;
      } else {
        item.redirect = routes[0].path;
      }
    }
    if (item.children) {
      generateRedict(item.children);
    }
  });
};

/**
 * 根据pathIds生成路由
 */
const generaRoute = (routes, pathIds) =>
  routes.filter(item => {
    // 判断是否是权限限制
    if (typeof item['pathId'] !== 'undefined') {
      // console.log(pathIds);
      // 在权限数组里，单个pathId
      if (typeof item['pathId'] === 'number' || typeof item['pathId'] === 'string') {
        if (pathIds.includes(item['pathId'])) {
          // 如果有children
          if (item.children) {
            item.children = generaRoute(item.children, pathIds);
          }
          return item;
        }
      } else {
        // 数组形式的pathId
        const array = item['pathId'];
        if (array.some(aitem => pathIds.includes(aitem))) {
          // 如果有children
          if (item.children) {
            item.children = generaRoute(item.children, pathIds);
          }
          return item;
        }
      }
    } else {
      // 如果有子children
      if (item.children) {
        item.children = generaRoute(item.children, pathIds);
        // if (item.children.length === 0) {
        // }
      }
      return item;
    }
  });

const initRoute = pathIds => {
  return new Promise((resolve, reject) => {
    const routes = RouteApp();
    // console.log('origin route', routes);

    // admin do somthing in this
    // 先过滤路由
    routes.children = generaRoute(routes.children, pathIds);
    // generateRedict(routes.children);
    // console.log('SET_UserRoutes', JSON.stringify(routes));
    // 添加重定向
    routes.children.push({
      path: '*',
      redirect: routes.children[0].path || '/'
    });
    // console.log('initRoute', routes);
    // 重置路由
    resetRouter();
    $router.addRoutes([routes]);
    // 路由重定向
    const path = window.location.pathname;
    // console.log('path', path);
    if (path !== '/login') {
      $router.push(path);
    } else {
      $router.push('/').catch(err => {
        console.log('err', err);
      });
    }
    resolve(routes);
  });
};

export default initRoute;
