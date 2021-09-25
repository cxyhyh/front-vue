<template>
  <el-container>
    <el-header>
      <div>
        <el-menu
          class="el-menu-demo el-menu-my"
          :default-active="activeIndex"
          mode="horizontal"
          background-color="#5683df"
          text-color="gold"
          active-text-color="#ffd04b"
        >
          <!-- 自定义logo组件 -->
          <el-menu-item index="1">
            <router-link to="/userIndex/logo" class="rou">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/userIndex/zpInfo" class="rou">找职位</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/userIndex/qyInfo" class="rou"
              >企业信息</router-link
            >
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/userIndex/zpLiuChen" class="rou"
              >招聘流程
            </router-link></el-menu-item
          >
          <el-menu-item index="5"
            ><a href="https://www.nowcoder.com/" target="_blank" class="rou"
              >面试题库</a
            ></el-menu-item
          >
          <el-menu-item index="6"
            ><a target="_blank" class="rou">消息</a></el-menu-item
          >
          <el-menu-item index="7">
            <el-dropdown>
              <div>
                <el-avatar :src="bas"></el-avatar>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{ showUsername }}</el-dropdown-item>
                <el-dropdown-item
                  ><router-link to="/edit" class="edit"
                    >个人信息</router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item
                  ><span @click="exportUserToWord()"
                    >简历生成</span
                  ></el-dropdown-item
                >
                <el-dropdown-item
                  ><span @click="kkFile()">简历预览</span></el-dropdown-item
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
      <!-- <img src="../../assets/logo.png" /> -->
      <div>
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Cookie from "js-cookie";
import {
  selectPhoto,
  exportUserToWord,
  selectByUsername,
} from "../../../request/api";
export default {
  name: "userIndex",
  components: {},
  data() {
    return {
      activeIndex: "1",
      bas: "",
      realName: "",
    };
  },
  mounted() {
    this.selectPhoto();
    this.selectByUsername();
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
    kkFile() {
      const name =  Cookie.get("username");
      //const fileName = this.realName + "简历.doc";
      var originUrl = 'http://localhost:8080/user/exportUserToWord?username=' + name; //要预览文件的访问地址（可以是下载地址）
      //var previewUrl = originUrl + '&fullfilename=' + fileName; //要预览文件的名字（可选择使用，不是必填项）
      // previewUrl.replaceAll("+","%2B"); 
      // originUrl.replaceAll("+","%2B")
      window.open(
        'http://localhost:8012/onlinePreview?url=' +
          encodeURIComponent(originUrl)
      ); //地址记得转码
    },
    selectPhoto() {
      selectPhoto({
        username: Cookie.get("username"),
      })
        .then((res) => {
          console.log(res.message);
          this.bas = res.message;
          console.log(this.bas);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    selectByUsername() {
      selectByUsername({
        username: Cookie.get("username"),
      })
        .then((res) => {
          this.realName = res.data.realName;
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    exportUserToWord() {
      exportUserToWord({
        username: Cookie.get("username"),
      })
        .then((res) => {
          console.log(res);
          const blob = new Blob([res]);
          const fileName = this.realName + "简历.doc";
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.el-menu-my.el-menu--horizontal > .el-menu-item {
  padding-left: 0;
  padding-right: 0;
}
</style>
<style scoped>
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
   height: 975px;
  width: 1928px;
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
  margin-left: 1300px;
  font-size: 30px;
  padding-left: 0;
  padding-right: 0;
}
.rou {
  font-size: 16px;
  text-decoration: none;
  display: inline-block;
  padding: 0 20px;
}
.edit {
  text-decoration: none;
}
.exit {
  text-decoration: none;
}
</style>