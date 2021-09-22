<template>
  <div>
    <div>
      <h1 class="img-tip">校园招聘管理系统</h1>
    </div>
    <div class="form">
      <div class="inputBox">
        <input type="text" name="" v-model="username" required="" />
        <label>用户名:</label>
      </div>
      <div class="inputBox">
        <input type="password" v-model="password" name="" required="" />
        <label>密码:</label>
      </div>
      <div class="inputBox">
        <input type="text" name="" v-model="yzmcode" required="" />
        <label>验证码:</label>
      </div>
      <div class="dl">
        <input type="submit" name="" value="登录" @click="login" />
      </div>
      <div class="zc">
        <router-link to="/register">
          <input type="button" name="" value="注册" />
        </router-link>
      </div>
      <div class="cz">
        <input type="button" name="" value="重置" @click="reset()"/>  
      </div>

      <div id="yzmtp" @click="refreshCode">
        <s-identify :identifyCode="identifyCode"></s-identify>
      </div>
    </div>
  </div>
</template>
<script>
import SIdentify from "../../components/identify";
import Cookie from 'js-cookie'
import { login, selectRoleTypeByName } from "../../request/api";

export default {
  inject:['reload'],
  name: "index",
  data() {
    return {
      username: "",
      password: "",
      identifyCode: "us6f",
      identifyCodes: "1234567890abcdefghigklmnopqretuvwxyz",
      yzmcode: "",
    };
  },
  components: {
    "s-identify": SIdentify,
  },

  mounted() {
    this.identifyCode = "";
    this.makeiCode(this.identifyCodes, 4);
    this.refreshCode();
  },
  methods: {
    reset(){
      this.username=null;
      this.password=null;
      this.yzmcode=null;
      this.refreshCode();

    },  
    login() {
      login({
        username: this.username,
        password: this.password,
        yzmcode: this.yzmcode,
      }).then((res) => {
        const code = res.code;
        if (code == 200) {
          if (this.yzmcode == "" || this.yzmcode == null) {
            this.$message("验证码不能为空，请输入验证码！！");
          } else if (this.identifyCode == this.yzmcode) {
            this.selectRoleTypeByName(this.username);
            Cookie.set('username', this.username);
            sessionStorage.setItem('token',this.username)
          } else {
            this.$message("验证码有误，请重新输入！！");
          }
        } else if (code == 400) {
          if (this.username == "" || this.username == null) {
            this.$message("用户名不能为空，请输入用户名！！");
          } else if (this.password == "" || this.password == null) {
            this.$message("密码不能为空，请输入密码！！");
          } else {
            this.$message("用户名或密码错误");
             this.refreshCode();
          }
        }

        console.log(res);
      });
    },
    selectRoleTypeByName() {
      selectRoleTypeByName({
        username: this.username,
      })
        .then((res) => {
          const code1 = res.code;
          
          if (code1 == 200) {
            const role = res.data.roleType;
            if (role == "普通用户") {
              this.$router.push({ path: "/userIndex/logo" });
            } else if (role == "管理员") {
              this.$router.push({ path: "/daping" });
            }else if (role == "公司用户") {
              this.$router.push({ path: "/companyIndex/logo1" });
            }
          }
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // 验证码处理
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeiCode(this.identifyCodes, 4);
    },
    makeiCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
  },
};
</script>
<style scoped>
.img-tip {
  text-align: center;
  color: white;
}
.form {
  position: absolute;
  top: 43%;
  left: 53%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background: rgba(205, 216, 205, 0);
  box-sizing: border-box;
  box-shadow: 0;
  border-radius: 10px; /*登录窗口边角圆滑*/
}
.inputBox input {
  width: 80%;
  padding: 10px 0;
  font-size: 17px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px; /*输入框设置*/
  border: none;
  border-bottom: 1px solid rgba(255, 254, 254, 0.945);
  outline: none;
  background: transparent;
}
.inputBox label {
  position: absolute;
  top: 10;
  left: 30px;
  padding: 10px 0;
  font-size: 17px;
  color: rgb(241, 243, 243);
  transition: 0.5s;
}
.inputBox input:focus ~ label,
.inputBox input:valid ~ label {
  left: -40px;
  color: rgb(241, 243, 243);
  font-size: 17px;
}

input[type="submit"] {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  background: #03a9f4;
  padding: 10px 132px;
  cursor: pointer;
  border-radius: 5px;
}
input[type="reset"],
input[type="button"] {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  background: #03a9f4;
  padding: 10px 50px;
  cursor: pointer;
  border-radius: 5px;
}
#yzmtp {
  margin-left: 178px;
  margin-top: -153px;
  border-radius: 10px;
}
.dl {
  width: 300px;
  margin-top: -5%;
}
.zc {
  margin-left: 0%;
  margin-top: 3%;
}
.cz {
  margin-left: 45.5%;
  margin-top: -10.5%;
}
</style>