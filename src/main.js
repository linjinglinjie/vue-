// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Loadmore, InfiniteScroll, Spinner, Swipe, SwipeItem, Switch , Radio } from 'mint-ui'
import './assets/plugins/rem'
import FastClick from 'fastclick'
import $ from 'n-zepto'
import axios from 'axios'
import './assets/fonts/iconfont.css'
import {setCookie,getCookie} from '@/assets/plugins/cookie.js' 
Vue.prototype.$http = axios
Vue.component(Loadmore.name, Loadmore)
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner);
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Switch.name, Switch);
Vue.component(Radio.name, Radio);

/*if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}*/


Vue.config.productionTip = false
setCookie('v_v-s-rest',"df628e37-1337-43a9-9aae-877ba21cc8d9")
/* eslint-disable no-new */
new Vue({
  el: '#book',
  router,
  template: '<App/>',
  components: { App }
})
// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
    config => {
       /*if (window.localStorage.username) {
            config.headers.Authorization = window.localStorage.username;
            
        }*/
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

