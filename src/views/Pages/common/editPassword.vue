<template>
  <div class="xg">
    <div>
<el-form :model="list" label-width="100px">
        <el-form-item label="新密码" prop="password" style="margin-left:300px;">
        <el-input v-model="list.password"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="password" style="margin-left:300px;">
        <el-input v-model="list.password"></el-input>
      </el-form-item>
      </el-form>
    </div>
      <div>
        <el-button style="margin-left:520px" @click="update()">修改</el-button>
      </div>
  </div>
</template>

<script>
import {updatePassword} from '../../../request/api'
import Cookie from "js-cookie";
export default {
   name: "editPassword",
  components: {},
  data() {
    return {
      list: {
        password:""
      },
    };
  },
  computed: {
    showUsername() {
      return Cookie.get("username");
    },
  },
  methods:{
    update(){
      if(this.list.password == null || this.list.password == ""){
        this.$message.warning("密码不能为空！！");
      }
      else{
        this.updatePassword()
      }
    },
     updatePassword() {
      updatePassword({
         username: Cookie.get("username"),
         password: this.list.password,
      }
        )
        .then((res) => {
          this.$message("修改成功！！请重新登录");
           this.$router.push({ path: "/" });
          console.log(res.data);
        })
        .catch(function (err) {
          this.$message("修改失败！！");
          console.log(err);
        });
    },
  }

}
</script>

<style scoped>
.el-input{
  width: 300px;
}


</style>