<template>
  <div>
    <div>
      <h1 class="tip">企业基本信息(仅管理员可查看)</h1>
    </div>
    <div class="filter-container">
      <el-input
        v-model="companys.companyName"
        placeholder="请输入企业名称"
         style="margin-left: 140px"
        class="filter-item"
      >
      </el-input>
      <el-select
        v-model="companys.companyType"
        placeholder="请选择企业类型"
        clearable
        class="filter-item"
        style="margin-left: 50px"
      >
        <el-option
          v-for="ct in companyTypeOption"
          :key="ct.companyType"
          :value="ct.companyType"
          :label="ct.companyType"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="companys.location"
        placeholder="请选择位置"
        style="margin-left: 53px"
        class="filter-item"
      >
        <el-option
          v-for="lo in locationOption"
          :key="lo.location"
          :value="lo.location"
          :label="lo.location"
        >
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        style="margin-left: 60px"
        type="primary"
        icon="el-icon-search"
        @click="pageCompany()"
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
            :data="list"
            stripe
            height="250"
            style="width: 100%"
          >
            <el-table-column
              prop="companyName"
              label="企业名称"
              width="180"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="companyType"
              label="企业类型"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="foundTime"
              label="成立时间"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="employNum"
              label="员工人数"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="location"
              label="所在位置"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="telephone"
              label="联系电话"
              width="150"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="联系地址"
              width="200"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="postalCode"
              label="邮政编码"
              width="80"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="http"
              label="网址"
              width="200"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="email"
              label="电子邮箱"
              width="200"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="introduce"
              label="企业简介"
              width="1000"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="download"
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="exportDefaultTemplateCompany()"
          >
            下载模板
          </el-button>
          <el-button type="primary" :loading="downloadLoading" size="small" @click="importCompany()"
            >导入</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="filter-container1">
      <el-button class="upload2" type="primary" @click="exportCompany()">
        导出
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="xzqy = true"
      >
        新增
      </el-button>
    </div>
    <el-dialog title="新增企业" :visible.sync="xzqy" width="520px">
      <el-form
        :model="form1"
        ref="form1"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="企业名称"
          prop="companyName"
          :rules="[{ required: true, message: '请输入企业名称' }]"
        >
          <el-input v-model="form1.companyName"></el-input>
        </el-form-item>
        <el-form-item
          label="企业类型"
          prop="companyType"
          :rules="[{ required: true, message: '请输入企业类型' }]"
        >
          <el-input v-model="form1.companyType"></el-input>
        </el-form-item>
        <el-form-item label="员工人数" prop="employNum">
          <el-input v-model="form1.employNum"></el-input>
        </el-form-item>
        <el-form-item
          label="所在位置"
          prop="location"
          :rules="[{ required: true, message: '请输入所在位置' }]"
        >
          <el-input v-model="form1.location"></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="telephone"
          :rules="[{ required: true, message: '请输入联系电话' }]"
        >
          <el-input v-model="form1.telephone"></el-input>
        </el-form-item>
        <el-form-item
          label="联系地址"
          prop="address"
          :rules="[{ required: true, message: '请输入联系地址' }]"
        >
          <el-input v-model="form1.address"></el-input>
        </el-form-item>
        <el-form-item
          label="邮政编码"
          prop="postalCode"
          :rules="[{ required: true, message: '请输入邮政编码' }]"
        >
          <el-input v-model="form1.postalCode"></el-input>
        </el-form-item>
        <el-form-item
          label="网址"
          prop="http"
          :rules="[{ required: true, message: '请输入网址' }]"
        >
          <el-input v-model="form1.http"></el-input>
        </el-form-item>
        <el-form-item
          label="电子邮箱"
          prop="email"
          :rules="[{ required: true, message: '请输入电子邮箱' }]"
        >
          <el-input v-model="form1.email"></el-input>
        </el-form-item>
        <el-form-item
          label="企业简介"
          prop="introduce"
          :rules="[{ required: true, message: '请输入企业简介' }]"
        >
          <el-input v-model="form1.introduce"></el-input>
        </el-form-item>
        <el-form-item
          label="成立时间"
          required
          :rules="[{ required: true, message: '请选择成立时间' }]"
        >
          <el-col :span="11">
            <el-form-item prop="foundTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form1.foundTime"
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
        :data="companys"
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
        <el-table-column prop="companyName" label="企业名称" min-width="70">
          <template slot-scope="props">
            <span>{{ props.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyType" label="企业类型" min-width="50">
          <template slot-scope="props">
            <span>{{ props.row.companyType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="foundTime" label="成立时间" min-width="60">
          <template slot-scope="props">
            <span>{{ props.row.foundTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="联系地址" min-width="120">
          <template slot-scope="props">
            <span>{{ props.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="telephone" label="联系电话" min-width="60">
          <template slot-scope="props">
            <span>{{ props.row.telephone }}</span>
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
              <el-form-item label="id">
                <span>{{ props.row.companyId }}</span>
              </el-form-item>
              <el-form-item label="企业名称">
                <span>{{ props.row.companyName }}</span>
              </el-form-item>
              <el-form-item label="企业类型">
                <span>{{ props.row.companyType }}</span>
              </el-form-item>
              <el-form-item label="成立时间">
                <span>{{ props.row.foundTime }}</span>
              </el-form-item>
              <el-form-item label="员工人数">
                <span>{{ props.row.employNum }}</span>
              </el-form-item>
              <el-form-item label="所在位置">
                <span>{{ props.row.location }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.telephone }}</span>
              </el-form-item>
              <el-form-item label="联系地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="邮政编码">
                <span>{{ props.row.postalCode }}</span>
              </el-form-item>
              <el-form-item label="网址">
                <span>{{ props.row.http }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="企业简介">
                <span>{{ props.row.introduce }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="企业基本信息"
        :visible.sync="dialogFormVisible"
        width="520px"
      >
        <el-form :model="form" :label-width="formLabelWidth" class="editform">
          <el-form-item label="企业名称">
            <el-input v-model="form.companyName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业类型">
            <el-input v-model="form.companyType" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="成立时间">
            <el-input v-model="form.foundTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工人数">
            <el-input v-model="form.employNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所在位置">
            <el-input v-model="form.location" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="form.postalCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="网址">
            <el-input v-model="form.http" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业简介">
            <el-input v-model="form.introduce" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateCompany()">确 定</el-button>
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
  pageCompany,
  addCompany,
  deleteCompany,
  updateCompany,
  getCompanyType,
  getLocation,
  exportDefaultTemplateCompany,
  exportCompany,
  importCompany,
} from "../../../request/api";
import XLSX from "../../../../node_modules/xlsx";
export default {
  name: "company",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
      total: 0,
      companys: [],
      list:[],
      companyTypeOption: [],
      locationOption: [],
      multipleSelection: [],
      classStatus: false,
      expands: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xzqy: false,
      form: {
        companyName: "",
        companyType: "",
        foundTime: "",
        employNum: "",
        location: "",
        telephone: "",
        address: "",
        postalCode: "",
        http: "",
        email: "",
        introduce: "",
        companyId: "",
      },
      form1: {
        companyName: "",
        companyType: "",
        foundTime: "",
        employNum: "",
        location: "",
        telephone: "",
        address: "",
        postalCode: "",
        http: "",
        email: "",
        introduce: "",
        companyId: "",
      },
      formLabelWidth: "120px",
      name: "模板-企业.xlsx",
      exportName: "企业信息.xlsx",
      dialogVisible: false,
      downloadLoading: false,
      formT: {},
    };
  },
  mounted() {
    this.pageCompany();
    this.getCompanyType();
    this.getLocation();
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
              rowTable.companyName = sheetArray[item].企业名称;
              rowTable.companyType = sheetArray[item].企业类型;
              rowTable.foundTime = sheetArray[item].成立时间;
              rowTable.employNum = sheetArray[item].员工人数;
              rowTable.location = sheetArray[item].所在位置;
              rowTable.telephone = sheetArray[item].联系电话;
              rowTable.address = sheetArray[item].联系地址;
              rowTable.postalCode = sheetArray[item].邮政编码;
              rowTable.http = sheetArray[item].网址;
              rowTable.email = sheetArray[item].电子邮箱;
              rowTable.introduce = sheetArray[item].企业简介;
              this.list.push(rowTable);
            }
          }
        } catch (e) {
          this.$message.warning("文件类型不正确！");
        }
      };
      fileReader.readAsBinaryString(_file);
    },
     importCompany() {
      importCompany({
        list: this.list,
      })
        .then((res) => {
          if (res.data.code == 400) {
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
    exportCompany() {
      exportCompany({
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
     exportDefaultTemplateCompany() {
      exportDefaultTemplateCompany({
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
    addCompany() {
      addCompany(this.form1)
        .then((res) => {
          const code = res.code;
          if (code == 200) {
            this.$message("新增企业成功!!");
            this.xzqy = false;
            this.pageCompany();
            console.log(res);
          }
        })
        .catch((error) => {
          this.$message("新增企业失败!!");
          console.log(error);
        });
    },
    submitForm(form1) {
      // this.formatTime(this.ruleForm.birth)
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.addCompany();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    concel(form1) {
      this.$refs[form1].resetFields();
      this.xzqy = false;
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
          //    let data = { ...row};
          // this.form = data;
          this.deleteCompany(row.companyId);
        })
        .catch(() => {});
    },
    updateCompany() {
      updateCompany(this.form)
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("修改成功！！");
          this.pageCompany();

          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("修改失败！！");
          console.log(err);
        });
    },
    deleteCompany(companyId) {
      deleteCompany({ companyId })
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("删除成功！！");
          this.pageCompany();
          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("删除失败！！");
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
    getCompanyType() {
      getCompanyType({})
        .then((res) => {
          this.companyTypeOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getLocation() {
      getLocation({})
        .then((res) => {
          this.locationOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    pageCompany() {
      pageCompany({
        current: this.currentPage,
        size: this.pageSize,
        companyName: this.companys.companyName,
        companyType: this.companys.companyType,
        location: this.companys.location,
      })
        .then((res) => {
          this.companys = res.data.records;
          this.total = Number(res.data.total);

          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageCompany(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageCompany(this.pagesize, val);
    },
  },
};
</script>

<style scoped>
.listTable_ele{
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
  margin-left: 730px;
  margin-top: -40px;
}
.filter-container2 {
  height: 40px;
  width: 70px;
  margin-left: 630px;
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