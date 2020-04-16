<template>
  <div class="sodata">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="so" label="内部PO" sortable width="180"></el-table-column>
      <el-table-column prop="prod" label="生产型号" sortable width="180"></el-table-column>
      <el-table-column prop="date" label="交期" sortable width="180"></el-table-column>
      <el-table-column prop="address" label="备注" :formatter="formatter"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "sodata",
  data() {
    return {
      tableData: [
        {
          so:"SO0001",
          date: "2016-05-02",
          prod: "A001H001",
          address: "remark..."
        },
        {
          so:"SO0002",
          date: "2016-05-04",
          prod: "A001H002",
          address: "remark..."
        },
        {
          so:"SO0003",
          date: "2016-05-01",
          prod: "A001H003",
          address: "remark..."
        },
        {
          so:"SO0004",
          date: "2016-05-03",
          prod: "A001H004",
          address: "remark..."
        }
      ]
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    }
  }
};
</script>

<style>
.has-gutter tr{
    line-height:11.5px !important;
}
.has-gutter tr th {
    background-color: #f8f8f9 !important;
    line-height:11px !important;
    padding: 1.5px!important;
}
.el-table__row td{
    padding: 1.5px!important;
}
</style>
