<template>
  <el-container class="all">
    <el-aside style="width:200px">
      <div class="elm">
        <CommonAside> </CommonAside>
      </div>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 15px">
        <div>
          <CommonHeader></CommonHeader>
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
import CommonAside from '../../../components/Breadcrumb/CommonAside.vue' 
import CommonHeader from '../../../components/Breadcrumb/CommonHeader.vue' 
import Cookie from "js-cookie";
import {selectPhoto} from '../../../request/api'
export default {
  name: "",
  data() {
    return {
      isCollapse: true,
    
    };
  },
  components: {
    CommonAside,CommonHeader
  },
  computed: {
    showUsername() {
      return Cookie.get("username");
    },
    
  },
  mounted() {
    //  this.selectPhoto();
  },
  methods: {
    selectPhoto() {
      selectPhoto({
        username: Cookie.get("username")
      })
        .then((res) => {
          console.log(res.message);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // exit() {
    //   sessionStorage.clear();
    //   console.log(sessionStorage.getItem("token"));
    // },
  },
};
</script>

<style scoped>
.sy {
  color: white;
}
.tx {
  width: 50px;
  margin-left: 1020px;
  margin-top: -50px;
}
.qt {
  width: 200px;
  margin-left: 450px;
  margin-top: -40px;
}
.mbx {
  width: 350px;
  margin-top: 38px;
  margin-left: -20px;
  font-size: 20px;
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