<template>
  <div>
    <div>
      <div style="width: 420px; height: 300px" id="echarts1"></div>
    </div>
  </div>
</template>

<script>
import { getCompanyTypeNum } from "../../../request/api";
import echarts from "echarts";
export default {
  name: "companyPie",
  data() {
    return {
      company: [],
    };
  },
  mounted: function () {
    this.getCompanyTypeNum();
  },
  methods: {
    getCompanyTypeNum() {
      getCompanyTypeNum({})
        .then((res) => {
          this.company = res.data;
          // 绘制图表
          var myChart = echarts.init(document.getElementById("echarts1"));
          // 指定图表的配置项和数据
          var option = {
            color: [
              "#e4590d",
              "#ffb400",
              "#5ad01c",
              "#00aeff",
              "yellow",
              "#ff7d27",
              "#228b22",
              "#57a2fd",
              "#47b73d",
              "#fcc36e",
              "purple",
              "orange",
              "gold",
              "red",
            ],

            title: {
              text: "企业类型统计可视化",
              left: "center",
              top: 20,
              textStyle: {
                color: "white",
                fontStyle: "italic", //标题字体
              },
            },
            //鼠标划过时饼状图上显示的数据
            tooltip: {
              trigger: "item",
              formatter: "{a}<br/>{b}:{c} ({d}%)",
              padding: 10,
            },
            //图例
            legend: {
              orient: "horizontal",
              bottom: -5,
              textStyle: {
                color: "white",
              },
            },
            // 饼图数据
            series: {
              name: "企业类型信息",
              type: "pie", //echarts图的类型   pie代表饼图
              // radius: "55%", //饼图中饼状部分的大小所占整个父元素的百分比
              center: ["50%", "50%"], //整个饼图在整个父元素中的位置
              roseType: "radius",
              radius: ["50%", "60%"],
              avoidLabelOverlap: true, //角度和半径展现百分比，'area'只用半径展现
              //饼图数据
              data: this.company,

              label: {
                //饼图图形的文本标签
                normal: {
                  //下同，normal指在普通情况下样式，而非高亮时样式
                  textStyle: {
                    color: "white",
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "#fff",
                  borderWidth: 3,
                },
                animationType: "scale", //初始动画效果，scale是缩放，expansion是展开
                animationEasing: "elasticOut", //初始动画缓动效果
                animationDelay: function () {
                  return Math.random() * 200;
                },
              },
            },
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

<style>
</style>