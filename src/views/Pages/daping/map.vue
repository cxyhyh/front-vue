<template>
  <div>
    <div>
      <div>
        <div style="width: 100%; height: 626px" id="china"></div>
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
              color: ['rgb(104, 235, 294)'],
            },
            series: [
              {
                name: "工作地点分布",
                type: "map",
                mapType: "china",
                coordinateSystem: "geo",
                roam: true,
                zoom: 1.3,
                 itemStyle: {
            normal: {
             borderColor: 'rgb(147, 235, 248)',
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: '#09132c' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#274d68'  // 100% 处的颜色
                }],
                globalCoord: true // 缺省为 false
                },
            },
            emphasis: {
              areaColor: 'rgb(46,229,206)',
              borderWidth: 0.1
            }
          },
                
                label: {
                  normal: {
                    show: true,
                     textStyle: {
                color: 'white'
              }
                  },
                  emphasis: {
                    show: true,
                     textStyle: {
                color: 'rgb(183,185,14)'
              }
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