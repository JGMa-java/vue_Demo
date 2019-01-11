<template>
  <div class="hello">
    {{msg}}<br/>
    {{testData}}<br/>
    <Loading v-show="this.$store.state.isShow"></Loading>
    <span v-if="isExist">测试v-if是消除还是隐藏？消除</span>
    <button @click="isExist=!isExist,testData=''">你好</button><br/>
    <input type="file" name="file" ref="file"/>
    <button @click="requestLoading">上传图片</button>
    <button @click="requestCancel">取消上传</button>

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
        cancelSource:''
      }
    },
    methods: {
      requestLoading: function () {

        //取消请求
        // var cancelToken = axios.CancelToken;
        // var cancelTokenSource = cancelToken.source();
        // this.cancelSource=cancelTokenSource;

        axios.post('/firstDemo/upload',{file:888}).then(res => {
            this.testData = res.data;
            console.log(res.data)
          }).catch(err => {
          this.isShow = false;
          console.log(err)
        })
      },
      //取消请求事件
      requestCancel:function () {
        //this.cancelSource.cancel();
        axios.get('/firstDemo/cancelUpload','file=666',{
          //timeout:4000
        }).then(res => {
          this.testData = res.data;
          console.log(res.data)
        }).catch(err => {
          this.isShow = false;
          console.log(err)
        })
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
