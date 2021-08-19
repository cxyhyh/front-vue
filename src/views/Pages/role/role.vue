<template>
  <div>
    <div>
      <h1 class="tip">角色基本信息(仅管理员可查看)</h1>
    </div>
    <div class="filter-container">
      <el-select
        v-model="roles.roleType"
        placeholder="请选择角色类型"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="rt in roleOption"
          :key="rt.roleType"
          :value="rt.roleType"
          :label="rt.roleType"
        >
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="pageRole()"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="xzjs = true"
      >
        新增
      </el-button>
    </div>
    <el-dialog title="新增角色" :visible.sync="xzjs" width="520px">
      <el-form
        status-icon
        :rules="rules"
        :model="form1"
        ref="form1"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="角色类型值"
          prop="typeKey"
          :rules="[
            { required: true, message: '角色类型值不能为空' },
            { type: 'number', message: '角色类型值必须为数字' },
          ]"
        >
          <el-input
            v-model.number="form1.typeKey"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色类型"
          prop="roleType"
          :rules="[{ required: true, message: '角色类型不能为空' }]"
        >
          <el-input v-model="form1.roleType" autocomplete="off"></el-input>
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
        :data="roles"
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
        <el-table-column prop="roleId" label="roleId" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.roleId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="typeKey"
          label="角色类型值"
          min-width="40"
          :rules="[{ type: 'number', message: '角色类型值必须为数字' }]"
        >
          <template slot-scope="props">
            <span>{{ props.row.typeKey }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleType" label="角色类型" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.roleType }}</span>
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
      </el-table>
      <el-dialog
        title="角色基本信息"
        :visible.sync="dialogFormVisible"
        width="520px"
      >
        <el-form :model="form" :label-width="formLabelWidth" class="editform">
          <el-form-item label="角色类型值">
            <el-input
              v-model.number="form.typeKey"
              autocomplete="off"
              :rules="[{ type: 'number', message: '角色类型值必须为数字' }]"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色类型">
            <el-input v-model="form.roleType" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateRole()">确 定</el-button>
        </div>
      </el-dialog>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
         @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
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
  pageRole,
  getRoleType,
  addRole,
  deleteRole,
  updateRole,
} from "../../../request/api";
export default {
  name: "role",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      roles: [],
      roleOption: [],
      multipleSelection: [],
      classStatus: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      xzjs: false,
      form1: {
        roleId: "",
        roleType: "",
        typeKey: "",
      },
      form: {
        roleId: "",
        roleType: "",
        typeKey: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.pageRole();
    this.getRoleType();
  },
  methods: {
    addRole() {
      addRole(this.form1)
        //   if(this.form1.typeKey == res.typeKey){
        //               this.$message("角色类型值已经存在，不能重复!!");
        //           }
        //           if(this.form1.roleType == res.roleType){
        //               this.$message("角色类型已经存在，不能重复!!");
        //           }
        .then((res) => {
          const code = res.code;
          if (code == 200) {
            this.$message("新增角色成功!!");
            this.xzjs = false;
            this.getRoleType();
            this.pageRole();
            console.log(res);
          }
        })
        .catch((error) => {
          this.$message("新增角色失败!!");
          console.log(error);
        });
    },
    submitForm(form1) {
      // this.formatTime(this.ruleForm.birth)

      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.addRole();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    concel(form1) {
      this.$refs[form1].resetFields();
      this.xzjs = false;
    },
    deleteRole(roleId) {
      deleteRole({
        roleId,
      })
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("删除成功！！");
          this.pageRole();
          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("删除失败！！");
          console.log(err);
        });
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
          this.deleteRole(row.roleId);
        })
        .catch(() => {});
    },
    showInput(row) {
      let data = { ...row };
      this.dialogFormVisible = true;
      this.form = data;
    },
    updateRole() {
      updateRole(this.form)
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("修改成功！！");
          this.pageRole();

          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("修改失败！！");
          console.log(err);
        });
    },
    getRoleType() {
      getRoleType({})
        .then((res) => {
          this.roleOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    pageRole() {
      pageRole({
        current: this.currentPage,
        size: this.pageSize,
        roleType: this.roles.roleType,
      })
        .then((res) => {
          this.roles = res.data.records;
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
      this.pageRole(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageRole(this.pagesize, val);
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
  color: white;
}
.col {
  font-size: 10px;
}
.demo-table-expand {
  font-size: 0;
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