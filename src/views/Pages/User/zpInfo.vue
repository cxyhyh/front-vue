<template>
  <div>
    <div class="filter-container">
      <el-input
        v-model="jobs.jobName"
        placeholder="请输入职位名称"
        style="width: 150px"
        class="filter-item"
      />
      <el-select
        v-model="jobs.jobType"
        placeholder="请选择职位类型"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="jb in jobTypeOption"
          :key="jb.jobType"
          :value="jb.jobType"
          :label="jb.jobType"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="jobs.educationRequirement"
        placeholder="请选择学历要求"
        clearable
        class="filter-item"
        style="width: 150px"
      >
        <el-option
          v-for="jb in jobedOption"
          :key="jb.educationRequirement"
          :value="jb.educationRequirement"
          :label="jb.educationRequirement"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="jobs.workPosition"
        placeholder="请选择工作地点"
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="jb in jobworkOption"
          :key="jb.workPosition"
          :value="jb.workPosition"
          :label="jb.workPosition"
        >
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="pageJob()"
      >
        查询
      </el-button>
    </div>
    <div style="margin-left: 10%; margin-right: 1%">
      <el-row>
        <el-col
          :span="4"
          v-for="(item, index) in jobs"
          :key="index"
          :offset="1"
        >
          <div>
            <el-card
              :body-style="{ padding: '0px' }"
              shadow="hover"
              class="card"
            >
              <div class="tip">
                <span>{{ item.jobName }}</span>
              </div>
              <div class="fbsj">
                <span>{{ item.createTime }}发布</span>
              </div>
              <div class="xs">
                <span>{{ item.salary }}</span>
              </div>
              <div class="gzdd">
                <span>{{ item.workPosition }}</span
                >&nbsp;|
              </div>
              <div class="jy">
                <span>{{ item.workTimeRequirement }}经验</span>
              </div>
              <div class="zprs">
                <span>招{{ item.recruitNum }}人</span>&nbsp;|
              </div>
              <div class="jysp">
                <span>{{ item.educationRequirement }}</span>
              </div>
              <div class="but">
                  <el-button
                  size="mini"
                    type="primary"
                    @click="jobAndCompanyDetailByjobName(item)"
                  >详情</el-button>
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
        :page-sizes="[16, 32, 64, 128]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, total, jumper "
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  pageJob,
  getJobType,
  getWorkPosition,
  getEducationRequirement,
} from "../../../request/api";
export default {
  name: "zpInfo",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 16,
      total: 0,
      jobs: [],
      jobTypeOption: [],
      jobedOption: [],
      jobworkOption: [],
      multipleSelection: [],
      classStatus: false,
      expands: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xzzw: false,
      form: {
        jobName: "",
        jobType: "",
        salary: "",
        educationRequirement: "",
        sexRequirement: "",
        ageRequirement: "",
        workTimeRequirement: "",
        workPosition: "",
        recruitNum: "",
        specificRequirement: "",
        createTime: "",
        jobId: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.pageJob();
    this.getJobType();
    this.getWorkPosition();
    this.getEducationRequirement();
  },
  methods: {
    submitForm(form1) {
      // this.formatTime(this.ruleForm.birth)
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.addJob();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getJobType() {
      getJobType({})
        .then((res) => {
          this.jobTypeOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getWorkPosition() {
      getWorkPosition({})
        .then((res) => {
          this.jobworkOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getEducationRequirement() {
      getEducationRequirement({})
        .then((res) => {
          this.jobedOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    jobAndCompanyDetailByjobName(item) {
      this.$router.push({ name: "detail" , query: {jobName: item.jobName}});
      // jobAndCompanyDetailByjobName({ 
      //   jobName: item.jobName,
      // })
      //   .then((res) => {
      //     this.job = res.data;
      //     console.log(this.job[0].jobId);
      //     console.log(res.data);
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //   });
    },
    pageJob() {
      pageJob({
        current: this.currentPage,
        size: this.pageSize,
        jobName: this.jobs.jobName,
        jobType: this.jobs.jobType,
        workPosition: this.jobs.workPosition,
        educationRequirement: this.jobs.educationRequirement,
      })
        .then((res) => {
          this.jobs = res.data.records;
          this.total = Number(res.data.total);
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
      this.pageJob(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageJob(this.pagesize, val);
    },
    
  },
};
</script>
<style scoped>
.but {
  margin-left: -150px;
  margin-top: 10px;
}
.zprs {
  text-align: left;
  font-size: 15px;
  width: 70px;
  margin-left: 90px;
}
.jysp {
  text-align: left;
  font-size: 15px;
  width: 70px;
  margin-left: 150px;
  margin-top: -21px;
}
.jy {
  width: 100px;
  text-align: left;
  font-size: 15px;
  margin-left: 138px;
  margin-top: -19px;
}
.gzdd {
  width: 40px;
  font-size: 15px;
  margin-left: 90px;
  margin-top: -20px;
}
.xs {
  font-size: 17px;
  text-align: left;
  color: red;
  margin-top: 13px;
  margin-left: 20px;
}
.fbsj {
  font-size: 10px;
  color: grey;
  text-align: right;
  margin-top: -15px;
  margin-right: 5px;
}
.tip {
  margin-top: 10px;
  margin-left: 5px;
  font-size: 17px;
  text-align: left;
  color: rgb(79, 79, 231);
}
.card {
  width: 250px;
  height: 150px;
  margin-left: 40px;
}
.filter-container {
  line-height: 60px;
}
.etab {
  margin-left: 0px;
  border-radius: 5px;
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

.block {
  text-align: center;
}
</style>