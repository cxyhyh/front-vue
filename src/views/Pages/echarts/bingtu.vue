<template>
  <div>
    <div style="width: 40%; height: 500px" id="echartss"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getRoleTypeNum, } from "../../../request/api";
export default {
  name: "bingTu",
  components: {},
  data() {
    return {
        re:[],
      option: {
        //需要的话下面内容copy到主体代码块即可
        backgroundColor: "#45515a",
        //标题
        title: {
          text: "用户信息",
          subtext: "饼图示例",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
            fontStyle: "italic", //标题字体
          },
        },
        //数据
        series: [
          {
            name: "数据来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            // data: [  {name:"hhh",value:1},
            //          {name:"hhh",value:5},],
            data:[this.list],
            roseType: "radius", //角度和半径展现百分比，'area'只用半径展现
          },
        ],
        
      },
    };
  },

  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("echartss"));
    // 绘制图表，this.echarts1_option是数据
    myChart.setOption(this.option);
    this.getRoleTypeNum();
  },
  methods: {
    getRoleTypeNum() {
      getRoleTypeNum({})
        .then((res) => {
           this.list = res.data
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>