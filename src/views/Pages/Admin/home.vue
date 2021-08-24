<template>
  <el-container class="all">
    <el-aside width="200px">
      <div class="elm">
        <!-- <CommonAside> </CommonAside> -->
        <el-menu
        default-active="1-1"
          :default-openeds="[]"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#5683df"
          text-color="white"
        >
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message" style="color: gold"></i>
              <span slot="title">信息管理</span></template
            >
            <el-menu-item index="1-1">
              <router-link to="/home/userInfo" class="rou" exact
                >用户信息管理</router-link
              >
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/home/jobInfo" class="rou"
                >职位信息管理</router-link
              >
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link to="/home/companyInfo" class="rou"
                >企业信息管理</router-link
              >
            </el-menu-item>
            <el-menu-item index="1-4">
              <router-link to="/home/skillInfo" class="rou"
                >技能信息管理</router-link
              >
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-setting" style="color: gold"></i>
              <span slot="title">角色权限</span></template
            >
            <el-menu-item index="2-1">
              <router-link to="/home/role" class="rou"
                >角色权限管理</router-link
              >
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-document" style="color: gold"></i>
              <span slot="title">简历管理</span></template
            >
            <el-menu-item index="3-1">
              <router-link to="/home/jianLiInfo" class="rou"
                >简历信息管理</router-link
              >
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-s-help" style="color: gold"></i>
              <span slot="title">审核管理</span></template
            >
            <el-menu-item index="4-1">
              <router-link to="/home/applicationInfo" class="rou"
                >审核简历管理</router-link
              >
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 15px">
        <div class="mbx">
        </div>
<div class="qt">
   <span class="sp">校园网上招聘后台管理系统</span>
</div>
<div class="tx">
        <el-dropdown>
          <i
            class="el-icon-user-solid"
            style="margin-right: 15px; font-size: 30px; color: white"
          ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ showUsername }}</el-dropdown-item>
            <el-dropdown-item
              ><router-link to="/edit" class="edit"
                >个人信息</router-link
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><router-link to="/" @click.native="exit" class="exit"
                >退出登录</router-link
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>

</div>   
      
      <div>
        <!-- <CommonHeader></CommonHeader> -->
        </div>
      </el-header>

      <el-main>
        <div></div>
        <div>
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Cookie from "js-cookie";
export default {
  name: "",
  data() {
    return {
      isCollapse: true,
    };
  },
  components: {},
  computed: {
    showUsername() {
      return Cookie.get("username");
    },
  },
  mounted() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    exit() {
      sessionStorage.clear();
      console.log(sessionStorage.getItem("token"));
    },
  }
};
</script>

<style scoped>
.tx{
  width: 50px;
  margin-left: 1020px;
  margin-top: -55px;
}
.qt{
  width: 200px;
  margin-left: 450px;
  margin-top: -40px;

}
.mbx{
  width: 350px;
  margin-top: 38px;
  margin-left: -20px;
  font-size: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
.all {
  height: 626px;
  width: 1298px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
  background-color: white;
  /* background-image: url("../../../assets/c.jpg"); */
}

.el-header {
  background-color: #5683df;
  line-height: 60px;
}
.el-aside {
  background-color: #5683df;
}
.elm {
  margin-top: 60px;
}
.sp {
  margin-left: -10px;
  font-size: 17px;
  color: gold;
}
.rou {
  text-decoration: none;
  color: gold;
}
.edit {
  text-decoration: none;
}
.exit {
  text-decoration: none;
}
</style>