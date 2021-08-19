<template>
  <div>
    <div>
      <h1 class="tip">职位基本信息(仅管理员可查看)</h1>
    </div>
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
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="xzzw = true"
      >
        新增
      </el-button>
    </div>
    <el-dialog title="新增职位" :visible.sync="xzzw" width="520px">
      <el-form
        :model="form1"
        ref="form1"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="职位名称"
          prop="jobName"
          :rules="[{ required: true, message: '职位名称不能为空' }]"
        >
          <el-input v-model="form1.jobName"></el-input>
        </el-form-item>
        <el-form-item
          label="职位类型"
          prop="jobType"
          :rules="[{ required: true, message: '职位类型不能为空' }]"
        >
          <el-input v-model="form1.jobType"></el-input>
        </el-form-item>
         <el-form-item
          label="薪水"
          prop="salary"
          :rules="[{ required: true, message: '薪水不能为空' }]"
        >
          <el-input v-model="form1.salary"></el-input>
        </el-form-item>
        <el-form-item
          label="学历要求"
          prop="educationRequirement"
          :rules="[{ required: true, message: '学历要求不能为空' }]"
        >
          <el-input v-model="form1.educationRequirement"></el-input>
        </el-form-item>
        <el-form-item
          label="性别要求"
          prop="sexRequirement"
          :rules="[{ required: true, message: '性别要求不能为空' }]"
        >
          <el-input v-model="form1.sexRequirement"></el-input>
        </el-form-item>
        <el-form-item
          label="年龄要求"
          prop="ageRequirement"
          :rules="[{ required: true, message: '年龄要求不能为空' }]"
        >
          <el-input v-model="form1.ageRequirement"></el-input>
        </el-form-item>
        <el-form-item
          label="工作年限要求"
          prop="workTimeRequirement"
          :rules="[{ required: true, message: '工作年限要求不能为空' }]"
        >
          <el-input v-model="form1.workTimeRequirement"></el-input>
        </el-form-item>
        <el-form-item
          label="工作地点"
          prop="workPosition"
          :rules="[{ required: true, message: '工作地点不能为空' }]"
        >
          <el-input v-model="form1.workPosition"></el-input>
        </el-form-item>
        <el-form-item label="招聘人数" prop="recruitNum">
          <el-input v-model="form1.recruitNum"></el-input>
        </el-form-item>
        <el-form-item
          label="具体要求"
          prop="specificRequirement"
          :rules="[{ required: true, message: '请输入具体要求' }]"
        >
          <el-input v-model="form1.specificRequirement"></el-input>
        </el-form-item>
        <el-form-item
          label="发布时间"
          required
          :rules="[{ required: true, message: '请选择发布时间' }]"
        >
          <el-col :span="11">
            <el-form-item prop="birth">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form1.createTime"
                style="width: 100%"
                value-format="yyyy-MM-dd 00:00:00"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="concel('form1')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form1')">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <el-table
        class="etab"
        :data="jobs"
        ref="multipleTable"
        tooltip-effect="dark"
        border
        :cell-style="{
          color: '#666',
          fontFamily: 'Arial',
          fontSize: '14px',
          textAlign: 'center',
        }"
        :header-cell-style="{
          fontFamily: 'Helvetica',
          fontSize: '17px',
          textAlign: 'center',
        }"
      >
        <el-table-column prop="jobName" label="职位名称" min-width="70">
          <template slot-scope="props">
            <span>{{ props.row.jobName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="jobType" label="职位类型" min-width="60">
          <template slot-scope="props">
            <span>{{ props.row.jobType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="salary" label="薪水" min-width="50">
          <template slot-scope="props">
            <span>{{ props.row.salary }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recruitNum" label="招聘人数" min-width="60">
          <template slot-scope="props">
            <span>{{ props.row.recruitNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="specificRequirement"
          label="具体要求"
          min-width="220"
        >
          <template slot-scope="props">
            <span>{{ props.row.specificRequirement }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" min-width="80">
          <template slot-scope="props">
            <span>{{ props.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="60">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top-start"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showInput(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="Delete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="职位名称">
                <span>{{ props.row.jobName }}</span>
              </el-form-item>
              <el-form-item label="职位类型">
                <span>{{ props.row.jobType }}</span>
              </el-form-item>
               <el-form-item label="薪水">
                <span>{{ props.row.salary }}</span>
              </el-form-item>
              <el-form-item label="学历要求">
                <span>{{ props.row.educationRequirement }}</span>
              </el-form-item>
              <el-form-item label="性别要求">
                <span>{{ props.row.sexRequirement }}</span>
              </el-form-item>
              <el-form-item label="年龄要求">
                <span>{{ props.row.ageRequirement }}</span>
              </el-form-item>
              <el-form-item label="工作年限要求">
                <span>{{ props.row.workTimeRequirement }}</span>
              </el-form-item>
              <el-form-item label="工作地点">
                <span>{{ props.row.workPosition }}</span>
              </el-form-item>
              <el-form-item label="招聘人数">
                <span>{{ props.row.recruitNum }}</span>
              </el-form-item>
              <el-form-item label="具体要求">
                <span>{{ props.row.specificRequirement }}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="职位基本信息"
        :visible.sync="dialogFormVisible"
        width="520px"
      >
        <el-form :model="form" :label-width="formLabelWidth" class="editform">
          <el-form-item label="职位名称">
            <el-input v-model="form.jobName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位类型">
            <el-input v-model="form.jobType" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="薪水">
            <el-input v-model="form.salary" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学历要求">
            <el-input
              v-model="form.educationRequirement"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别要求">
            <el-input
              v-model="form.sexRequirement"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄要求">
            <el-input
              v-model="form.ageRequirement"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作年限要求">
            <el-input
              v-model="form.workTimeRequirement"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作地点">
            <el-input v-model="form.workPosition" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="招聘人数">
            <el-input v-model="form.recruitNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="具体要求">
            <el-input
              v-model="form.specificRequirement"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-input v-model="form.createTime" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateJob()">确 定</el-button>
        </div>
      </el-dialog>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 8, 16, 32]"
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
  pageJob,
  updateJob,
  deleteJob,
  addJob,
  getJobType,
  getWorkPosition,
  getEducationRequirement,
} from "../../../request/api";
export default {
  name: "jobInfo",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
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
      form1: {
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
    addJob() {
      addJob(this.form1)
        .then((res) => {
          const code = res.code;
          if (code == 200) {
            this.$message("新增职位成功!!");
            this.xzzw = false;
            this.pageJob();
            console.log(res);
          }
        })
        .catch((error) => {
          this.$message("新增职位失败!!");
          console.log(error);
        });
    },
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
    concel(form1) {
      this.$refs[form1].resetFields();
      this.xzzw = false;
    },
    showInput(row) {
      let data = { ...row };
      this.dialogFormVisible = true;
      this.form = data;
    },
    Delete(row) {
      this.$confirm(`确定删除这条删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteJob(row.jobId);
        })
        .catch(() => {});
    },
    updateJob() {
      updateJob(this.form)
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("修改成功！！");
          this.pageJob();

          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("修改失败！！");
          console.log(err);
        });
    },
    deleteJob(jobId) {
      deleteJob({ jobId })
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("删除成功！！");
          this.pageJob();
          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("删除失败！！");
          console.log(err);
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
      this.pageSize = val;
      this.pageJob(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageJob(this.pageSize, val);
    },
  },
};
</script>
<style scoped>
.etab {
  margin-left: 0px;
  border-radius: 5px;
}
.tip {
  text-align: center;
  color: #5683df;
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