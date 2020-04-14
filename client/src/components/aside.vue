<template>
  <div class="zgz-admin-index-aside">
    <el-col :span="24">
      <div class="zgz-shop-avatar-name">
       
        <p class="name">追光者Aaron</p>
      </div>
      <!--
		:default-active="$route.name"
        获取router路由的name 对应menu-item内的index
		为了对应 tabs 的跳转点击 做选中
      -->
      <el-menu
        :default-active="$route.name"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 循环数据格式 -->
        <el-submenu :index="`${index}`" v-for="(menu,index) in menuList" :key="index">
          <template slot="title">
            <i :class="menu.icont"></i>
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="item.routeName"
              v-for="item in menu.menuItem"
              :key="item.index"
              @click="handleOpen2(item)"
            >{{item.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "zgz-admin-index-aside",
  components: {},
  data() {
    return {
      // 将所需submenu,menu和tabs所需参数写成数据格式
      menuList: [
        {
          icont: "el-icon-s-tools",
          name: "首页",
          routeName: "Setting"
          // menuItem: [
          //   {
          //     title: "设置",
          //     routeName: "Setting",
          //     name: "设置"
          //   },
          //   {
          //     title: "小程序广告图",
          //     routeName: "WxAd",
          //     name: "小程序广告图"
          //   }
          // ]
        },
        {
          icont: "el-icon-s-order",
          name: "基础",
          menuItem: [
            {
              title: "假期设置",
              routeName: "day",
              name: "假期设置"
            },
            {
              title: "MI资料",
              routeName: "mi",
              name: "MI资料"
            }
          ]
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 调用 注册vuex内注册的editableTabs方法
    ...mapActions({
      handleOpen2: "editableTabs"
    })
  }
};
</script>
<style scoped>
    .zgz-admin-index-aside{
        height: 100%;
        width:100%;
        background-color: rgb(101, 109, 117);
    }
</style>