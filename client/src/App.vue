<template>
  <div class="App">
    <el-container>
      <el-aside width="200px">
        <zgz-aside></zgz-aside> <!-- 我是侧边栏 -->
      </el-aside>
      <el-container>
        <el-header>
          <zgz-header></zgz-header>
        </el-header>
        <el-main>
          <zgz-tabs></zgz-tabs> <!-- 我是tabs组件 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import  zgzAside from './components/aside'
import  zgzHeader from './components/tabs'
export default {
  name: 'App',
  components: {
    zgzAside,
    zgzHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
