<template>
  <el-container>
    <el-main>
      <div class="bt">
        <router-link to="/userIndex/zpInfo">
          <el-button class="bto" type="primary" size="mini">返回</el-button>
        </router-link>
      </div>
      <div style="margin-left: 1%; margin-right: 1%">
        <el-row>
          <el-col
            :span="1"
            v-for="(item, index) in job"
            :key="index"
            :offset="1"
          >
            <div>
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                class="card"
              >
                <div class="fbsj">
                  <span>{{ item.createTime }}发布</span>
                </div>
                <div class="gsmc">
                  <span>{{ item.companyName }}</span>
                </div>
                <div class="zw">
                  <span>{{ item.jobName }}</span>
                </div>
                <div class="xs">
                  <span>{{ item.salary }}</span>
                </div>
                <div class="xl">
                  <span>学历：{{ item.educationRequirement }}</span>
                  <el-divider direction="vertical"></el-divider>
                </div>
                <div class="jy">
                  <span>经验：{{ item.workTimeRequirement }}</span>
                  <el-divider direction="vertical"></el-divider>
                </div>
                <div class="zprs">
                  <span>招聘人数：{{ item.recruitNum }}人</span>
                </div>
                <div class="zpxz">
                  <div class="fgx">
                    <el-divider></el-divider>
                  </div>

                  <span>
                    投递须知：该职位由企业通过授权拉勾网发布在百度百聘，百度无法保证该职位真实性和有效性，建议您谨慎投递。
                  </span>
                </div>
                <div class="but">
                  <el-button
                    type="primary"
                    round
                    icon="el-icon-s-promotion"
                    @click="applyTo()"
                    >申请职位</el-button
                  >
                </div>
                <div class="but1">
                  <el-upload
                    action="http://localhost:8080/file/upload"
                    multiple
                    :on-success="suc"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :before-remove="beforeRemove"
                    :show-file-list="true"
                  >
                    <el-button type="primary" icon="el-icon-upload"
                      >上传简历</el-button
                    >
                  </el-upload>
                </div>
                <div></div>
                <div class="but2">
                  <el-button
                    type="primary"
                    icon="el-icon-download"
                    @click="download()"
                    >下载简历</el-button
                  >
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

      <div style="margin-left: 1%; margin-right: 1%">
        <el-row>
          <el-col
            :span="1"
            v-for="(item, index) in job"
            :key="index"
            :offset="1"
          >
            <div>
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                class="card1"
              >
                <div class="zwms">
                  <span>职位描述</span>
                </div>
                <div class="zwmc">
                  <span>职位名称：{{ item.jobName }}</span>
                </div>
                <div class="zwlx">
                  <span>职位类型：{{ item.jobType }}</span>
                </div>
                <div class="gzdd">
                  <span>工作地点：{{ item.workPosition }}</span>
                </div>
                <div class="jtyq">
                  <span>具体要求：{{ item.specificRequirement }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-left: 1%; margin-right: 1%">
        <el-row>
          <el-col
            :span="1"
            v-for="(item, index) in job"
            :key="index"
            :offset="1"
          >
            <div>
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                class="card2"
              >
                <img src="../../../assets/ewm.png" />
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-left: 1%; margin-right: 1%">
        <el-row>
          <el-col
            :span="1"
            v-for="(item, index) in job"
            :key="index"
            :offset="1"
          >
            <div>
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                class="card3"
              >
                <div class="gsjj">
                  <span>公司简介</span>
                </div>
                <div class="gsmca">
                  <span>{{ item.companyName }}</span>
                </div>
                <div class="clsj">
                  <span>成立时间：{{ item.foundTime }}</span>
                </div>
                <div class="dz">
                  <span>地址：{{ item.address }}</span>
                </div>
                <div class="lxfs">
                  <span>联系方式：{{ item.telephone }}</span>
                </div>
                <div class="wz">
                  <span>网址：{{ item.http }}</span>
                </div>
                <div class="yx">
                  <span>邮箱：{{ item.email }}</span>
                </div>
                <div class="yzbm">
                  <span>邮政编码：{{ item.postalCode }}</span>
                </div>
                <div class="jj">
                  <span>公司简介：{{ item.introduce }}</span>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-left: 1%; margin-right: 1%">
        <el-row>
          <el-col
            :span="1"
            v-for="(item, index) in job"
            :key="index"
            :offset="1"
          >
            <div>
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                class="card4"
              >
                <img src="../../../assets/logo2.jpg" width="670px" />
                <!-- <img src="../../../assets/topic.png"> -->
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-left: 1%; margin-right: 1%">
        <el-row>
          <el-col
            :span="1"
            v-for="(item, index) in job"
            :key="index"
            :offset="1"
          >
            <div>
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                class="card5"
              >
                <img src="../../../assets/topic.png" width="660px" />
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {
  jobAndCompanyDetailByjobName,
  getUsernameAndApplicationPosition,
  downloadFile,
  updateUsernameById,
  apply,
} from "../../../request/api";
import Cookie from "js-cookie";
export default {
  name: "",
  data() {
    return {
      job: [],
      name: "",
      list: [],
    };
  },

  mounted() {
    let jobName1 = this.$route.query.jobName;

    jobAndCompanyDetailByjobName({
      jobName: jobName1,
    })
      .then((res) => {
        this.job = res.data;
        console.log(this.job[0].jobId);
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });

    this.getUsernameAndApplicationPosition();
  },

  computed: {
    showUsername() {
      console.log(Cookie.get("username"));
      return Cookie.get("username");
    },
  },
  methods: {
    updateUsernameById() {
      updateUsernameById({
        fileName: this.name,
        username: Cookie.get("username"),
        applicationPosition: this.$route.query.jobName,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    suc(response, file) {
      this.name = file.name;
      this.updateUsernameById();
      this.$message(this.name + "上传成功");
      console.log(this.name);
    },

    download() {
      if (this.name == "") {
        this.$message("请先上传简历才能下载哦 ！！");
      } else {
        this.downloadFile();
      }
    },

    downloadFile() {
      downloadFile({
        fileName: this.name,
      })
        .then((res) => {
          // this.$message("文件下载成功");
          console.log(res);
          const blob = new Blob([res]);
          const fileName = this.name;
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
    handleExceed() {
      this.$message.warning(
        `一次只能上传一个文件，若要重新上传，请先移除上次记录`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getUsernameAndApplicationPosition() {
      var that = this;
      getUsernameAndApplicationPosition({
        username: Cookie.get("username"),
        applicationPosition: this.$route.query.jobName,
      })
        .then((res) => {
          that.list = res.data;
          console.log(that.list);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    applyTo() {
      if (this.list.length == 0) {
        if (this.name == "") {
          this.$message("请先上传您的简历！");
        } else {
          this.apply();
        }
      } else if (!this.list.length == 0) {
        this.$message("您有申请过这份职位的记录，无需重复申请！！");
      }
    },
    apply() {
      apply({
        username: Cookie.get("username"),
        applicationPosition: this.$route.query.jobName,
      })
        .then((res) => {
          const code = res.data.code;
          console.log(code);
          if (code == 200) {
            this.$message("申请成功,待审核中。。。。！");
          } else if (code === 400) {
            this.$message("您已申请过了！！！");
          }

          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.bt {
  line-height: 10px;
  margin-top: -20px;
  width: 70px;
  margin-left: -20px;
}

.card5 {
  margin-top: -600px;
  width: 665px;
  height: 600px;
  margin-left: 1035px;
}
.card4 {
  margin-top: -1100px;
  width: 665px;
  height: 500px;
  margin-left: 1035px;
}
.jj {
  font-size: 15px;
  margin-left: 25px;
  margin-top: 10px;
  text-align: left;
  line-height: 30px;
  width: 950px;
}
.yzbm {
  text-align: left;
  font-size: 15px;
  margin-left: 25px;
  margin-top: 10px;
  line-height: 20px;
}
.yx {
  text-align: left;
  font-size: 15px;
  margin-left: 25px;
  margin-top: 10px;
  line-height: 20px;
}
.wz {
  text-align: left;
  font-size: 15px;
  margin-left: 25px;
  margin-top: 10px;
  line-height: 20px;
}
.lxfs {
  text-align: left;
  font-size: 15px;
  margin-left: 25px;
  margin-top: 10px;
  line-height: 20px;
}
.dz {
  text-align: left;
  font-size: 15px;
  margin-left: 25px;
  margin-top: 10px;
  line-height: 20px;
}
.clsj {
  text-align: left;
  font-size: 15px;
  margin-left: 25px;
  margin-top: 30px;
  line-height: 20px;
}
.gsmca {
  text-align: left;
  font-size: 17px;
  margin-left: 120px;
  margin-top: -18px;
  line-height: 20px;
}
.gsjj {
  text-align: left;
  width: 80px;
  font-size: 18px;
  font: bolder;
  margin-top: 35px;
  margin-left: 25px;
  line-height: 20px;
}
.card3 {
  margin-top: 20px;
  width: 1010px;
  height: 1000px;
  margin-left: -35px;
}
.card2 {
  margin-top: -300px;
  width: 665px;
  height: 200px;
  margin-left: 1035px;
}
.jtyq {
  text-align: left;
  font-size: 15px;
  margin-top: 15px;
  margin-left: 25px;
  line-height: 20px;
}
.gzdd {
  text-align: left;
  font-size: 15px;
  margin-top: 15px;
  margin-left: 25px;
  line-height: 20px;
}
.zwmc {
  font-size: 15px;
  text-align: left;
  margin-top: 30px;
  margin-left: 25px;
  line-height: 20px;
}
.zwlx {
  font-size: 15px;
  text-align: left;
  margin-top: 20px;
  margin-left: 25px;
  line-height: 20px;
}
.zwms {
  font-size: 18px;
  text-align: left;
  font: bolder;
  margin-top: 40px;
  margin-left: 25px;
  line-height: 20px;
}
.card1 {
  margin-top: 20px;
  width: 1010px;
  height: 300px;
  margin-left: -35px;
}
.but2 {
  width: 10px;
  height: 40px;
  margin-top: -40px;
  line-height: 20px;
  margin-left: 1400px;
}
.but1 {
  width: 100px;
  height: 40px;
  margin-top: 20px;
  line-height: 20px;
  margin-left: 1540px;
}
.but {
  width: 130px;
  height: 40px;
  margin-top: -190px;
  line-height: 40px;
  margin-left: 1530px;
}
.zpxz {
  text-align: left;
  margin-left: 24px;
  margin-top: 35px;

  font-size: 15px;
  color: grey;
  line-height: 20px;
}
.zprs {
  width: 120px;
  text-align: left;
  margin-top: -22px;
  margin-left: 270px;
  color: rgb(102, 101, 101);
  font-size: 15px;
  line-height: 20px;
}
.jy {
  width: 130px;
  margin-top: -19px;
  margin-left: 145px;
  text-align: left;
  color: rgb(102, 101, 101);
  font-size: 15px;
  line-height: 20px;
}
.xl {
  width: 130px;
  text-align: left;
  color: rgb(102, 101, 101);
  font-size: 15px;
  line-height: 20px;
  margin-left: 25px;
  margin-top: 25px;
}
.xs {
  text-align: left;
  color: #ff3c00;
  font-size: 17px;
  margin-left: 25px;

  margin-top: 20px;
  line-height: 20px;
}
.zw {
  text-align: left;
  color: #ff3c00;
  font-size: 20px;
  margin-left: 500px;
  line-height: 20px;
  margin-top: -20px;
}
.gsmc {
  text-align: left;

  font-size: 23px;
  margin-left: 25px;
  line-height: 20px;
  margin-top: 18px;
}
.fbsj {
  font-size: 15px;
  text-align: left;
  color: gray;
  margin-top: 25px;
  margin-left: 30px;
  line-height: 20px;
}
.card {
  width: 1740px;
  height: 270px;
  margin-left: -35px;
}
.el-container {
  height: 975px;
  width: 1928px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>