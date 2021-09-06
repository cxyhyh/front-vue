<template>
<div class="el">
  <!-- <i class="el-icon-s-unfold" @click="isC()"></i> -->
 <el-menu
    router
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#5683df"
    text-color="white"
    active-text-color="gold"
    :collapse="isCollapse"
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon" class="icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.label"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon" class="icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</div>
 
</template>

<script>
import VerticalToggle from '../../store/VerticalToggle' 
import Vue from 'vue'
Vue.component(VerticalToggle.name, VerticalToggle)
export default {
  computed: {
    // 获取菜单对象中不包含子级的菜单
    noChildren() {
      return this.asideMenu.filter((item) => !item.children);
    },
    // 获取菜单对象中包含子级的菜单
    hasChildren() {
      return this.asideMenu.filter((item) => item.children);
    },
  },
  data() {
    return {
      isCollapse:false,
      // 配置菜单路由
      asideMenu: [
        // 设置子级菜单路由
        {
          path: '/home/index',
          name: 'index',
          label: '可视化分析',
          icon: 's-home'
          
        },
        {
          path: "/home",
          label: "信息管理",
          icon: "message",
          name:"home",
          children: [
            {
              path: "userInfo",
              name: "userInfo",
              label: "用户信息管理",
              parentName: 'home',
              parentLabel: '信息管理',
            },
            {
              path: "jobInfo",
              name: "jobInfo",
              label: "职位信息管理",
              parentName: 'home',
              parentLabel: '信息管理',
            },
            {
              path: "companyInfo",
              name: "companyInfo",
              label: "企业信息管理",
              parentName: 'home',
              parentLabel: '信息管理',
            },
            {
              path: "skillInfo",
              name: "skillInfo",
              label: "技能信息管理",
              parentName: 'home',
              parentLabel: '信息管理',
            },
          ],
        },
        {
          path: "/home/role",
          label: "角色管理",
          icon: "setting",
          name:"role",
        },
        {
          label: "简历管理",
          path: "/home/jianLiInfo",
          icon: "document",
          name:"jianLiInfo",
        },
        {
          label: "审核管理",
          icon: "help",
          path: "/home/applicationInfo",
          name:"applicationInfo",
        },
      ],
      state: "",
    };
  },
  methods: {
      isC() {
      this.isCollapse = !this.isCollapse;
    },
    // clickMenu方法获取用户点击左侧导航栏的item状态
    clickMenu(item) {
      // 调用store中的tab.js文件定义的selectMenu方法
      this.$store.commit("selectMenu", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.el {
 margin-top: -2px;
}
.el-icon-s-unfold{
  color: yellow;
  margin-left: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: auto;
    min-height: 400px;
  }
.el-menu{
    border: none;
  }
.icon{
    color: gold;
    font-size: 20px;
  }
</style>

