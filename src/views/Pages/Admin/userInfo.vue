<template>
  <div>
    <div>
      <h1 class="tip">用户基本信息(仅管理员可查看)</h1>
    </div>
    <div class="filter-container">
      <el-input
        v-model="users.username"
        placeholder="请输入用户名"
        style="margin-left: 0px"
        class="filter-item"
      >
      </el-input>
      <el-select
        v-model="users.roleType"
        placeholder="请选择用户类型"
        clearable
        style="margin-left: 50px"
        class="filter-item"
      >
        <el-option
          v-for="rt in roleTypeOption"
          :key="rt.roleType"
          :value="rt.roleType"
          :label="rt.roleType"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="users.realName"
        placeholder="请输入真实姓名"
        style="margin-left: 53px"
        class="filter-item"
      >
      </el-input>
      <el-select
        v-model="users.education"
        placeholder="请选择文化程度"
        style="margin-left: 60px"
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
        style="margin-left: 60px"
        @click="pageUser()"
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
              prop="username"
              label="用户名"
              width="80"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="password"
              label="密码"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="roleType"
              label="用户类型"
              width="90"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="realName"
              label="姓名"
              width="90"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="birth"
              label="出生日期"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="nature"
              label="民族"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="idCard"
              label="身份证号"
              width="200"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="hometown"
              label="籍贯"
              width="150"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="mobilePhone"
              label="联系电话"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="常驻地址"
              width="150"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="email"
              label="电子邮箱"
              width="180"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="education"
              label="学历"
              width="80"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="college"
              label="毕业院校"
              width="180"
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
            @click="exportDefaultTemplate()"
          >
            下载模板
          </el-button>
          <el-button type="primary" :loading="downloadLoading" size="small" @click="importUser()"
            >导入</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="filter-container1">
      <el-button class="upload2" type="primary" @click="exportUser()">
        导出
      </el-button>
      <el-button
        class="download"
        type="primary"
        icon="el-icon-download"
        @click="exportDefaultTemplate()"
      >
        下载模板
      </el-button>
      <el-button
        class="edit"
        type="primary"
        icon="el-icon-edit"
        @click="xz = true"
      >
        新增
      </el-button>
    </div>
    <el-dialog title="新增用户" :visible.sync="xz" width="520px">
      <el-form
        :model="form1"
        ref="form1"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[{ required: true, message: '用户名不能为空' }]"
        >
          <el-input v-model="form1.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input v-model="form1.password"></el-input>
        </el-form-item>
        <el-form-item
          label="用户类型"
          prop="typeKey"
          :rules="[{ required: true, message: '用户类型不能为空' }]"
        >
          <el-select v-model="form1.typeKey" placeholder="请选择用户类型">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="公司用户" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="真实姓名"
          prop="realName"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input v-model="form1.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form1.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="出生日期"
          required
          :rules="[{ required: true, message: '请选择日期' }]"
        >
          <el-col :span="11">
            <el-form-item prop="birth">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form1.birth"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          label="身份证号码"
          prop="idCard"
          :rules="[{ required: true, message: '请输入身份证号码' }]"
        >
          <el-input v-model="form1.idCard"></el-input>
        </el-form-item>
        <el-form-item
          label="名族"
          prop="nature"
          :rules="[{ required: true, message: '请输入名族' }]"
        >
          <el-input v-model="form1.nature"></el-input>
        </el-form-item>
        <el-form-item
          label="籍贯"
          prop="hometown"
          :rules="[{ required: true, message: '请输入籍贯' }]"
        >
          <el-input v-model="form1.hometown"></el-input>
        </el-form-item>
        <el-form-item
          label="文化程度"
          prop="education"
          :rules="[{ required: true, message: '请选择文化程度' }]"
        >
          <el-select v-model="form1.education" placeholder="请选择学历">
            <el-option label="博士" value="博士"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="大学本科" value="大学本科"></el-option>
            <el-option label="专科" value="专科"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属院校"
          prop="college"
          :rules="[{ required: true, message: '请输入所属院校' }]"
        >
          <el-input v-model="form1.college"></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="mobilePhone"
          :rules="[{ required: true, message: '请输入联系方式' }]"
        >
          <el-input v-model="form1.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item
          label="电子邮箱"
          prop="email"
          :rules="[{ required: true, message: '请输入电子邮箱' }]"
        >
          <el-input v-model="form1.email"></el-input>
        </el-form-item>
        <el-form-item
          label="现住址"
          prop="address"
          :rules="[{ required: true, message: '请输入现住址' }]"
        >
          <el-input v-model="form1.address"></el-input>
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
        :data="users"
        ref="multipleTable"
        tooltip-effect="dark"
        border
        fit
        highlight-current-row
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
        <el-table-column prop="username" label="用户名" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="password" label="密码" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleType" label="用户类型" min-width="50">
          <template slot-scope="props">
            <span>{{ props.row.roleType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名" min-width="50">
          <template slot-scope="props">
            <span>{{ props.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" min-width="30">
          <template slot-scope="props">
            <span>{{ props.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nature" label="民族" min-width="30">
          <template slot-scope="props">
            <span>{{ props.row.nature }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="education" label="文化程度" min-width="50">
          <template slot-scope="props">
            <span>{{ props.row.education }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="现住址" min-width="120">
          <template slot-scope="props">
            <span>{{ props.row.address }}</span>
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
              <el-form-item label="用户名">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="密码">
                <span>{{ props.row.password }}</span>
              </el-form-item>
              <el-form-item label="用户类型">
                <span>{{ props.row.roleType }}</span>
              </el-form-item>
              <el-form-item label="真实姓名">
                <span>{{ props.row.realName }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="出生日期">
                <span>{{ props.row.birth }}</span>
              </el-form-item>
              <el-form-item label="身份证号码">
                <span>{{ props.row.idCard }}</span>
              </el-form-item>
              <el-form-item label="民族">
                <span>{{ props.row.nature }}</span>
              </el-form-item>
              <el-form-item label="籍贯">
                <span>{{ props.row.hometown }}</span>
              </el-form-item>
              <el-form-item label="文化程度">
                <span>{{ props.row.education }}</span>
              </el-form-item>
              <el-form-item label="所属院校">
                <span>{{ props.row.college }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.mobilePhone }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="现住址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="用户基本信息"
        :visible.sync="dialogFormVisible"
        width="520px"
      >
        <el-form :model="form" :label-width="formLabelWidth" class="editform">
          <el-form-item label="用户名">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-input v-model="form.roleType" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="form.realName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model="form.birth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input v-model="form.idCard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="名族">
            <el-input v-model="form.nature" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="form.hometown" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文化程度">
            <el-input v-model="form.education" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属院校">
            <el-input v-model="form.college" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现住址">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser()">确 定</el-button>
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
  pageUser,
  updateUser,
  addUser,
  deleteUser,
  getUserRoleType,
  getEducation,
  exportDefaultTemplate,
  exportUser,
  importUser,
} from "../../../request/api";
import XLSX from "../../../../node_modules/xlsx";
export default {
  name: "userInfo",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
      total: 0,
      list: [],
      file: "",
      users: [],
      roleTypeOption: [],
      educationOption: [],
      multipleSelection: [],
      classStatus: false,
      expands: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xz: false,
      form: {
        username: "",
        address: "",
        email: "",
        mobilePhone: "",
        college: "",
        education: "",
        hometown: "",
        nature: "",
        idCard: "",
        birth: "",
        sex: "",
        realName: "",
        password: "",
        roleType: "",
        typeKey: "",
      },
      form1: {
        username: "",
        address: "",
        email: "",
        mobilePhone: "",
        college: "",
        education: "",
        hometown: "",
        nature: "",
        idCard: "",
        birth: "",
        sex: "",
        realName: "",
        password: "",
        roleType: "",
        typeKey: "",
      },
      formLabelWidth: "120px",
      name: "模板-用户.xlsx",
      exportName: "用户信息.xlsx",
      dialogVisible: false,
      downloadLoading: false,
      formT: {},
    };
  },
  mounted() {
    this.pageUser();
    this.getUserRoleType();
    this.getEducation();
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
              rowTable.username = sheetArray[item].用户名;
              if(rowTable.username == this.users.username){
                this.$message("第"+item+"行"+"用户名"+rowTable.username+"重复")
              }
              rowTable.password = sheetArray[item].密码;
              rowTable.roleType = sheetArray[item].用户类型;
              rowTable.realName = sheetArray[item].姓名;
              rowTable.sex = sheetArray[item].性别;
              rowTable.birth = sheetArray[item].出生日期;
              rowTable.nature = sheetArray[item].民族;
              rowTable.idCard = sheetArray[item].身份证号;
              rowTable.hometown = sheetArray[item].籍贯;
              rowTable.mobilePhone = sheetArray[item].联系电话;
              rowTable.address = sheetArray[item].常驻地址;
              rowTable.email = sheetArray[item].电子邮箱;
              rowTable.education = sheetArray[item].学历;
              rowTable.college = sheetArray[item].毕业院校;
              this.list.push(rowTable);
            }

          }
        } catch (e) {
          this.$message.warning("文件类型不正确！");
        }
      };
      fileReader.readAsBinaryString(_file);
    },
    importUser() {
      importUser({
        list: this.list,
      })
        .then((res) => {
          if (res.data.code == 400) {
            this.$message.error("导入失败！！");
            this.$message(res.$data.$message);
            console.log(res.data.message);
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
    exceed: function () {
      this.$message.error("最多只能上传1个xls文件");
    },
    remove() {
      this.list = [];
    },
    exportUser() {
      exportUser({
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
    exportDefaultTemplate() {
      exportDefaultTemplate({
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
    addUser() {
      addUser(this.form1)
        .then((res) => {
          const code = res.code;
          if (code == 200) {
            this.$message("新增用户成功!!");
            this.xz = false;
            this.pageUser();
            console.log(res);
          }
        })
        .catch((error) => {
          this.$message("新增用户失败!!");
          console.log(error);
        });
    },
    submitForm(form1) {
      // this.formatTime(this.ruleForm.birth)
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.addUser();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    concel(form1) {
      this.$refs[form1].resetFields();
      this.xz = false;
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
          // let data = { ...row};
          // this.form = data;
          this.deleteUser(row.id);
        })
        .catch(() => {});
    },
    updateUser() {
      updateUser(this.form)
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("修改成功！！");
          this.pageUser();

          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("修改失败！！");
          console.log(err);
        });
    },
    deleteUser(id) {
      deleteUser({
        id,
      })
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("删除成功！！");
          this.pageUser();
          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("删除失败！！");
          console.log(err);
        });
    },
    pageUser() {
      pageUser({
        current: this.currentPage,
        size: this.pageSize,
        username: this.users.username,
        realName: this.users.realName,
        roleType: this.users.roleType,
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
    getUserRoleType() {
      getUserRoleType({})
        .then((res) => {
          this.roleTypeOption = res.data;
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
      this.pageSize = val;
      this.pageUser(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageUser(this.pageSize, val);
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
  margin-left: 670px;
  margin-top: -40px;
}
.filter-container2 {
  height: 40px;
  width: 70px;
  margin-left: 570px;
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