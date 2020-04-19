<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  margin: 0;
  padding: 0;
  /* overflow: hidden; */
}

/* elementui css */
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
.el-input__inner{
    line-height: 32px;
    height: 32px;
}
.el-button{
  padding: 8px 20px;
}
  .form-closex {
    text-align: right;
    padding-bottom: 24px;
  }
  .form-closex button {
    margin-left: 10px;
    padding: 4px 13px;
  }
</style>
