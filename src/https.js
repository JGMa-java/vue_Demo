import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Vuex from 'vuex'
import store from './store/store'
Vue.prototype.$store = store;

Vue.use(Vuex);
axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
//axios.defaults.baseURL = '';   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //开启loading
  console.log('请求拦截器');
  this.$store.commit('setIsShow',true);
  console.log(this.$store.state.isShow);

  //在发送请求之前做某件事
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  console.log('错误的传参');
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //关闭loading
  console.log('响应拦截器')
  //对响应数据做些事
  if(!res.data.success){
    return Promise.resolve(res);
  }
  return res;
}, (error) => {
  console.log('网络异常');
  return Promise.reject(error);
});
//封装请求

// //返回一个Promise(发送post请求)
export function Post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// ////返回一个Promise(发送get请求)
export function Get(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param})
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  Post,
  Get
}

//第一版
// axios.defaults.timeout = 3000;
// //请求拦截器
// axios.interceptors.request.use((config) => {
//   console.log("请求拦截：", config);
//   this.isShow = true;
//   return config;
// }, (error) => {
//   // Do something with request error
//   return Promise.reject(error);
// });
// //响应拦截器
// axios.interceptors.response.use((response) => {
//   console.log("响应拦截：", response);
//   this.isShow = false;
//   return response;
// }, (error) => {
//   // Do something with response error
//   return Promise.reject(error);
// });
