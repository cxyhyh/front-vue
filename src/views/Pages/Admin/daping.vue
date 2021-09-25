<template>
  <div class="contains">
    <div class="header">
      <dv-border-box-1>
        <div class="title">
          <router-link class="tt" to="/home">校园招聘管理系统</router-link>
        </div>
      </dv-border-box-1>
    </div>

    <div class="container">
      <div class="left">
        <div class="leftup">
          <dv-border-box-1> <CompanyPie></CompanyPie></dv-border-box-1>
        </div>
        <div class="leftmod"><dv-border-box-1></dv-border-box-1></div>
        <div class="leftdown">
          <dv-border-box-1><JobPie></JobPie></dv-border-box-1>
        </div>
      </div>
      <div class="moddle">
        <div class="modleft"><dv-border-box-1></dv-border-box-1></div>
        <div class="moveMapDiv">
          <dv-border-box-1><Map></Map></dv-border-box-1>
        </div>
        <div class="modright"><dv-border-box-1></dv-border-box-1></div>
      </div>

      <div class="right">
        <div class="rightup"><dv-border-box-1><Application></Application></dv-border-box-1></div>
        <div class="rightmod"><dv-border-box-1></dv-border-box-1></div>
        <div class="rightdown"><dv-border-box-1></dv-border-box-1></div>
      </div>
    </div>
  </div>
</template>

<script>
import JobPie from "../daping/jobPie.vue";
import CompanyPie from "../daping/companyPie.vue";
import Map from "../daping/map.vue";
import Application from '../daping/application.vue';
export default {
  components: {
    //UserPie,
    JobPie,
    CompanyPie,
    Map,
    Application,
  },
};
</script>

<style  scoped>
.tt {
  text-decoration: none;
  color: white;
}
.contains {
  background: #000a2d;
  height: 975px;
  width: 1928px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
}
.header {
  height: 80px;
  background: url("../../../assets/headerbg.png") no-repeat center;
}
.header .title {
  display: flex;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 2rem;
  align-items: center;
  height: 100%;
}
.leftup {
  width: 420px;
  height: 300px;
}
.leftmod {
  width: 420px;
  height: 300px;
}
.leftdown {
  width: 420px;
  height: 300px;
}
.modleft {
  width: 500px;
   height: 300px;
    margin-left: 420px;
    margin-top: -900px;
}
.moveMapDiv {
  width: 1000px;
  height: 600px;
  margin-left: 420px;
}
.modright {
   width: 500px;
   height: 300px;
   margin-left: 920px;
   margin-top: -900px;
}
.rightup {
   width: 500px;
  height: 300px;
  margin-left: 1420px;
  margin-top: -300px;
}
.rightmod {
   width: 500px;
  height: 300px;
   margin-left: 1420px;
}
.rightdown {
   width: 500px;
  height: 300px;
   margin-left: 1420px;
}
</style>