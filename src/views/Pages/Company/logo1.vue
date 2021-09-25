<template>
  <div>
    <div class="block">
      <el-carousel  :interval="2000" class="car" :autoplay="true" arrow="never">
        <el-carousel-item v-for="(item, index) in imgList" :key="index">
          <img :src="item" class="img"> 
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import img1 from '../../../assets/sy6.png'
import img2 from '../../../assets/sy7.png'
import img3 from '../../../assets/sy4.png'
import img4 from '../../../assets/sy3.png'
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
 height: 910px;
}

.el-carousel__item:nth-child(2n + 1) {
  height: 910px;
  background-color: #d3dce6;
}
.car {
height: 910px;
  width: 1925px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
}
.img{
 height: 910px;
  width: 1925px;
  margin-left: -8px;
  margin-top: -8px;
  margin-bottom: -18px;
}
</style>