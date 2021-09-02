<template>
<div>
    <div class="l-content">
      <!-- sezi设置按钮尺寸 -->
      <!-- <el-button
        type="primary"
        icon="el-icon-menu"
        size="mini"
        @click="isC"
      ></el-button> -->
      <!-- 设置面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/index' }"
          >首页</el-breadcrumb-item
        >
        <!-- 通过判断current是否为null设置面包屑是否显示菜单名称 -->
        <el-breadcrumb-item :to="current.path" v-if="current">
          <!-- 从计算属性的current中获取用户点击菜单的label，然后在面包屑中展示该菜单的label -->
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
        <div class="qt">
          <span class="sp">校园网上招聘后台管理系统</span>
        </div>
        <div class="tx">
          <el-dropdown>
            <div>
              <el-avatar src="http://bpic.588ku.com/element_origin_min_pic/00/85/67/3156e965da25551.jpg"></el-avatar>
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
  data() {
    return {
      isCollapse: false
    };
  },
 
  methods: {
    isC() {
      this.isCollapse = !this.isCollapse;
      this.$root.Bus.$emit("collapsed-side", this.isCollapse);
    },
     handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  font-size: 17px;
  color: gold;
}
.qt {
  width: 200px;
  margin-left: 450px;
  margin-top: -60px;
}
.sy {
  color: white;
}
.tx {
  width: 50px;
  margin-left: 1020px;
  margin-top: -50px;
}
.l-content {
  display: flex;
  // 设置弹性容器中元素水平方向居中
  align-items: center;
  width: 420px;
  height: 30px;
  margin-left: -20px;
  margin-top: 28px;
  
}
</style>
<style lang="scss">
.el-breadcrumb__item {
  // 设置面包屑首页样式
  .el-breadcrumb__inner {
    color: #fff;
  }
  // 设置面包屑首页后面菜单样式
  &:last-child {
    .el-breadcrumb__inner {
      color: #f4f4f4;
    }
  }
}
</style>

