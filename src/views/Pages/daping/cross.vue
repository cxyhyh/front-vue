<template>
  <div>
    <div>
      <div style="width: 400px; height: 300px" id="echarts"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "cross",
  data() {
    return {};
  },
  mounted: function () {
    this.getecharts();
  },
  methods: {
    getecharts() {
      var myChart = echarts.init(document.getElementById("echarts"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        // legend: {
        //   data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        // },
        grid: {
          left: "10%",
          right: "4%",
          top:"20%",
          bottom:"14%",
          containLabel: true,
        },
        xAxis: {
            axisLabel: {
          
            },
             axisLine: {
              lineStyle: {
                color: "#E5E9F2",
                width: 2
              },

            },
          type: "category",
          splitLine : {

                show:false,

            },
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
           splitLine : {

                show:false,
            },
             axisLine: {
              lineStyle: {
                color: "#E5E9F2",
                width: 2
              },

            },
          
        },
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>