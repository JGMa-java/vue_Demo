<template>
  <div class="hello">
    {{msg}}<br/>
    {{testData}}<br/>
    <Loading v-show="this.$store.state.isShow"></Loading>
    <span v-if="isExist">测试v-if是消除还是隐藏？消除</span>
    <button @click="isExist=!isExist,testData=''">你好</button>
    <br/>
    <b>上传进度:{{rate}}%</b><br/>
    <!--或者使用@change事件，fn(e){e.target.files[0]}-->
    <input type="file" name="file" ref="file" @change="changeFile"/>

    <button @click="requestLoading">上传图片</button>
    <button @click="requestCancel">取消上传</button>
    <br/>
    <ul>
      <li>
        <ul>所有路由：</ul>
        <ul></ul>
        <ul></ul>
        <ul></ul>
        <ul></ul>
      </li>
      <li style="text-align: left">
        <ul>/</ul>
        <ul>/test</ul>
        <ul>/index</ul>
        <ul>/index/loading</ul>
      </li>
    </ul>


  </div>
</template>

<script>
  //import https from '../https.js' 　　// 注意用自己的路径
  //import axios from 'axios'
  import Loading from "./loading";

  export default {
    name: 'HelloWorld',
    components: {Loading},
    data() {
      return {
        msg: 'demo4欢迎来到您的Vue.js App',
        isExist: true,
        testData: '',
        cancelSource: '',
        rate:0,
        file:{}
      }
    },
    methods: {
      requestLoading: function () {

        //取消请求
        var cancelToken = this.$axios.CancelToken;
        var cancelTokenSource = cancelToken.source();
        this.cancelSource=cancelTokenSource;

        var fd = new FormData();
        fd.append('file',this.file)
        console.log(fd)

        this.$axios.post('/firstDemo/upload', fd, {
          //timeout: 200  设置options
          cancelToken: cancelTokenSource.token,
          headers:{'Content-Type': 'multipart/form-data'},
          onUploadProgress: (progressEvent) =>{
            this.rate = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2);
            console.log(this.rate)
          }
        }).then(res => {
          console.log();
        }).catch(err => {
          this.isShow = false;
          console.log(err)
        })
      },
      //取消请求事件
      requestCancel: function () {
        this.cancelSource.cancel();
      },
      changeFile:function (e) {
        this.file= e.target.files[0];
        this.rate=0;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
添加“作用域”属性，仅将css限制为此组件 
-->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
