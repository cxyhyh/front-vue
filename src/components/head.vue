<template>
  <header>
    <div class="l-content">
      <el-button plain size="mini" icon="el-icon-menu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-conten">
      <!-- 下拉菜单-->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"><img :src="userImg" class="user"/></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      //以模块的方式引入，而不是字符串
      userImg: require('../assets/404_cloud.png')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  //justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
  justify-content: space-between;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-conten {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 30%;
  }
}
</style>
<!-- 组件嵌套在逐渐里面的样式 不能scoped-->
<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666666;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #ffffff;
    }
  }
}
</style>

