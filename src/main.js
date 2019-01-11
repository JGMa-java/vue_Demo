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
import axios from 'axios';
Vue.prototype.$axios = axios;
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
})

