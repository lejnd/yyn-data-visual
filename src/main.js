import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import echarts from 'echarts';
import fly from 'flyio';

const debug = process.env.NODE_ENV !== 'production'

Vue.config.productionTip = false;

fly.config = {
  headers: {
    StateProperty: StateProperty,
    'Content-Type': 'application/json;charset=UTF-8'
  },
  baseURL: debug ? '/api' : '',             //请求基地址
  timeout: 0,             //超时时间，为0时则无超时限制
  withCredentials: false    //跨域时是否发送cookie
}

fly.interceptors.response.use(
  (response,promise) => {
      //只将请求结果的data字段返回
      return JSON.parse(response.data)
  },
  (err,promise) => {
      //发生网络错误后会走到这里
      promise.resolve("网络错误：", err)
  }
)

Vue.prototype.$fly = fly;
Vue.prototype.$echarts = echarts;
// Vue.prototype.$ = $;

Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
