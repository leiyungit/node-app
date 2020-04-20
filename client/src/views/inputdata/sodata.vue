<template>
  <div class="sodata">
    <div class="search">
      <el-form :inline="true" :model="search_data" class="form-search">
        <el-form-item label="内部PO">
          <el-input v-model="search_data.so" placeholder="请输入内部PO" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" class="btn-search" icon="el-icon-search">查询</el-button>
          <el-button type="primary" @click="searchBoxShow=!searchBoxShow" class="btn-search-drown">
            <i class="el-icon-arrow-down"></i>
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="reLoad">刷新</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handleAdd">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="handSync">同步</el-button>
        </el-form-item>
        <el-form-item>
          <el-dropdown split-button @command="handleCommand">
            更多
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="edit">编辑&emsp;</el-dropdown-item>
              <el-dropdown-item command="del">删除&emsp;</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-box" v-show="searchBoxShow">
      <el-form :inline="true" :model="search_data" class="form-search">
        <el-form-item label="内部PO">
          <el-input v-model="search_data.so" placeholder="请输入内部PO" clearable></el-input>
        </el-form-item>
        <el-form-item label="生产型号">
          <el-input v-model="search_data.prod" placeholder="请输入生产型号" clearable></el-input>
        </el-form-item>
        <el-form-item label="交期">
          <el-date-picker v-model="search_data.startTime" type="date" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>--</el-form-item>
        <el-form-item>
          <el-date-picker v-model="search_data.endTime" type="date" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="form-closex" slot="footer">
        <el-button size="small" type="primary" ghost @click="search">
          <i type="md-search" />查询
        </el-button>
        <!-- <Icon type="md-close-circle" color="color" size="20" /> -->
        <el-button size="small" type="success" ghost @click="resetSearch">
          <i type="md-refresh" />重置
        </el-button>
        <el-button size="small" type="warning" ghost @click="searchBoxShow=!searchBoxShow">
          <i type="md-power" />关闭
        </el-button>
      </div>
    </div>
    <div class="vtable">
      <el-table
        :data="tableData"
        style="width: 100%"
        :height="tableHeight"
        border
        stripe
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="so_no" label="内部PO" sortable width="120"></el-table-column>
        <el-table-column prop="prod_no" label="生产型号" sortable width="160"></el-table-column>
        <el-table-column prop="delivery_date" label="交期" sortable width="100"></el-table-column>
        <el-table-column prop="order_num" label="订单数量" align="right" width="100"></el-table-column>
        <el-table-column prop="so_status" label="PO状态" sortable width="160"></el-table-column>
        <el-table-column prop="so_remark" label="备注" :formatter="formatter" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_date" label="创建时间" sortable width="160"></el-table-column>
        <el-table-column prop="modify_date" label="修改时间" sortable width="160"></el-table-column>
      </el-table>
    </div>
    <div class="block pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
    <dialog-so :dialog="dialog" :formData="formData" @update="getSodata()"></dialog-so>
  </div>
</template>

<script>
import DialogSo from "@/components/so/DialogSo.vue";
import ApiSyncInsideOrder from "@/api/SyncInsideOrder";

export default {
  name: "sodata",
  components: {
    DialogSo
  },
  data() {
    return {
      dialog: { show: false },
      formData: {},
      currentPage: 1, // 当前分页选择
      searchBoxShow: false, // 查询容器是否显示
      labelWidth: 100, //高级查询的标签宽度
      tableHeight: window.innerHeight-200, // 表格滚动条设置高度 "72vh", // window.innerHeight-400
      search_data: {
        so: "",
        prod: "",
        startTime: "",
        endTime: ""
      },
      multipleSelection: [],
      tableData: []
    };
  },
  created(){
    this.getSodata();
  },
  methods: {
    getSodata() {
      // 初始化加载
      ApiSyncInsideOrder.getSolist()
      .then(res=>{
         console.log(res);
        this.tableData=res.data;
      })
      .catch(err=>{
        this.$message.error("未知错误请重试");
      })
    },
    reLoad(){
      this.getSodata();
    },
    formatter(row, column) {
      return row.so_remark;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    search() {},
    resetSearch() {},
    handleAdd() {
      this.dialog = {
        show: true,
        width:"400px",
        option: "add",
        title: "添加内部PO单据"
      };
      this.formData = {
        so: "",
        prod: "",
        date: "",
        status: "",
        remark: ""
      };
      console.log(this.dialog);
    },
    handSync() {
       //this.$router.push('/adminhome');
       //this.$router.push('@/components/AdminIndex.vue');
        //this.$router.push({ path:'/index'  });
        //window.location.href="./test.vue";
       //console.log(111);
      this.$message({ message: "同步，调用接口下载数据！暂未实现" });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    handleCommand(command) {
      if (this.multipleSelection.length === 0) {
        this.$message.error("请在列表复选框选择一个项目");
      }
      if (command === "edit") {
        console.log("edit command");
        if (this.multipleSelection.length > 1) {
          this.$message.error("编辑复选框只能选择一行记录");
        }
        this.dialog = {
          show: true,
          option: "edit",
          title: "修改内部PO单据"
        };
        
        this.formData = this.multipleSelection[0];
      } else if (command === "del") {
        console.log("del command");
      }
      console.log(this.multipleSelection);
    },
    setDialogWidth() {
      // console.log(document.body.clientWidth)
      // console.log(document.clientHeight)
      // var val = document.body.clientWidth
      // const def = 400 // 默认宽度
      // if (val < def) {
      //   this.dialog.width = '100%'
      // } else {
      //   this.dialog.width = def + 'px'
      // }
    }
  }
};
</script>

<style  lang="scss" scoped>
.sodata {
  width: 100%;
  z-index: 1001;
  //border: 1px solid red;
  .vtable {
    // height: 100%;
    //height: 400px;
    //height: 70vh;
    overflow: auto;
  }
  .pagination {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 160px;
    //width: 100%;
    text-align: right;
    //margin-right: 160px;
    /* margin-top: 8px; */
    //padding: 2px 0px;
    border: 1px solid #eee;
    //margin-right: 160px; // 左侧菜单的宽度
    //border-top: 0px;
  }
}
.search-box {
  position: absolute;
  //top: 10%;
  //left: 10%;
  border: 1px solid #eee;
  background-color: white;
  z-index: 1002;
}
.btn-search {
  height: 31px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-search-drown {
  height: 31px;
  margin-left: -2px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-left-radius: 0;
  border-left: 1px solid #eee;
  border-top-left-radius: 0;
}
.btn-more i {
  width: 5px;
}
</style>

