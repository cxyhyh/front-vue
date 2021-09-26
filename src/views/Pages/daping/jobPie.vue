<template>
  <div>
    <div id="main" style="width: 420px; height: 300px"></div>
  </div>
</template>

<script>
import { getJobTypeNum } from "../../../request/api";
import echarts from "echarts";
export default {
  name: "jobPie",
  data() {
    return {
      list: [],
    };
  },
  mounted: function () {
      this.getJobTypeNum();
  },
  methods: {
    getJobTypeNum() {
      getJobTypeNum({})
      .then((res) => {
          this.list = res.data;
      // 绘制图表
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
      title: {
          text: "职位类型统计可视化",
          left: "center",
          x: 'center',
        y: '59%',
        itemGap: 20,
          top: 1,
          textStyle: {
            color: "yellow",
            fontStyle: "italic", //标题字体
          },
        },

        tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      name: '职位类型',
      type: 'pie',
      radius: [20,100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data:this.list
    }
  ]
};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
       })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
</style>

