// The Vue build version to load with the `import` command
//使用‘import’命令加载的vue构建版本
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//(仅运行时或独立运行时)已在webPack.base.conf中设置了别名。 
import Vue from 'vue'
import App from './App'
import Loading from './components/loading'
import router from './router'

import Vuex from 'vuex'
import store from './store/store'

Vue.prototype.$store = store;

// 引入axios，并加到原型链中
import Axios from 'axios';

Vue.prototype.$axios = Axios;
import QS from 'qs'

Vue.prototype.qs = QS;

//全局loading组件
Vue.component(Loading);

Vue.config.productionTip = false

Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
});
//定义一个请求拦截器
Axios.interceptors.request.use((config) => {
  console.log('请求拦截器');
  store.state.isShow = true;
  //在发送请求之前做某件事
  // if (config.method === 'post') {
  //   console.log(config.data)
  //   config.data = QS.stringify(config.data);
  //   console.log(config.data)
  //   //Object { file: 888 }    qs执行前
  //   //file=888            qs执行后
  // }
  return config;
}, (error) => {
  store.state.isShow = false;
  return Promise.reject(error);
});
//定义一个响应拦截器
Axios.interceptors.response.use((res) => {
  console.log('响应拦截器');
  store.state.isShow = false;//在这里对返回的数据进行处理
  return res;
}, (error) => {
  console.log('网络异常');
  store.state.isShow = false;
  return Promise.reject(error);
});

