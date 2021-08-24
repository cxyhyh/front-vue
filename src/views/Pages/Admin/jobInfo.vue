<template>
  <div>
    <div>
      <h1 class="tip">职位基本信息(仅管理员可查看)</h1>
    </div>
    <div class="filter-container">
      <el-input
        v-model="jobs.jobName"
        placeholder="请输入职位名称"
        style="margin-left: 0px"
        class="filter-item"
      />
      <el-select
        v-model="jobs.jobType"
        placeholder="请选择职位类型"
        clearable
        style="margin-left: 50px"
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
        style="margin-left: 53px"
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
        style="margin-left: 60px"
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
        style="margin-left: 60px"
        icon="el-icon-search"
        @click="pageJob()"
      >
        查询
      </el-button>
    </div>
    <div class="filter-container2">
      <el-button
        slot="trigger"
        @click="dialogVisible = true"
        icon="el-icon-document"
        type="primary"
        >导入
      </el-button>
      <el-dialog width="900px" :visible.sync="dialogVisible">
        <el-form ref="form" label-width="70px" v-model="formT">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-exceed="exceed"
            limit="1"
            :show-file-list="true"
            :on-remove="remove"
            accept=".xlsx"
            :http-request="uploadFile"
          >
            <el-button size="small" type="primary" plain>选择文件</el-button>
          </el-upload>
        </el-form>
        <div class="preview-excel">
          <el-table
            class="listTable_ele"
            :row-class-name="tableRowClassName"
            align="center"
            :data="list"
            stripe
            height="250"
            style="width: 100%"
          >
            <el-table-column
              :label="item.label"
              align="center"
              :prop="item.props"
              :key="'table' + index"
              :min-width="item.width && item.width + 'px'"
              width="min-content"
              v-for="(item, index) in tableThead"
            >
              <template slot-scope="{ row, $index }">
                <el-tooltip
                  v-if="
                    errorIndexArr.indexOf($index) != -1 &&
                    errorIndexMsgObj[$index] &&
                    errorIndexMsgObj[$index][item.props]
                  "
                  effect="dark"
                  :content="
                    errorIndexMsgObj[$index] &&
                    errorIndexMsgObj[$index][item.props]
                  "
                  placement="top"
                >
                  <div class="table-content table-content-error">
                    {{ (item.props && row[item.props]) || "该列不可为空！" }}
                  </div>
                </el-tooltip>
                <div v-else class="table-content">
                  {{ item.props && row[item.props] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="download"
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="exportDefaultTemplateJob()"
          >
            下载模板
          </el-button>
          <el-button
            type="primary"
            :loading="downloadLoading"
            size="small"
            @click="importU()"
            >导入</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="filter-container1">
      <el-button class="upload2" type="primary" @click="exportJob()">
        导出
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
  exportDefaultTemplateJob,
  exportJob,
  importJob,
} from "../../../request/api";
import XLSX from "../../../../node_modules/xlsx";
export default {
  name: "jobInfo",
  components: {},
  data() {
    return {
      tableThead: [
        {
          props: "jobName",
          label: "职位名称",
          width: "150",
        },
        {
          props: "jobType",
          label: "职位类型",
          width: "100",
        },
        {
          props: "educationRequirement",
          label: "学历要求",
          width: "80",
        },
        {
          props: "sexRequirement",
          label: "性别要求",
          width: "60",
        },
        {
          props: "ageRequirement",
          label: "年龄要求",
          width: "60",
        },
        {
          props: "workTimeRequirement",
          label: "工作年限要求",
          width: "80",
        },
        {
          props: "workPosition",
          label: "工作地点",
          width: "60",
        },
        {
          props: "recruitNum",
          label: "招聘人数",
          width: "60",
        },
        {
          props: "specificRequirement",
          label: "具体要求",
          width: "200",
        },
        {
          props: "createTime",
          label: "发布时间",
          width: "100",
        },
        {
          props: "salary",
          label: "薪资",
          width: "70",
        },
        {
          props: "belongCompany",
          label: "所属公司",
          width: "180",
        },
      ],
      currentPage: 1,
      pageSize: 4,
      total: 0,
      jobs: [],
      list: [],
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
        belongCompany: "",
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
        belongCompany: "",
      },
      formLabelWidth: "120px",
      name: "模板-职位.xlsx",
      exportName: "职位信息.xlsx",
      dialogVisible: false,
      downloadLoading: false,
      formT: {},
      errorIndexArr: [],
      errorIndexMsgObj: {},
    };
  },
  mounted() {
    this.pageJob();
    this.getJobType();
    this.getWorkPosition();
    this.getEducationRequirement();
  },
  methods: {
    async uploadFile(params) {
      console.log(params);
      const _file = params.file;
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          for (let sheet in workbook.Sheets) {
            //循环读取每个文件
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            //若当前sheet没有数据，则continue
            if (sheetArray.length == 0) {
              continue;
            }
            console.log("读取文件");
            console.log(sheetArray);
            for (let item in sheetArray) {
              let rowTable = {};
              //这里的rowTable的属性名注意要与上面表格的prop一致
              //sheetArray的属性名与上传的表格的列名一致
              rowTable.jobName = sheetArray[item].职位名称;
              rowTable.jobType = sheetArray[item].职位类型;
              rowTable.educationRequirement = sheetArray[item].学历要求;
              rowTable.sexRequirement = sheetArray[item].性别要求;
              rowTable.ageRequirement = sheetArray[item].年龄要求;
              rowTable.workTimeRequirement = sheetArray[item].工作年限要求;
              rowTable.workPosition = sheetArray[item].工作地点;
              rowTable.recruitNum = sheetArray[item].招聘人数;
              rowTable.specificRequirement = sheetArray[item].具体要求;
              rowTable.createTime = sheetArray[item].发布时间;
              rowTable.salary = sheetArray[item].薪资;
              rowTable.belongCompany = sheetArray[item].所属公司;
              this.list.push(rowTable);
            }
          }
        } catch (e) {
          this.$message.warning("文件类型不正确！");
        }
      };
      fileReader.readAsBinaryString(_file);
    },
    daoruErrorFun(msgArr) {
      let errorIndexArr = [];
      let errorIndexMsgObj = {};
      msgArr.forEach((v) => {
        let arr = v.split("#@") || [];
        let index = parseFloat(arr[0]);
        errorIndexArr.push(index);
        let value = arr[1] || "";
        let arr1 = value.split("@");
        errorIndexMsgObj[index] = {};
        arr1.forEach((v1) => {
          let arr2 = v1.split(":");
          errorIndexMsgObj[index][arr2[0]] = arr2[1];
        });
      });
      this.errorIndexArr = errorIndexArr;
      this.errorIndexMsgObj = errorIndexMsgObj;
    },
    tableRowClassName({ row, rowIndex }) {
      let $index = rowIndex;
      for (let props in row) {
        let res =
          this.errorIndexArr.indexOf($index) != -1 &&
          this.errorIndexMsgObj[$index] &&
          this.errorIndexMsgObj[$index][props];
        if (res) {
          return "table-row-error";
        }
      }
      return "";
    },
    importU() {
      if (this.list.length == 0) {
        this.$message.warning("请最少导入一条数据！");
      } else {
        this.importJob();
      }
    },
    importJob() {
      importJob({
        list: this.list,
      })
        .then((res) => {
          if (res.data.code == 400) {
            let msgArr = res.data.message || [];
            console.log(msgArr);
            this.daoruErrorFun(msgArr);
            this.$message.error("导入失败！！");
          } else {
            this.$message.success("导入成功！！");
            this.dialogVisible = false;
          }
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    exportJob() {
      exportJob({
        fileName: this.exportName,
      })
        .then((res) => {
          // this.$message("文件下载成功");
          console.log(res);
          const blob = new Blob([res]);
          const fileName = this.exportName;
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
    exportDefaultTemplateJob() {
      exportDefaultTemplateJob({
        moduleNameCn: this.name,
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
    beforeUpload(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (extension !== "xlsx") {
        this.$message({
          message: "上传文件只能是 xls格式!",
          type: "warning",
        });
        return false;
      }
    },
    uploadSuccess(res) {
      if (res.code == 200) {
        this.$message({
          message: "导入成功!",
          type: "info",
        });
      } else {
        this.$alert(res.message, "导入失败", {
          confirmButtonText: "确定",
        });
      }
      this.$refs.upload.clearFiles();
    },
    exceed: function () {
      this.$message.error("最多只能上传1个xls文件");
    },
    remove() {
      this.list = [];
    },
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
<style lang='less' scoped>
.preview-excel {
  height: 90%;

  .table-row-error {
    background: rgba(255, 0, 0, 0.18) !important;
    &:hover td {
      background: none !important;
    }
  }
  .table-content-error {
    color: #e4393c;
  }
}
.listTable_ele {
  color: grey;
}
.diaTable {
  background-color: #41c79a25;
}
.filter-container /deep/ .filter-item {
  height: 40px;
  margin-top: 10px;
  width: 150px;
}
.filter-container {
  height: 70px;
}
.filter-container1 {
  height: 40px;
  width: 310px;
  margin-left: 800px;
  margin-top: -40px;
}
.filter-container2 {
  height: 40px;
  width: 70px;
  margin-left: 700px;
}
.import {
  width: 100px;
  margin-left: 900px;
  margin-top: -40px;
}
.etab {
  margin-top: 25px;
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