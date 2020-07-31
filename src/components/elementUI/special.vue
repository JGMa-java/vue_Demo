<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary">添加</el-button>
        <el-button icon="el-icon-delete" type="danger">删除</el-button>
        <el-button type="primary">baseMessage</el-button>
        <el-button type="primary">baseAlert</el-button>
        <el-button type="primary">baseConfirm</el-button>
        <el-button type="primary">baseNotify</el-button>
      </vab-query-form-left-panel>
       <vab-query-form-right-panel style="float:right;">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="querySpecialList"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

<!--  -->
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column show-overflow-tooltip type="selection" width="55"></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="id" label="id"></el-table-column>
      <el-table-column show-overflow-tooltip label="专题名" prop="title"></el-table-column>
      <el-table-column show-overflow-tooltip label="图片">
        <template slot-scope="scope">
          <el-image  style="height: 50px" fit="contain" v-if="imgShow" :preview-src-list="imageList" :src="scope.row.headpic"></el-image>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="摘要" prop="remark" sortable></el-table-column>
      <!-- <el-table-column show-overflow-tooltip label="状态">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.status" class="item" effect="dark" placement="top-start">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <!-- <el-table-column show-overflow-tooltip label="时间" prop="createtime" width="200"></el-table-column> -->
      <el-table-column show-overflow-tooltip label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <table-edit ref="edit"></table-edit>
  </div>
</template>
<script>
export default {
  name: "specialTable",
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      selectRows: "",
      elementLoadingText: "正在加载...",
      queryForm: {
        pageNo: 1,
        pageSize: 20,
        title: "",
      },
    };
  },
  created() {
    
  },
  beforeDestroy() {},
  mounted() {
      this.querySpecialList();
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
        .get("/firstDemo/querySpecial", null, {
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
            // debugger;
            this.list = res.data;
            this.listLoading =false;
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