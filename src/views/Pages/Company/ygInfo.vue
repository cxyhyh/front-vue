<template>
  <div>
    <div class="filter-container">
      <el-select
        v-model="users.realName"
        placeholder="请输入真实姓名"
        clearable
        class="filter-item"
        style="width: 150px"
      >
        <el-option
          v-for="rn in realNameOption"
          :key="rn.realName"
          :value="rn.realName"
          :label="rn.realName"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="users.education"
        placeholder="请选择文化程度"
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="ed in educationOption"
          :key="ed.education"
          :value="ed.education"
          :label="ed.education"
        >
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getUserAndSkill()"
      >
        查询
      </el-button>
    </div>
    <div>
      <div style="margin-left: 1%; margin-right: 1%">
        <el-row>
          <el-col
            :span="4"
            v-for="(item, index) in users"
            :key="index"
            :offset="1"
          >
            <div>
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                class="card"
              >
                <div class="zsxm">
                  <span>{{ item.realName }}</span>
                </div>
                <div class="xb">
                  <span>{{ item.sex }}</span>
                </div>
                <div class="ypgw">
                  <span>应聘岗位：{{ item.appliedPosition }}</span>
                </div>
                <div class="byyx">
                  <span>毕业院校：{{ item.college }}</span>
                </div>
                <div class="yysp">
                  <span>英语水平：{{ item.englishSkill }}</span>
                </div>
                <div class="jsjsp">
                  <span>计算机水平：{{ item.computerSkill }}</span>
                </div>
                <div class="jg">
                  <span>籍贯：{{ item.hometown }}</span>
                </div>
                <div class="whcd">
                  <span>文化程度：{{ item.education }}</span>
                </div>
                <div class="yx">
                  <span>邮箱：{{ item.email }}</span>
                </div>
                <div class="lxfs">
                  <span>联系方式：{{ item.mobilePhone }}</span>
                </div>
                <div class="zyjn">
                  <span>主要技能：{{ item.mainSkill }}</span>
                </div>
                <div class="shzt">
                  <span>简历审核状态：{{ item.status }}</span>
                </div>
                <div class="sq">
                  <div class="sfty">
                    <span>是否同意申请：</span>
                  </div>
                  <div class="tym">
                    <el-button
                      type="primary"
                      class="ty"
                      size="mini"
                      @click="tongYi(item)"
                    >
                      同意
                    </el-button>
                    <el-button
                      class="bty"
                      type="danger"
                      size="mini"
                      @click="buTongYi(item)"
                    >
                      不同意
                    </el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[ 8, 16, 32,64]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next, total, jumper "
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getNewFileNameByUsername,
  getUserAndSkill,
  getRealNamePuTong,
  getEducation,
  tongYi,
  buTongYi,
} from "../../../request/api";
export default {
  name: "userInfo",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      total: 0,
      jianlis: [],
      users: [],
      realNameOption: [],
      roleTypeOption: [],
      educationOption: [],
      multipleSelection: [],
    };
  },
  mounted() {
    this.getUserAndSkill();
    this.getRealNamePuTong();
    this.getEducation();
    this.getNewFileNameByUsername();
  },
  methods: {
    tongYi(item) {
      tongYi({
        username: item.username,
      })
        .then((res) => {
          const flag = res.data;
          const code = res.code;
          this.getUserAndSkill();
          if (flag == true) {
            this.$message("审核已通过！");
          }
          if (code == 400) {
            this.$message("该用户还没有申请该职位，请按规定流程先申请该职位！");
          }
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    buTongYi(item) {
      buTongYi({
        username: item.username,
      })
        .then((res) => {
          console.log(item.username);
          const flag = res.data;
          const code = res.code;
          this.getUserAndSkill();
          if (flag == true) {
            this.$message("审核未通过！");
          }
          if (code == 400) {
            this.$message("该用户还没有申请该职位，请按规定流程先申请该职位！");
          }

          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    showInput(row) {
      let data = { ...row };
      this.dialogFormVisible = true;
      this.form = data;
    },
    getUserAndSkill() {
      getUserAndSkill({
        current: this.currentPage,
        size: this.pageSize,
        realName: this.users.realName,
        education: this.users.education,
      })
        .then((res) => {
          this.users = res.data.records;
          this.total = Number(res.data.total);
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getNewFileNameByUsername() {
      getNewFileNameByUsername({
        username: this.users.username,
      })
        .then((res) => {
          this.jianlis = res.data.records;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getRealNamePuTong() {
      getRealNamePuTong({})
        .then((res) => {
          this.realNameOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getEducation() {
      getEducation({})
        .then((res) => {
          this.educationOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    toogleExpand(row) {
      const $table = this.$refs.data;
      this.list.map((item) => {
        if (row.id !== item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserAndSkill(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserAndSkill(this.pagesize, val);
    },
  },
};
</script>
<style scoped>
.tym {
  width: 200px;
  margin-left: 100px;
  margin-top: -25px;
}
.sfty {
  text-align: left;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 5px;
  color: blue;
}
.shzt {
  text-align: left;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 5px;
  color: blue;
}
.lxfs {
  text-align: left;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 5px;
}
.yx {
  text-align: left;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 5px;
}
.whcd {
  text-align: left;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 5px;
}
.jg {
  text-align: left;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 5px;
}
.byyx {
  text-align: left;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
}
.xb {
  text-align: left;
  margin-top: -21px;
  font-size: 15px;
  margin-left: 80px;
  color: gray;
  width: 20px;
}
.zyjn {
  font-size: 15px;
  text-align: left;
  margin-top: 5px;
  margin-left: 20px;
  width: 320px;
  line-height: 20px;
}
.jsjsp {
  margin-top: 5px;
  font-size: 15px;
  margin-left: 20px;
  text-align: left;
  width: 130px;
}
.yysp {
  margin-top: 5px;
  margin-left: 20px;
  font-size: 15px;
  text-align: left;
  width: 140px;
}
.ypgw {
  font-size: 17px;
  color: red;
  margin-top: -25px;
  margin-left: 120px;
  text-align: right;
}
.zsxm {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 18px;
  text-align: left;
  color: rgb(79, 79, 231);
}
.card {
  width: 350px;
  height: 370px;
  margin-left: 140px;
  margin-top: 10px;
}
.etab {
  margin-left: 0px;
  border-radius: 5px;
}
.tip {
  text-align: center;
  color: white;
}
.col {
  font-size: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.item {
  margin: 4px;
}
.el-input {
  width: 300px;
}
.block {
  text-align: center;
}
</style>