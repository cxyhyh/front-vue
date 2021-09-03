<template>
  <el-container>
    <el-header>
      <div>
        <el-menu
          class="el-menu-demo el-menu-my"
          default-active="1"
          mode="horizontal"
          background-color="#5683df"
          text-color="gold"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <router-link to="/companyIndex/logo1" class="rou">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/companyIndex/ygInfo" class="rou"
              >找员工</router-link
            >
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/companyIndex/zpLiuC" class="rou"
              >招聘流程
            </router-link></el-menu-item
          >
          <el-menu-item index="5">
            <el-dropdown>
             <div>
              <el-avatar :src = "bas"></el-avatar>
            </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{ showUsername }}</el-dropdown-item>
                <el-dropdown-item>
                  <el-badge :value=a class="item">
                    消息
</el-badge>
                  </el-dropdown-item>
                 <el-dropdown-item
              ><router-link to="/edit" class="edit">个人信息</router-link></el-dropdown-item
            >
                <el-dropdown-item
                  ><router-link to="/" @click.native="exit" class="exit"
                    >退出登录</router-link
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <div>
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Cookie from "js-cookie";
import {selectPhoto} from '../../../request/api'
export default {
  name: "userIndex",
  components: {},
  data() {
    return {
      a:12,
      bas:""
    };
  },
  mounted() {
    this.selectPhoto();
  },
  computed: {
    showUsername() {
      return Cookie.get("username");
    },
  },
  methods: {
    exit() {
      sessionStorage.clear();
      console.log(sessionStorage.getItem("token"));
    },
      selectPhoto() {
      selectPhoto({
        username: Cookie.get("username")
      })
        .then((res) => {
          console.log(res.message);
          this.bas = res.message;
          console.log(this.bas)
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.el-menu-my.el-menu--horizontal > .el-menu-item {
  padding-left: 0;
  padding-right: 0;
}
.sp {
  font-size: 20px;
}
.el-header {
  background-color: #5683df;
  color: #333;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* background-image: url("../../assets/a.jpg"); */
}
.el-container {
  height: 626px;
  width: 1298px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
}
.topic {
  color: gold;
  margin-left: 200px;
  font: bolder;
  font-size: 28px;
}
.el-menu-demo {
  margin-left: 840px;
  font-size: 30px;
  padding-left: 0;
  padding-right: 0;
}
.rou {
  font-size: 16px;
  text-decoration: none;
  display: inline-block;
  padding: 0 25px;
}
.edit{
  text-decoration: none;
}
.exit{
  text-decoration: none;
}
</style>