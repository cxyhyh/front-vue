<template>
  <div>
    <div class="userPie">
      <UserPie></UserPie>
    </div>
    <div class="jobPie">
       <JobPie></JobPie>
    </div>
    <div class="companyPie">
      <CompanyPie></CompanyPie>
    </div>
    <div class="map">
      <Map></Map>
    </div>
  </div>
</template>

<script>
import JobPie from '../echarts/jobPie.vue'
import UserPie from '../echarts/userPie.vue'
import CompanyPie from '../echarts/companyPie.vue'
import Map from '../echarts/map.vue'
export default {
  components: { 
        UserPie,
        JobPie,
        CompanyPie,
        Map
        },

}
</script>

<style  scoped>
.userPie{
  width: 40%;
  height: 500px;
  margin-left: 40px;
}
.jobPie{
  width: 50%;
  height: 500px;
  margin-left: 500px;
  margin-top: -503px;
}

.companyPie{
  width: 40%;
  height: 500px;
  margin-left: 40px;
  margin-top: 30px;
}
.map{
  width: 50%;
  height: 500px;
  margin-left: 500px;
  margin-top: -500px;
}
</style>