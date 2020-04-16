<template>
  <div>
    <div class="vol-table">
      <div class="mask" v-show="loading"></div>
      <div class="message" v-show="loading">加载中.....</div>
      <el-table
       
        @selection-change="selectionChange"
        @row-click="rowClick"
        ref="table"
        class="v-table"
        @sort-change="sortChange"
        tooltip-effect="dark"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column v-if="ck" type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(column,cindex) in filterColumns()"
          :key="cindex"
          :prop="column.field"
          :label="column.title"
          :min-width="column.width"
          :formatter="formatter"
          :fixed="column.fixed"
          :sortable="column.sort||cindex==0?'custom':false"
        >
        </el-table-column>
        <el-table-column v-if="!doubleEdit" :min-width="100" label="操作" fixed="right">
          <template slot-scope="scope">
            <Button type="info" size="small" @click="beginWithButtonEdit(scope)" ghost>编辑</Button>
            <Button type="info" size="small" @click="endWithButtonEdit(scope)" ghost>完成</Button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block pagination" v-if="!paginationHide">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginations.page"
        :page-sizes="[30, 60, 100,300,500]"
        :page-size="paginations.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginations.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
var $vue;
export default {
  components: {},
  props: {
    tableData: {
      //表数据源,配置了url就不用传这个参数了
      type: Array,
      default: () => {
        return [];
      }
    },
    columns: {
      type: Array,
      default: []
      //[ {
      //   field: "columnType",
      //   title: "数据类型",
      //   width: 120,
      //   hidden:false,
      //   edit: { type: "text", status: false, data: [], key: "" }
      // }] //列的的数据格式edit格式： type类型(text,date,datetime,select,switch),status是否默认为编辑状态
      //data如果是select这里data应该有数据源，如果没有数据请设置key字典编号
    },
    height: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 0
    },
    linkView: {
      type: Function,
      default: function() {
        return 1;
      }
    },
    pagination: {
      type: Object,
      default: function() {
        return { total: 0, size: 0, sortName: "" };
      }
    },
    url: {
      type: String,
      default: ""
    },
    paginationHide: {
      type: Boolean,
      default: true
    },
    color: {
      type: Boolean,
      default: true
    },
    index: {
      //是否创建索引号,如果需要表格编辑功能，这里需要设置为true
      type: Boolean,
      default: false
    },
    allowEmpty: {
      //表格数据为空时是否默认为--
      type: Boolean,
      default: true
    },
    defaultLoadPage: {
      //传入了url，是否默认加载表格数据
      type: Boolean,
      default: true
    },
    loadKey: {
      //是否自动从后台加载数据源,如【审核状态】字段是的值是数字，但要显示对应的文字，1=审核中，2=审核通过
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean, //是否单选
      default: false
    },
    doubleEdit: {
      type: Boolean, //是否双击启用编辑功能
      default: true
    },
    beginEdit: {
      //编辑开始
      type: Function,
      default: function(row, column, index) {
        return true;
      }
    },
    endEditBefore: {
      //结束编辑前
      type: Function,
      default: function(row, column, index) {
        return true;
      }
    },
    endEditAfter: {
      //结束编辑前
      type: Function,
      default: function(row, column, index) {
        return true;
      }
    },
    ck: {
      //是否显示checkbox
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visiblyColumns: [],
      key: "",
      realHeight: 0,
      realMaxHeight: 0,
      enableEdit: false, //是否启表格用编辑功能
      empty: this.allowEmpty ? "" : "--",
      defaultImg: '',//'this.src="' + require("@/assets/imgs/error.png") + '"',
      loading: false,
      footer: {},
      total: 0,
      formatConfig: {},
      defaultColor: "default",
      colors: [
        "success",
        "primary",
        "error",
        "warning",
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "#FFA2D3",
        "default"
      ],
      rule: {
        phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
        decimal: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
        number: /(^[\-0-9][0-9]*([0-9]+)?)$/
      },
      columnNames: [],
      rowData: [],
      paginations: {
        sort: "",
        order: "desc",
        Foots: "",
        total: 0,
        size: 0,
        Wheres: [],
        page: 1,
        rows: 30
      },
      errorFiled: "",
      edit: { columnIndex: -1, rowIndex: -1 }, //当前双击编辑的行与列坐标
      editStatus: {},
      summary: false, //是否显示合计
      //目前只支持从后台返回的summaryData数据
      summaryData: [],
      summaryIndex: {},
      remoteColumns: [] //需要每次刷新或分页后从后台加载字典数据源的列配置
    };
  },
  created() {
    this.realHeight = this.getHeight();
    this.realMaxHeight = this.getMaxHeight();

    //从后台加下拉框的[是否启用的]数据源
    let keys = [];
    let columnBind = [];
    this.summaryData.push("合计");
    this.columns.forEach((x, _index) => {
      if (!x.hidden) {
        this.summaryIndex[x.field] = _index;
        this.summaryData.push("");
      }
      //求和
      if (x.summary && !this.summary) {
        //强制开启选择框
        this.ck = true;
        this.summary = true;
      }
    });
   

    this.paginations.sort = this.pagination.sortName;
    this.enableEdit = this.columns.some(x => {
      return x.hasOwnProperty("edit");
    });
    let keyColumn = this.columns.find(x => {
      return x.isKey;
    });
    if (keyColumn) {
      this.key = keyColumn.field;
    }
    //如果下拉框，判断bind或edit.data是否有数据源，妱果没有则获取数据源bind
    $vue = this;
    // this.$emit
    this.defaultLoadPage && this.load();
  },
  methods: {
    rowClick(row, column) {
      if (!this.doubleEdit) {
        return;
      }
      this.rowBeginEdit(row, column);
    },
    dowloadFile(file) {
      this.base.dowloadFile(
        file.path,
        file.name,
        {
          Authorization: this.$store.getters.getToken()
        },
        this.http.ipAddress
      );
    },
    getFilePath(pathSring) {
      //获取表的图片与文件显示
      if (!pathSring) return "";
      let filePath = pathSring.replace(/\\/g, "/").split(",");
      let fileInfo = [];
      for (let index = 0; index < filePath.length; index++) {
        let file = filePath[index];
        if (file.indexOf(".") != -1) {
          let splitFile = file.split("/");
          if (splitFile.length > 0) {
            fileInfo.push({
              name: splitFile[splitFile.length - 1],
              path: this.base.isUrl(file) ? file : this.http.ipAddress + file
            });
          }
        }
      }
      return fileInfo;
    },
    //重置table
    reset() {
      if (this.tableData && this.tableData.length > 0) {
        this.tableData.splice(0);
      }
      if (this.rowData && this.rowData.length > 0) {
        this.rowData.splice(0);
      }
      if (!this.paginationHide) {
        this.paginations.page = 1;
        this.paginations.rows = 30;
        if (this.paginations.wheres && this.paginations.wheres.length > 0) {
          this.paginations.wheres.splice(0);
        }
      }
      this.errorFiled = "";
      this.edit.columnIndex = -1;
      this.edit.rowIndex = -1;
    },
    getHeight() {
      //没有定义高度与最大高度，使用table默认值
      if (!this.height && !this.maxHeight) {
        return null;
      }
      //定义了最大高度则不使用高度
      if (this.maxHeight) {
        return null;
      }
      //使用当前定义的高度
      return this.height;
    },
    getMaxHeight() {
      //没有定义高度与最大高度，使用table默认值
      if (!this.height && !this.maxHeight) {
        return null;
      }
      //定义了最大高度使用最大高度
      if (this.maxHeight) {
        return this.maxHeight;
      }
      //不使用最大高度
      return null;
    },
    getSelectedOptions(column) {
      if (column.bind && column.bind.data && column.bind.data.length > 0) {
        return column.bind.data;
      }
      return [];
    },
    formatterClick(row, column, event) {
      column.click && column.click(row, column, event);
    },
    initIndex(obj) {
      if (this.index) {
        obj.row.elementIdex = obj.rowIndex;
      }
      return "";
    },
    toggleEdit(event) {},
    setEditStatus(status) {
      this.columns.forEach(x => {
        if (x.hasOwnProperty("edit")) {
          this.$set(x.edit, "status", status);
        }
      });
    },
    //通过button按钮启用编辑
    beginWithButtonEdit(scope) {
      //url?rowData:tableData
      this.rowBeginEdit(scope.row, this.columns[scope.$index]);
    },
    //通过button结束编辑
    endWithButtonEdit(scope) {
      if (this.edit.rowIndex == -1) return;

    },
    rowBeginEdit(row, column) {
      if (this.edit.rowIndex != -1) {
        return;
      }
      if (!this.enableEdit) return;
      //编辑前
      if (!this.beginEdit(row, column, row.elementIdex)) return;
      if (row.hasOwnProperty("elementIdex")) {
        if (this.edit.rowIndex == row.elementIdex) {
          return;
        }
        this.edit.rowIndex = row.elementIdex;
      }
    },
    validateColum(option, data) {
      if (option.hidden || option.bind) return true;
      let val = data[option.field];
      if (option.require || option.required) {
        if (val != "0" && (val == "" || val == undefined)) {
          if (!this.errorFiled) {
            //  event.focus();
            this.$Message.error(option.title + "不能为空");
          }
          return false;
        }
      }
      if (!option.edit) {
        return true;
      }
      let editType = option.edit.type;
      //验证数字
      if (editType == "int" || editType == "decimal" || editType == "number") {
        if (val == "" || val == undefined) return true;
        if (editType == "decimal") {
          if (!this.rule.decimal.test(val)) {
            this.$Message.error(option.title + "只能是数字");
            return false;
          }
        } else if (!this.rule.decimal.test(val)) {
          this.$Message.error(option.title + "只能是整数");
          return false;
        }
        if (
          option.edit.min != undefined &&
          typeof option.edit.min == "number" &&
          val < option.edit.min
        ) {
          this.$Message.error(option.title + "不能小于" + option.edit.min);
          return false;
        }
        if (
          option.edit.max != undefined &&
          typeof option.edit.max == "number" &&
          val > option.edit.max
        ) {
          this.$Message.error(option.title + "不能大于" + option.edit.min);
          return false;
        }
        return true;
      }

      //验证字符串
      if (val && (editType == "text" || editType == "string")) {
        if (
          option.edit.min != undefined &&
          typeof option.edit.min == "number" &&
          val.length < option.edit.min
        ) {
          this.$Message.error(
            option.title + "至少" + option.edit.min + "个字符"
          );
          return false;
        }
        if (
          option.edit.max != undefined &&
          typeof option.edit.max == "number" &&
          val.length > option.edit.max
        ) {
          this.$Message.error(
            option.title + "最多" + option.edit.max + "个字符"
          );
          return false;
        }
        return true;
      }
      return true;
    },
    rowEndEdit(row, column, event) {
      if (!this.enableEdit) {
        if (!this.errorFiled) {
          this.edit.rowIndex = -1;
        }
        return;
      }
      if (!this.doubleEdit && event) {
        return;
      }
      //结束编辑前
      if (!this.endEditBefore(row, column, this.edit.rowIndex)) return;

      if (
        this.edit.rowIndex != -1 &&
        (!this.errorFiled || this.errorFiled == column.property)
      ) {
        let data = (this.url ? this.rowData : this.tableData)[
          this.edit.rowIndex
        ];
        let option = this.columns.find(x => {
          return x.field == column.property;
        });
        if (!option || !option.edit) {
          return;
        }
        if (
          option.edit.type == "datetime" ||
          option.edit.type == "date" ||
          option.edit.type == "select"
        ) {
          if (this.edit.rowIndex == row.elementIdex) {
            return;
          }
        }
        if (!this.validateColum(option, data)) {
          this.errorFiled = option.field;
          return false;
        } else {
          this.errorFiled = "";
        }
      }
      if (this.errorFiled) {
        return;
      }
      if (!this.endEditAfter(row, column, this.edit.rowIndex)) return;
      //  this.errorFiled = "";
      this.edit.rowIndex = -1;
      //this.edit.columnIndex=-1;
    },
    delRow() {
      let rows = this.getSelected();
      if (rows.length == 0) return this.$Message.error("请选择要删除的行!");

      let data = this.url ? this.rowData : this.tableData;
      let indexArr = this.getSelectedIndex();
      if (indexArr.length == 0) {
        return this.$Message.error(
          "删除操作必须设置VolTable的属性index='true'"
        );
      }
      if (indexArr.length == 0) {

      } else {
        for (let i = data.length - 1; i >= 0; i--) {
          if (indexArr.indexOf(i) != -1) {
            data.splice(i, 1);
          }
        }
      }
      this.edit.rowIndex = -1;
      return rows;
    },
    addRow(row) {
      if (!row) {
        row = {};
      }
      this.columns.forEach(x => {
        if (x.edit && x.edit.type == "switch") {
          if (!row.hasOwnProperty(x.field)) {
            row[x.field] = x.type == "bool" ? false : 0;
          }
        }
      });
      if (!this.url) {
        this.tableData.push(row);
        return;
      }
      this.rowData.push(row);
    },
    viewImg(row, column, url) {
      this.base.previewImg(url, this.http.ipAddress);
      // window.open(row[column.field]);
    },
    link(row, column) {
      this.$props.linkView(row, column);
    },
    getSelected() {
      return this.$refs.table.selection;
    },
    getSelectedIndex() {
      if (!this.index) {
        //只有设置了属性index才有索引行
        return [];
      }
      let indexArr = this.$refs.table.selection.map(x => {
        return x.elementIdex;
      });
      return indexArr ? indexArr : [];
    },
    GetTableDictionary(rows) {
      
      
    },
    load(query, isResetPage) {
      //isResetPage重置分页数据
      if (!this.url) return;
      if (isResetPage) {
        this.resetPage();
      }
      let param = {
        page: this.paginations.page,
        rows: this.paginations.rows,
        sort: this.paginations.sort,
        order: this.paginations.order,
        wheres: [] //查询条件，格式为[{ name: "字段", value: "xx" }]
      };
      let status = true;
      //合并查询信息(包查询分页、排序、查询条件等)
      if (query) {
        param = Object.assign(param, query);
      }
      /*查询前处理(如果需要查询条件，实现组件方法loadBefore方法即可:
        loadBefore=(param, callBack)=>{
          param.wheres = [{ name: "PhoneNo", value: "13419098211" }];
          callBack(true);
        })
      */
      this.$emit("loadBefore", param, result => {
        status = result;
      });
      if (!status) return;

      if (param.wheres && param.wheres instanceof Array) {
        param.wheres = JSON.stringify(param.wheres);
      }
      this.loading = true;
      this.http.post(this.url, param).then(
        data => {
          this.loading = false;
          //查询返回结果后处理
          this.$emit("loadAfter", data.rows || [], result => {
            status = result;
          });
          if (!status) return;
          this.GetTableDictionary(data.rows);
          this.rowData = data.rows || [];
          this.paginations.total = data.total;
          //合计
          this.getSummaries(data);
        },
        error => {
          this.loading = false;
          // this.$Message.error(error || "网络异常");
        }
      );
    }, //获取统计
    getSummaries(data) {
      if (!this.summary || !data.summary) return;
      this.summaryData.splice(0);
      //如果有checkbox，应该算作是第一行
      if (this.ck) {
        this.summaryData.push(0);
      }
      this.columns.forEach(col => {
        if (!col.hidden) {
          if (data.summary.hasOwnProperty(col.field)) {
            this.summaryData.push(data.summary[col.field]);
          } else {
            this.summaryData.push("");
          }
        }
      });
      if (this.summaryData.length > 0 && this.summaryData[0] == "") {
        this.summaryData[0] = "合计";
      }
    },
    getInputChangeSummaries() {},
    filterColumns() {
      return this.columns.filter(x => {
        return !x.hidden;
      });
    },
    handleSizeChange(val) {
      this.paginations.rows = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.paginations.page = val;
      this.load();
    },
    sortChange(sort) {
      this.paginations.sort = sort.prop;
      this.paginations.order = sort.order == "ascending" ? "asc" : "desc";
      this.load();
    },
    resetPage() {
      //重置查询分页
      this.paginations.rows = 30;
      this.paginations.page = 1;
    },
    selectionChange(selection) {
      // console.log(selection);
    
    },
    getColor(row, column) {
      let val = row[column.field];

      // if (val == "" || val == null || val == undefined) {
      //  return "none";
      // }
      if (column.getColor && typeof column.getColor == "function") {
        let _color = column.getColor(row, column);
        if (_color) {
          return _color;
        }
      }
      if (!val && val != "0") {
        return this.defaultColor;
      }
      if (!this.formatConfig[column.field]) {
        this.formatConfig[column.field] = [val];
        return this.colors[0];
      }
      let index = this.formatConfig[column.field].indexOf(val);
      if (index != -1) {
        return this.colors[index];
      }
      if (this.formatConfig[column.field].length > 15) {
        return this.defaultColor;
      }

      if (index == -1) {
        this.formatConfig[column.field].push(val);
        index = this.formatConfig[column.field].length - 1;
      }
      return this.colors[index];
    },
    formatterDate(row, column) {
      return (row[column.field] || "").substr(0, 10);
    },
    

  }
};
</script>
<style lang="less" scoped>
.vol-table {
  position: relative;
  .mask {
    opacity: 0.2;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #d0d0d0;
    z-index: 100;
  }
  .message {
    text-align: center;
    color: #635c5c;
    font-size: 15px;
    font-weight: 600;
    background: #eee;
    transform: translateY(-50%);
    top: 50%;
    position: absolute;
    z-index: 200;
    left: 0;
    right: 0;
    width: 150px;
    margin: 0 auto;
    line-height: 40px;
    border-radius: 4px;
    border: 1px solid #a09e9e;
  }
}
.e-item {
  display: flex;
  > div:first-child {
    flex: 1;
  }
}
</style>


<style scoped>
/*表头错行 .el-table th.gutter{
    display: table-cell!important;
} */
.pagination {
  text-align: right;
  /* margin-top: 8px; */
  padding: 2px 28px;
  border: 1px solid #eee;
  border-top: 0px;
}
.v-table >>> .el-table__header th {
  padding: 1.5px !important;

  background-color: #f8f8f9 !important;
  font-size: 13px;
}
.v-table >>> .el-table__body .cell {
  word-break: inherit !important;
  white-space: nowrap !important;
}
.v-table >>> .el-table__body td {
  padding: 7px 0 !important;
}

.v-table >>> .el-table__footer td {
  padding: 5px 0 !important;
}
.vol-table >>> .el-table th > .cell {
  white-space: inherit !important;
}
.vol-table >>> .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.vol-table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #ddd;
}
.vol-table .table-img {
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
  width: 40px;
  object-fit: cover;
}
.vol-table .table-img:hover {
  cursor: pointer;
}
.v-table >>> .ivu-tag-default {
  border: none !important;
  background: none !important;
}
/* .spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .message{
        height: 50px;
        position: relative;
        border: 1px solid #eee;
    } */
</style>

