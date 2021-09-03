<template>
<div class="el">
  <i class="el-icon-s-unfold" @click="isC()"></i>
 <el-menu
    router
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#5683df"
    text-color="white"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    active-text-color="gold"
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.label"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
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
          path:"/home",
          label: "信息管理",
          icon: "message",
          children: [
            {
              path: "/home/userInfo",
              name: "page1",
              label: "用户信息管理",
            },
            {
              path: "/home/jobInfo",
              name: "page1",
              label: "职位信息管理",
            },
            {
              path: "/home/companyInfo",
              name: "page1",
              label: "企业信息管理",
            },
            {
              path: "/home/skillInfo",
              name: "page2",
              label: "技能信息管理",
            },
          ],
        },
        {
           path:"/home",
          label: "角色权限",
          icon: "setting",
          children: [
            {
              path: "/home/role",
              name: "page1",
              label: "角色权限管理",
            },
          ],
        },
        {
           path:"/home",
          label: "简历管理",
          icon: "document",
          children: [
            {
              path: "/home/jianLiInfo",
              name: "page1",
              label: "简历信息管理",
            },
          ],
        },
        {
           path:"/home",
          label: "审核管理",
          icon: "help",
          children: [
            {
              path: "/home/applicationInfo",
              name: "page1",
              label: "审核简历管理",
            },
          ],
        },
      ],
      commit: [],
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
.el {
 margin-top: -26px;
}
.el-icon-s-unfold{
  color: yellow;
  margin-left: 175px;
}
</style>

