<template>
  <div id='bg'>
    <el-container id='root-container'>
      <el-header>
        <top-bar/>
      </el-header>
      <el-container>
        <el-aside width="200px">
           <left-nav/>
        </el-aside>
        <el-main>
          <right-tabs/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftNav from "./AdminHome/LeftNav";
import RightTabs from "./AdminHome/RightTabs";
import TopBar from "./AdminHome/TopBar";
export default {
  components: {
    LeftNav,
    RightTabs,
    TopBar
  }
};
</script>

<style scoped>
#bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.root-container {
  position: relative;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #2b3749;
}
.el-aside {
  height: 100%;
  width: 200px;
}
.el-main {
  height: 100%;
  padding-top: 1px;
  padding-left: 1.5rem;
}
</style>
