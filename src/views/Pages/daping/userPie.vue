<template>
  <div>
    <div>
      <div style="width: 420x; height: 250px" id="echartss"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getRoleTypeNum } from "../../../request/api";
export default {
  name: "userPie",
  mounted: function () {
    this.getRoleTypeNum();
  },
  data() {
    return {
      name: [],
    };
  },
  methods: {
    getRoleTypeNum() {
      getRoleTypeNum({})
        .then((res) => {
          this.name = res.data;
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById("echartss"));
          // 绘制图表，this.echarts1_option是数据
          let echarts1_option = {
            color: ["#00aeff", "yellow", "#ff7d27"],
            title: {
              text: "用户类型统计可视化",
              left: "center",
              top: 1,
              textStyle: {
                color: "yellow",
                fontStyle: "italic", //标题字体
              },
            },
            tooltip: {
              trigger: "item",
            },
            legend: {
              orient: "horizontal",
              bottom: 0,
              textStyle: {
                color: "white",
              },
            },
            series: [
              {
                name: "用户类型",
                type: "pie",
                radius: "50%",
                data: this.name,
              },
            ],
          };
          myChart.setOption(echarts1_option);
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