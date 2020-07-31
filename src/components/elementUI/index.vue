<template>
  <!-- style="border: 1px solid #eee" -->
  <el-container>
    <el-header class="site-topbar">
      <div class="container">
        <!-- toolbar框 -->
        <div class="topbar-nav">
          小米商城
          <span class="sep">|</span>
          MIUI
          <span class="sep">|</span>
          loT
          <span class="sep">|</span>
          云服务
          <span class="sep">|</span>
          金融
          <span class="sep">|</span>
          有品
          <span class="sep">|</span>
          小爱开放平台
          <span class="sep">|</span>
          企业团购
          <span class="sep">|</span>
          资质证照
          <span class="sep">|</span>
          协议规则
          <span class="sep">|</span>
          下载app
          <span class="sep">|</span>
          Select Location
        </div>

        <!-- 购物车 -->
        <div class="topbar-cart" @mouseenter="show3 = true" @mouseout="show3 = false">
          <a href="#" class="cart-mini">
            <i class="el-icon-shopping-cart-2 cart-icon"></i>购物车(0)
          </a>
          <div id="J_miniCartMenu" v-show="show3" class="cart-menu" style="height: 100px;">
            <div class="menu-content">
              <!-- <div class="loading hide">
                <div class="loader"></div>
              </div>-->
              <ul id="J_miniCartList" class="cart-list hide"></ul>
              <div id="J_miniCartListTotal" class="cart-total clearfix hide"></div>
              <div class="msg msg-error hide"></div>
              <div class="msg msg-empty">购物车中还没有商品，赶紧选购吧！</div>
            </div>
          </div>
        </div>

        <!-- 用户信息 -->
        <div class="topbar-info">
          <router-link to="/demo4">登录</router-link>
          <span class="sep">|</span>
          注册
          <span class="sep">|</span>
          消息通知
        </div>
      </div>
    </el-header>
    <el-header class="site-header">
      <div class="container">
        <!-- logo -->
        <div class="header-logo">
          <a class="logo ir"></a>
        </div>
        <!-- 产品大分类 -->
        <div id="header-category" style="margin-left: 150px;float:left;">
          <span>小米手机</span>
          <span>Redmi 红米</span>
          <span>电视</span>
          <span>笔记本</span>
          <span>家电</span>
          <span>路由器</span>
          <span>智能硬件</span>
          <span>服务</span>
          <span>社区</span>
        </div>
        <div id="header-search" style="margin-left: 90px;float:right;">
          <el-input size="large" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
    </el-header>
    <el-main class="home-hero container" style="border: 1px solid #eee;">
      <!-- <el-aside class="site-category">
        <el-menu :default-openeds="['1','2', '3']">
          <el-menu-item index="1">
            <span slot="title">导航二</span>
            <i class="el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">导航二</span>
            <i class="el-icon-arrow-right"></i>
          </el-menu-item>
        </el-menu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
        </el-submenu>
      </el-aside>-->
      <specialTable></specialTable>
    </el-main>
  </el-container>
</template>

<style>
#header-category span:hover{
  cursor: pointer;
  color: #ff6700;
}
#header-search .el-input__inner{
  height: 48px !important;
  border-radius: 0;
}
#header-search .el-input__inner:focus {
  border: 1px solid #ff6700 !important;
}
#header-search .el-input__inner:focus + .el-input-group__append{
  border-bottom: 1px solid #ff6700 !important;
  border-top: 1px solid #ff6700 !important;
  border-right: 1px solid #ff6700 !important;
}


#header-search .el-input-group__append{
  border-radius: 0;
  font-size: 18px;
  background-color: #fff;
  border-left: none;
}
#header-search .el-input-group__append:hover{
  /* border: 1px solid red !important; */
  /* border-bottom: 1px solid #ff6700 !important;
  border-top: 1px solid #ff6700 !important;
  border-right: 1px solid #ff6700 !important; */
  background-color: #ff6700;
  color: #fff;
}

</style>

<script>
import Loading from "../loading";
import specialTable from "./special"

export default {
  name: "element_main",
  components: { Loading ,specialTable},
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
      show3: false,
    };
  },
  methods: {
    querySpecialList: function () {
      //取消请求
      var cancelToken = this.$axios.CancelToken;
      var cancelTokenSource = cancelToken.source();
      this.cancelSource = cancelTokenSource;

      var fd = new FormData();
      // fd.append("file", this.file);

      this.$axios
        .get("/firstDemo/querySpecial", fd, {
          //timeout: 200  设置options
          cancelToken: cancelTokenSource.token,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            this.rate = (
              (progressEvent.loaded / progressEvent.total) *
              100
            ).toFixed(2);
            console.log(this.rate);
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.isShow = false;
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
@import url(../../assets/elementIndex.css);
</style>