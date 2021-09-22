<template>
  <div>
    <div>
      <div style="width: 450x; height: 500px;" id="echartss" ></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getRoleTypeNum } from "../../../request/api";
export default {
  name:"userPie",
  mounted: function () {
    this.getRoleTypeNum();
  },
  data() {
    return {
        name:[],
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
        //需要的话下面内容copy到主体代码块即可
        backgroundColor: "#45515a",
         color: ['#ff7d27','#228b22','#57a2fd', '#47b73d', '#fcc36e', 'yellow','purple','orange','gold','red' ],
        //标题
        title: {
          text: "用户类型统计可视化",
          left: "center",
          x: 'center',
        y: '59%',
        itemGap: 20,
          top: 20,
          textStyle: {
            color: "yellow",
            fontStyle: "italic", //标题字体
          },
        },
        //弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: "item", //以具体项目触发弹窗
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        //图例，选择要显示的项目
        legend: {
          orient: "horizontal",
          bottom:10,
          textStyle: {
            color: "white",
          },
          //注意要和数据的name相对应
        },
        //工具箱
        toolbox: {
          show: true, //显示工具箱
          feature: {
            dataView: { show: true }, //以文字形式显示数据
            restore: { show: true }, //还原
            //dataZoom:{show:true}, //区域缩放
            saveAsImage: { show: true }, //保存图片
            //magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          },
        },
        //视觉映射组件，将数据映射到视觉元素上
        // visualMap: {
        //   show: false,
        //   min: 1,
        //   max: 20,
        //   realtime: true,
        //   dimension: 2, 
        //   inRange: {
        //     //选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
        //     color:"rgb(202, 44, 44)"
        //     // colorSaturation: [0, 1],
        //   },

        // },
        //数据
        series: [
          {
            name: "用户类型信息",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data:this.name.sort(function (a, b) { return a.value - b.value; }),
            roseType: "radius", //角度和半径展现百分比，'area'只用半径展现
            label: {
              //饼图图形的文本标签
              normal: {
                //下同，normal指在普通情况下样式，而非高亮时样式
                textStyle: {
                  color: "white",
                },
              },
            },
            labelLine: {
              //引导线样式
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                smooth: 0.2, //0-1，越大越平滑弯曲
                length: 10, //从块到文字的第一段长
                length2: 20, //拐弯到文字的段长
              },
            },
            itemStyle: {
              //图例样式
              normal: {                   
                // color: "purple",
                shadowBlur: 200, //阴影模糊程度
                shadowColor: "rgba(0, 0, 0, 0.5)", //阴影颜色，一般黑
              },
            },
            animationType: "scale", //初始动画效果，scale是缩放，expansion是展开
            animationEasing: "elasticOut", //初始动画缓动效果
            animationDelay: function () {
              return Math.random() * 200;
            },
          },
        ],
      }
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