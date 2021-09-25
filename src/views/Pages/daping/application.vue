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
  title: {
    text: 'World Population'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
  },
  series: [
    {
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
};  
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>