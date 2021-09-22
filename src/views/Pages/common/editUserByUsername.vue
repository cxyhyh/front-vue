<template>
  <el-container class="all">
    <el-aside width="200px">
      <div class="elm">
        <el-menu
         :default-openeds='["1"]'
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#5683df"
         text-color="white"
        >
         <router-link to="/home"> <el-button size="small">返回 </el-button></router-link>
         <el-menu-item index="1">
              <router-link to="/edit/editUserInfo" class="rou"
                >个人信息</router-link
              >
            </el-menu-item>
             <el-menu-item index="2">
              <router-link to="/edit/editPassword" class="rou"
                >修改密码</router-link
              >
            </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-main>
        <div>
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    name: "",
  data() {
    return {
      isCollapse: true,
    };
  },
  components: {},
  computed:{
    showUsername(){
      return Cookie.get('username')
    },

  },
  mounted() {},
  methods: {
     back(){
        this.$router.go(-1);//返回上一层
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    exit(){
      sessionStorage.clear();
      console.log(sessionStorage.getItem('token'));
      
    },
  },
};
</script>

<style  scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
.all {
  height: 626px;
  width: 1298px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
  background-color:white;
  /* background-image: url("../../../assets/c.jpg"); */
}

.el-header {
  background-color: #5683df;
  line-height: 60px;
}
.el-aside {
  background-color:  #5683df;
  
}
.elm {
  margin-top: 0px;
}
.sp {
  margin-right: 450px;
  font-size: 17px;
  color: gold;
}
.rou {
  text-decoration: none;
  color: white;
}
.edit{
  text-decoration: none;
}
.exit{
  text-decoration: none;
}
</style>