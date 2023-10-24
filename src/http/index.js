import axios from 'axios';
import { message } from 'ant-design-vue';
// import router from '../router/index';
// 请求拦截
// axios.interceptors.request.use(
//   config => {
//     // config.url = '/api'+config.url;
//     console.log('axios url', config.url);
//     if (config.url.includes('login')) {
//       return config;
//     }
//     config.headers['token'] = (window.sessionStorage.getItem('rss-token') || '');
//     return config;
//   },
//   error => {
//     return error;
//   }
// );

const WHITE_URLS = [
  '/api/v1/printReport/registerBeforeCheck',
  '/api/v1/bluePrint/checkBluePrintInfo',
  '/api/v1/bluePrint/checkBluePrintInfoByOperation'
];

// 0 success
// 1001 error

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log('TCL: response', response);
    // 2xx 范围内的状态码都会触发该函数。
    const data = response.data,
      requestUrl = response?.config?.url;
    console.log('requestUrl', requestUrl);

    // 是否在白名单
    if (WHITE_URLS.includes(requestUrl)) {
      return response;
    }

    // Blob 返回的忽略
    if (data instanceof Blob) {
      if (data?.size < 200) {
        message.error('图片请求异常');
      }
      return response;
    }
    // string 返回忽略
    if (typeof data === 'string') {
      return response;
    }

    // 错误统一拦截
    if (data?.code !== 0) {
      message.error(data?.result || 'Error');
    }
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    console.log('TCL: error11111', error);
    message.error(error?.message || 'Error');
    // const message = error?.response?.data?.message;
    // if(message==='401'){
    //   router.push({path:'login'});
    // }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error?.response);
  }
);

export default axios;
