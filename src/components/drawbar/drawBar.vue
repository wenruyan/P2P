<template>
    <div class="dispatchpower" style="height:700px;position:relative" :data="barData">
      <div class="qwe"  >
        <div style="min-height: 10px;width:100%;height: 600px;float: right;padding-top: 40px">
              <div id="dispatchPowerEcharts"  :style="{width: '85%', height: '500px'}"></div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    barData: {
      type: Array,
      default: [],
    }
  },
  beforeUpdate(){
          this.drawBar(this.barData);
      },
  mounted() {
    this.drawBar(this.barData);
  },
    methods: {
      drawBar(data) {
        var eCharts = this.$echarts.init(document.getElementById('dispatchPowerEcharts'));
        let xAxisData = [];
        let ySendPower = [];
        let yUsePower = [];
        let yPowerGridData = [];
        let yBattery = [];
        let ySunPower = [];
        for (var i = 0; i < data.length; i++) {
          xAxisData.push(data[i].time);
          ySendPower.push(data[i].sendPower);
          yUsePower.push(data[i].usepower);
          yPowerGridData.push(data[i].powergrid);
          yBattery.push(data[i].battery);
          ySunPower.push(data[i].sunpower);
        }
        var options = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: ['#67CDFF','#6BE7CB','#F5CB66','#B2D466','#FA9777'],
          legend: {
            right:40,
            data:['用电量','发电量','太阳能','电池','电网'],
            itemWidth: 20,
            itemHeight: 1,
            itemGap: 10,
          },
          grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              name: 'Time',
              type : 'category',
              data : xAxisData,
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return '时间：' + params.value;
                  }
                }
              },
              nameLocation:'center',
              nameGap:24,
            }
          ],
          yAxis : [
            {
              name: 'kWh',
              type : 'value'
            }
          ],
          series : [
            {
              name:'用电量',
              type: 'line',
              data: yUsePower,
            },
            {
              name:'发电量',
              type: 'line',
              data: ySendPower,
            },
            {
              name:'太阳能',
              type:'bar',
              stack: '发电量',
              data:ySunPower
            },
            {
              name:'电池',
              type:'bar',
              stack: '发电量',
              data:yBattery
            },
            {
              name:'电网',
              type:'bar',
              stack: '发电量',
              data:yPowerGridData
            }
          ]
        };

        eCharts.setOption(options);
      }
    }
}
</script>
