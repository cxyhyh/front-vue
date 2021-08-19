<template>
  <div>
    <div>
      <h1 class="img-tip">用户注册</h1>
    </div>
    <div class="resg">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
         <el-form-item label="用户类型" prop="roleType">
          <el-select v-model="ruleForm.typeKey" placeholder="请选择用户类型">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="公司用户" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="ruleForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" required>
          <el-col :span="11">
            <el-form-item prop="birth">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.birth"
                style="width: 100%"
                value-format="yyyy-MM-dd 00:00:00"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input v-model="ruleForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="名族" prop="nature">
          <el-input v-model="ruleForm.nature"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="hometown">
          <el-input v-model="ruleForm.hometown"></el-input>
        </el-form-item>
        <el-form-item label="文化程度" prop="education">
          <el-select v-model="ruleForm.education" placeholder="请选择学历">
            <el-option label="博士" value="博士"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="大学本科" value="大学本科"></el-option>
            <el-option label="专科" value="专科"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属院校" prop="college">
          <el-input v-model="ruleForm.college"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobilePhone">
          <el-input v-model="ruleForm.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="现住址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <div class="an">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { addUser } from "../../../request/api";
export default {
  name: "register",

  components: {},
  data() {
    return {
      ruleForm: {
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
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        typeKey: [
          { required: true, message: "请选择用户类型", trigger: "change" },
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birth: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],

        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
        ],
        nature: [{ required: true, message: "请输入名族", trigger: "blur" }],
        hometown: [{ required: true, message: "请输入籍贯", trigger: "blur" }],
        education: [
          { required: true, message: "请选择文化程度", trigger: "change" },
        ],
        college: [
          { required: true, message: "请输入所属院校", trigger: "blur" },
        ],
        mobilePhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
        address: [{ required: true, message: "请输入现住址", trigger: "blur" }],
      },
    };
  },
  mounted() {
  },
  methods: {
    addUser() {
      addUser(this.ruleForm)
        .then((res) => {
          const code = res.code;
          if (code == 200) {
            this.$message("注册成功!!");
            console.log(res);
          }
        })
        .catch((error) => {
          this.$message("注册失败!!");
          console.log(error);
        });
    },
    submitForm(ruleForm) {
      
      
      // this.formatTime(this.ruleForm.birth)
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.addUser();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    
  },
};
</script>
<style scoped>
.img-tip {
  text-align: center;
  color: #5683df;
}
.resg {
  padding: auto;
  width: 450px;
  margin: auto;
  background-color: aliceblue;
  border-radius: 5px;
}
.el-input {
  width: 300px;
}
.an {
  margin-left: 40px;
}
</style>