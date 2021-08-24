<template>
  <header>
    <div class="l-content">
      <!-- sezi设置按钮尺寸 -->
      <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
      <!-- 设置面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <!-- 通过判断current是否为null设置面包屑是否显示菜单名称 -->
        <el-breadcrumb-item :to="current.path" v-if="current">
          <!-- 从计算属性的current中获取用户点击菜单的label，然后在面包屑中展示该菜单的label -->
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </header>
</template>

<script>
// 导入vuex状态管理模块
import { mapState } from 'vuex'
export default {
  computed: {
    // 获取store下tab.js文件selectMenu方法中currentMenu对象数据
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
// 设置header为弹性容器
header {
  display: flex;
  // 设置弹性容器中元素水平方向居中
  align-items: center;
  height: 100%;
  // 设置元素两端对齐
  justify-content: space-between;
}
// 设置l-content为弹性容器
.l-content {
  display: flex;
  // 设置弹性容器中元素水平方向居中
  align-items: center;
  // 设置button按钮外右间距
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    // 设置头像宽高
    width: 40px;
    height: 40px;
    // 设置头像为圆形
    border-radius: 50%;
  }
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

