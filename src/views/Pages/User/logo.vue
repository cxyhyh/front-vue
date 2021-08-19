<template>
  <div>
    <div class="block">
      <el-carousel :interval="2000" class="car" :autoplay="true" arrow="never">
        <el-carousel-item v-for="(item, index) in imgList" :key="index">
          <img :src="item" class="img"> 
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import img1 from '../../../assets/zp1.png'
import img2 from '../../../assets/zp2.png'
import img3 from '../../../assets/zp4.png'
import img4 from '../../../assets/zp1.jpg'
export default {
  data(){
    return{
      imgList: [
        img1,
        img2,
        img3,
        img4,
      
      ],
      
    }
  }
};
</script>

<style scoped>
.block{
    width: calc(100% + 10px);
    /* FONT-WEIGHT: 100; */
    margin-left: -13px;
    margin-top: -20px;
    
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  height: 558px;
}

.el-carousel__item:nth-child(2n + 1) {
  height: 558px;
  background-color: #d3dce6;
}
.car {
  height: 558px;
  width: 1298px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
}
.img{
  height: 600px;
  width: 1312px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
}
</style>