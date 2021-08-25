<template>
  <div>
    <div>
      <div style="width: 40%; height: 500px" id="echartss"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getRoleTypeNum } from "../../../request/api";
export default {
  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("echartss"));
    // 绘制图表，this.echarts1_option是数据
    myChart.setOption(this.echarts1_option);
    this.getRoleTypeNum();
  },

  //在echarts_option中写东西就行了，官方文档直接下这里就可以自己玩了
  data() {
    return {
      list: [
          {
               name:[],
               value:[]

          }
      ],
      echarts1_option: {
        //需要的话下面内容copy到主体代码块即可
        backgroundColor: "#45515a",
        //标题
        title: {
          text: "流量来源",
          subtext: "饼图示例",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
            fontStyle: "italic", //标题字体
          },
        },
        //弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: "item", //以具体项目触发弹窗
          /*
    内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
    value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
    */
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        //图例，选择要显示的项目
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#c8c8d1",
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
        visualMap: {
          show: false,
          min: 10,
          max: 650,
          dimension: 0, //选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位
          // seriesIndex: 4, //选取数据集合中的哪个数组，如{一班}，{二班}，默认选取data中的所有数据集
          inRange: {
            //选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
            color: ["purple"],
            colorLightness: [0, 1],
            colorSaturation: [0, 1],
          },
        },
        //数据
        series: [
          {
            name: "用户信息",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
            ],
            roseType: "radius", //角度和半径展现百分比，'area'只用半径展现
            label: {
              //饼图图形的文本标签
              normal: {
                //下同，normal指在普通情况下样式，而非高亮时样式
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              },
            },
            labelLine: {
              //引导线样式
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                smooth: 0.5, //0-1，越大越平滑弯曲
                length: 10, //从块到文字的第一段长
                length2: 20, //拐弯到文字的段长
              },
            },
            itemStyle: {
              //图例样式
              normal: {
                color: "#97413c",
                shadowBlur: 50, //阴影模糊程度
                shadowColor: "rgba(0, 0, 0, 0.5)", //阴影颜色，一般黑
              },
            },

            animationType: "scale", //初始动画效果，scale是缩放，expansion是展开
            animationEasing: "elasticOut", //初始动画缓动效果
            animationDelay: function () {
              //数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200;
            },
          },
        ],
      },
    };
  },
  methods: {
    getRoleTypeNum() {
      getRoleTypeNum({})
        .then((res) => {
          
          this.re = JSON.stringify(res.data);
          for(var i = 0;i<res.data.length;i++){
              this.list.name = res.data[i].name;
              console.log(this.list.name);
              this.list.value = res.data[i].value;
              console.log(this.list.value);
        
          }
          console.log(this.re)
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