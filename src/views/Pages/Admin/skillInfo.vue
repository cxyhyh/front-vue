<template>
  <div>
    <div>
      <h1 class="tip">技能基本信息(仅管理员可查看)</h1>
    </div>
    <div class="filter-container">
      <el-select
        v-model="skills.computerSkill"
         placeholder="请选择计算机能力"
        clearable
        style="width: 160px"
        class="filter-item"
      >
        <el-option
          v-for="cs in computerSkillOption"
          :key="cs.computerSkill"
          :value="cs.computerSkill"
          :label="cs.computerSkill"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="skills.englishSkill"
         placeholder="请选择英语水平"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="es in englishSkillOption"
          :key="es.englishSkill"
          :value="es.englishSkill"
          :label="es.englishSkill"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="skills.appliedPosition"
         placeholder="请选择应聘职位"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="ap in appliedPositionOption"
          :key="ap.appliedPosition"
          :value="ap.appliedPosition"
          :label="ap.appliedPosition"
        >
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="pageSkill()"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="xzjn = true"
      >
        新增
      </el-button>
    </div>
    <el-dialog title="新增技能" :visible.sync="xzjn" width="520px">
      <el-form
        status-icon
        :rules="skills"
        :model="form1"
        ref="form1"
        label-width="100px"
        class="demo-ruleForm"
      >
      <el-form-item
          label="真实姓名"
          prop="realName"
          :rules="[{ required: true, message: '真实姓名不能为空' }]"
        >
          <el-input v-model="form1.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="应聘职位"
          prop="appliedPosition"
          :rules="[
            { required: true, message: '应聘职位不能为空' },
          ]"
        >
          <el-input
            v-model.number="form1.appliedPosition"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="计算机能力"
          prop="computerSkill"
          :rules="[{ required: true, message: '计算机能力不能为空' }]"
        >
          <el-input v-model="form1.computerSkill" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="主要技能"
          prop="mainSkill"
          :rules="[{ required: true, message: '主要技能不能为空' }]"
        >
          <el-input v-model="form1.mainSkill" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item
          label="英语水平"
          prop="englishSkill"
          :rules="[{ required: true, message: '英语水平不能为空' }]"
        >
          <el-input v-model="form1.englishSkill" autocomplete="off"></el-input>
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
        :data="skills"
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
        <el-table-column prop="realName" label="真实姓名" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="appliedPosition"
          label="应聘职位"
          min-width="40"
        >
          <template slot-scope="props">
            <span>{{ props.row.appliedPosition }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="englishSkill" label="英语水平" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.englishSkill }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="computerSkill" label="计算机能力" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.computerSkill }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mainSkill" label="主要技能" min-width="40">
          <template slot-scope="props">
            <span>{{ props.row.mainSkill }}</span>
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
        title="技能基本信息"
        :visible.sync="dialogFormVisible"
        width="520px"
      >
        <el-form :model="form" :label-width="formLabelWidth" class="editform">
          <el-form-item label="真实姓名">
            <el-input
              v-model.number="form.realName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="应聘职位">
            <el-input v-model="form.appliedPosition" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="英语水平">
            <el-input v-model="form.englishSkill" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="计算机能力">
            <el-input v-model="form.computerSkill" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="主要技能">
            <el-input v-model="form.mainSkill" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateSkill()">确 定</el-button>
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
  pageSkill,getEnglishSkill,getComputerSkill,getAppliedPosition,addSkill,deleteSkill,updateSkill
} from "../../../request/api";
export default {
  name: "skillInfo",
  components: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      skills: [],
      computerSkillOption: [],
      englishSkillOption:[],
      appliedPositionOption:[],
      multipleSelection: [],
      classStatus: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      xzjn: false,
      form1: {
        skillId: "",
        appliedPosition: "",
        englishSkill: "",
        computerSkill: "",
        mainSkill: "",
        realName: "",
      },
      form: {
        skillId: "",
        appliedPosition: "",
        englishSkill: "",
        computerSkill: "",
        mainSkill: "",
        realName: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.pageSkill();
    this.getEnglishSkill();
    this.getComputerSkill();
    this.getAppliedPosition();
  },
  methods: {
    addSkill() {
      addSkill(this.form1)
        .then((res) => {
          const code = res.code;
          if (code == 200) {
            this.$message("新增技能成功!!");
            this.xzjn = false;
            this.pageSkill();
            console.log(res);
          }
        })
        .catch((error) => {
          this.$message("新增技能失败!!");
          console.log(error);
        });
    },
    submitForm(form1) {
      // this.formatTime(this.ruleForm.birth)

      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.addSkill();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    concel(form1) {
      this.$refs[form1].resetFields();
      this.xzjn = false;
    },
    deleteSkill(skillId) {
      deleteSkill({
        skillId,
      })
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("删除成功！！");
          this.pageSkill();
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
          this.deleteSkill(row.skillId);
        })
        .catch(() => {});
    },
    showInput(row) {
      let data = { ...row };
      this.dialogFormVisible = true;
      this.form = data;
    },
    updateSkill() {
      updateSkill(this.form)
        .then((res) => {
          this.dialogFormVisible = false;
          this.$message("修改成功！！");
          this.pageSkill();

          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("修改失败！！");
          console.log(err);
        });
    },
    pageSkill() {
      pageSkill({
        current: this.currentPage,
        size: this.pageSize,
        realName: this.skills.realName,
         appliedPosition: this.skills.appliedPosition,
          computerSkill: this.skills.computerSkill,
           englishSkill: this.skills.englishSkill,
      })
        .then((res) => {
          this.skills = res.data.records;
          this.total = Number(res.data.total);
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
     getEnglishSkill() {
      getEnglishSkill({})
        .then((res) => {
          this.englishSkillOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
     getComputerSkill() {
      getComputerSkill({})
        .then((res) => {
          this.computerSkillOption = res.data;
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
     getAppliedPosition() {
      getAppliedPosition({})
        .then((res) => {
          this.appliedPositionOption = res.data;
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
    handleSizeChange(val){
      this.pageSize = val
      this.pageSkill(val,1)
      this.currentPage = 1
    },
    //显示第几页
    handleCurrentChange(val){
      this.currentPage = val
      this.pageSkill(this.pageSize,val)
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