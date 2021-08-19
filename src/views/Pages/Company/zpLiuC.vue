<template>
  <div class="all">
    <div>
      <span class="tip">校园网上招聘流程简介</span>
    </div>
    <div class="lc">
      <el-steps active="5" simple>
        <el-step title="简历投递" icon="el-icon-upload"></el-step>
        <div>
          <span class="spa"
            >完善个人简历，并申请自己符合自己意向的职位，等待HR通知</span
          >
        </div>

        <el-step title="简历筛选" icon="el-icon-s-custom"></el-step>
        <div>
          <span class="spa"
            >HR接收到来自不同地方的求职者发送的简历，根据企业需求进行简历的筛选</span
          >
        </div>
        <el-step title="笔试" icon="el-icon-edit"></el-step>
        <div>
          <span class="spa"
            >HR简历筛选通过后，会通知求职者来进行线上或线下的笔试</span
          >
        </div>
        <el-step title="面试" icon="el-icon-phone-outline"></el-step>
        <div>
          <span class="spa"
            >笔试通过之后，会进入面试环节，可进行线上视频面试或线下面试</span
          >
        </div>
        <el-step title="签约" icon="el-icon-success"></el-step>
        <div>
          <span class="spa"
            >面试通过之后，会有人事通知面试通过这上岗时间，以及一系列手续的办理</span
          >
        </div>
      </el-steps>
    </div>
  </div>
   
</template>

<script>
export default {  
  name: "zpLiuC",
  components: {},
 
  data() {
    return {
      
    };
  },

  mounted() {
    
  },
  
  methods: {
    
  },
};
</script>

<style scoped>
.spa {
  font-size: 15px;
  color: rgb(97, 97, 246);
}
.tip {
  font-size: 27px;
  color: gold;
}
.lc {
  margin-top: 100px;
}
</style>