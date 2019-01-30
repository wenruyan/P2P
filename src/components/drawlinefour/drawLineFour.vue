<template>
     <div class="dispatchpower" style="height:700px;position:relative" :data="lineData">
      <div class="qwe"  >
        <div style="min-height: 10px;width:100%;height: 600px;float: right;padding-top: 40px">
              <div id="dispatchPowerEchartsLine"  :style="{width: '85%', height: '500px'}"></div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    lineData: {
      type: Array,
      default: [],
    }
  },
  beforeUpdate(){
    this.drawLine(this.lineData);
  },
  mounted() {
    this.drawLine(this.lineData);
  },
  methods: {
    drawLine(data) {
      var lineCharts = this.$echarts.init(document.getElementById('dispatchPowerEchartsLine'));
      let xAxisData = [];
      let yForecastUseData = [];
      let yForecastSendData = [];
      let yRealUseData = [];
      let yRealSendData = [];
      for (var i = 0; i < data.length; i++) {
        xAxisData.push(data[i].time);
        yForecastUseData.push(data[i].forecastUse);
        yForecastSendData.push(data[i].forecastSend);
        yRealUseData.push(data[i].realUse);
        yRealSendData.push(data[i].realSend);
      }
          var options = {
              tooltip: {
                  trigger: 'axis'
              },
              color: ['#6BE7CB','#2DC4F5','#6BE7CB','#2DC4F5'],
              legend: {
                  right:40,
                  orient:'horizontal',
                  itemWidth: 20,
                  itemHeight: 10,
                  itemGap: 15,
                  data:[
                      {name:'预测用电量',icon:'line'},
                      {name:'真实用电量',icon:'line'},
                      {name:'预测发电量',icon:'line'},
                      {name:'真实发电量',icon:'line'},
                      ],
              },
              grid: {
                  left: '3%',
                  right: '5%',
                  bottom: '3%',
                  containLabel: true
              },
            dataZoom: [
              {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'empty'
              },
              {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
              }
            ],
              xAxis: {
                  type: 'category',
                  name: 'Time',
                  boundaryGap: false,
                  nameLocation:'center',
                  nameGap:24,
                  data : xAxisData,
              },
              yAxis: {
                  name: 'kWh',
                  type: 'value'
              },
              series: [

                  {
                      name:'预测用电量',
                      type:'line',
                      data: yForecastUseData,
                      lineStyle: {
                        normal: {
                            width: 2,
                            type: 'dashed'
                        }
                    },
                    dashStyle: 'shortdot',

                  },
                {
                  name:'真实用电量',
                  type:'line',
                  data: yRealSendData,
                  dashStyle: 'shortdot',
                },
                  {
                      name:'预测发电量',
                      type:'line',

                      data:  yForecastSendData,
                      dashStyle: 'shortdot',
                      lineStyle: {
                        normal: {
                            width: 2,
                            type: 'dashed'
                        }
                    },
                  },
                  {
                      name:'真实发电量',
                      type:'line',
                      data: yRealUseData,
                      dashStyle: 'shortdot',
                  },

              ]
          };
          lineCharts.setOption(options);
          window.addEventListener("resize", () => { lineCharts.resize();});
    }
  }


}
</script>
<style>

</style>


