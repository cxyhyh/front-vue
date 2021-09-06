<template>
  <div>
    <div>
      <el-form :model="list" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="list.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input :disabled="true" v-model="list.password"></el-input>
        </el-form-item>
        <div class="tx">
          <el-avatar :src="bas" :size="120"></el-avatar>
        </div>
        <div class="bt">
          <el-upload
            action=""
            multiple
            :limit="1"
            :show-file-list="false"
          >
          <el-button type="primary" size="mini">更换</el-button>
          </el-upload>
        </div>
        <el-form-item
          label="真实姓名"
          prop="realName"
          style="margin-top: -37px"
        >
          <el-input :disabled="true" v-model="list.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input :disabled="true" v-model="list.sex"> </el-input>
        </el-form-item>
        <el-form-item
          label="名族"
          prop="nature"
          style="margin-left: 500px; margin-top: -65px"
        >
          <el-input :disabled="true" v-model="list.nature"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-input :disabled="true" v-model="list.birth"> </el-input>
        </el-form-item>
        <el-form-item
          label="身份证号码"
          prop="idCard"
          style="margin-left: 500px; margin-top: -65px"
        >
          <el-input :disabled="true" v-model="list.idCard"></el-input>
        </el-form-item>
        <el-form-item label="文化程度" prop="education">
          <el-input v-model="list.education"> </el-input>
        </el-form-item>
        <el-form-item
          label="籍贯"
          prop="hometown"
          style="margin-left: 500px; margin-top: -65px"
        >
          <el-input :disabled="true" v-model="list.hometown"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobilePhone">
          <el-input v-model="list.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item
          label="所属院校"
          prop="college"
          style="margin-left: 500px; margin-top: -65px"
        >
          <el-input v-model="list.college"></el-input>
        </el-form-item>
        <el-form-item label="现住址" prop="address">
          <el-input v-model="list.address"></el-input>
        </el-form-item>
        <el-form-item
          label="电子邮箱"
          prop="email"
          style="margin-left: 500px; margin-top: -65px"
        >
          <el-input v-model="list.email"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button style="margin-left: 30px" @click="editUser()">修改</el-button>
    </div>
  </div>
</template>

<script>
import { selectByName, editUser, selectPhoto } from "../../../request/api";
import Cookie from "js-cookie";
export default {
  inject: ["reload"],
  name: "editUserInfo",
  components: {},
  data() {
    return {
      list: {
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
       
      },
       bas: "",
     
    };
  },
  computed: {
    showUsername() {
      return Cookie.get("username");
    },
  },
  mounted() {
    this.selectByName();
    this.selectPhoto();
  },
  methods: {
    selectByName() {
      selectByName({
        username: Cookie.get("username"),
      })
        .then((res) => {
          this.list = res.data[0];
          console.log(res.data[0]);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    editUser() {
      editUser(this.list)
        .then((res) => {
          this.$message("修改成功！！");
          if (this.list.username != Cookie.get("username")) {
            this.$router.push({ path: "/" });
          } else {
            this.reload();
          }
          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("修改失败！！");
          console.log(err);
        });
    },
    selectPhoto() {
      selectPhoto({
        username: Cookie.get("username"),
      })
        .then((res) => {
          console.log(res.message);
          this.bas = res.message;
          console.log(this.list.bas);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
<style  scoped>
.tx {
  width: 100px;
  height: 100px;
  margin-left: 700px;
  margin-top: -120px;
}
.el-input {
  width: 300px;
  font-size: 18px !important;
  font-family: cursive !important;
}
.bt {
  width: 60px;
  margin-left: 730px;
  margin-top: 20px;
}
</style>