<template>
  <div>
    <div>
      <div>
        <div style="width: 100%; height: 500px" id="china"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../../node_modules/echarts/map/js/china";
import echarts from "echarts";
import { getWorkPositionNum } from "../../../request/api";
export default {
  name: "map1",
  data() {
    return {
      workPosition: [],
    };
  },
  mounted: function () {
    this.getWorkPositionNum();
  },
  methods: {
    getWorkPositionNum() {
      getWorkPositionNum({})
        .then((res) => {
          this.workPosition = res.data;

          var myChart = echarts.init(document.getElementById("china"));
          window.onresize = myChart.resize;

          var option = {
            backgroundColor: "#45515a",
            title: {
              text: "职位工作地点主要分布地区可视化",
              left: "center",
              top: 20,
              textStyle: {
                color: "yellow",
                fontStyle: "italic", //标题字体
              },
            },
            tooltip: {
              trigger: "item", //以具体项目触发弹窗
              formatter: "{a} <br/>{b} : {c}份",
            },
            dataRange: {
              show: false,
              min: 0,
              max: 1000,
              text: ["High", "Low"],
              realtime: true,
              calculable: true,
              color: ["orangered"],
            },
            geo: {
              // 这个是重点配置区
              map: "china", // 表示中国地图
              roam: true,
              label: {
                normal: {
                  show: true, // 是否显示对应地名
                  textStyle: {
                    color: "rgba(0,0,0,0.4)",
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                emphasis: {
                  areaColor: null,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
            series: [
              {
                name: "工作地点分布",
                type: "map",
                mapType: "china",
                coordinateSystem: "geo",
                roam: false,
                label: {
                  normal: {
                    show: true,
                  },
                  emphasis: {
                    show: true,
                  },
                },
                data: this.workPosition,
              },
            ],
          };
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