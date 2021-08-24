<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#33adf0" text-color="#fff" active-text-color="#ffd04b">
    <!-- 配置没有二级菜单的菜单路由内容 
        - 通过v-for循环遍历 noChildren 数据对象，分别取出:
          - 菜单路由item.path
          - 菜单icon
          - 菜单title名称
    -->
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 配置有二级菜单的菜单路由内容
          - 通过v-for循环遍历 hasChildren 数据对象，分别取出：
            - 一级菜单的index
            - 一级菜单icon
            - 一级菜单名字
            通过遍历当前一级菜单的二级菜单数据对象，分别取出：
              - 二级菜单index
              - 二级菜单名字label
              - 二级菜单icon
     -->
    <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    // 获取菜单对象中不包含子级的菜单
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    // 获取菜单对象中包含子级的菜单
    hasChildren() {
      return this.asideMenu.filter(item => item.children)
    }
  },
  data() {
    return {
      // 配置菜单路由
      asideMenu: [
        // 设置子级菜单路由
        {
          label: '信息管理',
          icon: 'user',
          children: [
            {
              path: '/home/userInfo',
              name: 'page1',
              label: '用户信息管理',
              icon: 'setting'
            },
             {
              path: 'home/jobInfo',
              name: 'page1',
              label: '职位信息管理',
              icon: 'setting'
            },
             {
              path: '/home/companyInfo',
              name: 'page1',
              label: '企业信息管理',
              icon: 'setting'
            },
            {
              path: '/home/skillInfo',
              name: 'page2',
              label: '技能信息管理',
              icon: 'setting'
            }
          ]
        },
         {
          label: '角色权限',
          icon: 'user',
          children: [
            {
              path: '/home/role',
              name: 'page1',
              label: '角色权限管理',
              icon: 'setting'
            },
          ]
         },
         {
          label: '简历管理',
          icon: 'user',
          children: [
            {
              path: '/home/jianLiInfo',
              name: 'page1',
              label: '简历信息管理',
              icon: 'setting'
            },
          ]
         },
         {
          label: '审核管理',
          icon: 'user',
          children: [
            {
              path: '/home/applicationInfo',
              name: 'page1',
              label: '审核简历管理',
              icon: 'setting'
            },
          ]
         }
      ],
      commit:[],
      state:""
    }
  },
  methods: {
    // clickMenu方法获取用户点击左侧导航栏的item状态
    clickMenu(item) {
      // 调用store中的tab.js文件定义的selectMenu方法
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
}
</style>

