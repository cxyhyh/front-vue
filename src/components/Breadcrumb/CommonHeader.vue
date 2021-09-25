<template>
<div>
    <div class="l-content">
      <!-- 设置面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }"
          >首页</el-breadcrumb-item
        >
        <!-- 通过判断current是否为null设置面包屑是否显示菜单名称 -->
        <el-breadcrumb-item v-if="current.parentName">
          <!-- 从计算属性的current中获取用户点击菜单的label，然后在面包屑中展示该菜单的label -->
          {{ current.parentLabel }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: current.name}" v-if="current">
          <!-- 从计算属性的current中获取用户点击菜单的label，然后在面包屑中展示该菜单的label -->
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
        <div class="qt">
          <span class="sp"><router-link class="tt" to="/daping">校园网上招聘后台管理系统</router-link></span>
        </div>
        <div class="tx">
          <el-dropdown>
            <div>
              <el-avatar :src = "bas"></el-avatar>
            </div>
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
  </div>
</template>

<script>
// 导入vuex状态管理模块
import { mapState } from "vuex";
import Cookie from "js-cookie";
import {selectPhoto} from '../../request/api'
export default {
  computed: {
    // 获取store下tab.js文件selectMenu方法中currentMenu对象数据
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
     showUsername() {
      return Cookie.get("username");
    },
  },
  mounted(){
    this.selectPhoto();
  },
  data() {
    return {
      isCollapse: false,
      bas:""  
    };
  },
 
  methods: {
    isC() {
      this.isCollapse = !this.isCollapse;
      this.$root.Bus.$emit("collapsed-side", this.isCollapse);
    },
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
<style lang="scss" scoped>
.tt{
   text-decoration: none;
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
.sp {
  margin-left: -10px;
   text-decoration: none;
  font-size: 25px;
  color: gold;
}
.qt {
  width: 400px;
  margin-left: 600px;
  margin-top: -60px;

}
.sy {
  color: white;
}
.tx {
  width: 50px;
  margin-left: 1580px;
  margin-top: -55px;
}
.l-content {
  display: flex;
  // 设置弹性容器中元素水平方向居中
  align-items: center;
  width: 420px;
  height: 40px;
  margin-left: -20px;
  margin-top: 25px;
}
.el-breadcrumb {
 font-size: 17px;
}

</style>


