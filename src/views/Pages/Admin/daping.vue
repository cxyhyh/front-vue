<template>
  <div class="all">
    <!-- <div class="userPie">
      <UserPie></UserPie>
    </div>
    <div class="jobPie">
       <JobPie></JobPie>
    </div> -->
    <div class="companyPie">
      <CompanyPie></CompanyPie>
    </div>
    <div class="map">
      <Map></Map>
    </div>
  </div>
</template>

<script>
// import JobPie from '../echarts/jobPie.vue'
// import UserPie from '../echarts/userPie.vue'
import CompanyPie from '../daping/companyPie.vue'
import Map from '../daping/map.vue'
export default {
  components: { 
        // UserPie,
        // JobPie,
        CompanyPie,
        Map
        },

}
</script>

<style  scoped>
.all{
    background-color: rgba(4, 45, 68, 0.842);
    height: 626px;
  width: 1298px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;

}
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
  width: 200px;
  border: solid red;
}
.map{
  width: 600px;
  height: 626px;
  border: solid red;
  margin-left: 380px;
  margin-top: -300px;
}
</style>