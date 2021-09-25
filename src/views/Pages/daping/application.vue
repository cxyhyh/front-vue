<template>
  <div>
    <div>
      <div style="width: 450x; height: 250px" id="echarts"></div>
    </div>
  </div>
</template>

<script>
//import { getCompanyTypeNum } from "../../../request/api";
import echarts from "echarts";
export default {
  name: "application",
  data() {
    return {
      company: [],
    };
  },
  mounted: function () {
    this.getecharts();
  },
  methods: {
    getecharts() {
      // 绘制图表
      var myChart = echarts.init(document.getElementById("echarts"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Profit", "Expenses", "Income"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
          },
        ],
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        series: [
          {
            name: "Profit",
            type: "bar",
            label: {
              show: true,
              position: "inside",
            },
            emphasis: {
              focus: "series",
            },
            data: [200, 170, 240, 244, 200, 220, 210],
          },
          {
            name: "Income",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 302, 341, 374, 390, 450, 420],
          },
          {
            name: "Expenses",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              position: "left",
            },
            emphasis: {
              focus: "series",
            },
            data: [-120, -132, -101, -134, -190, -230, -210],
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