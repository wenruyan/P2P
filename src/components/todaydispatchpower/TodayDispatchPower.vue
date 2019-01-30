<template>
  <div class="todaydispatchpower" style="height:700px;position:relative" :data="date">
    <Row :data="cardDispatchData" style="padding-top: 20px" >
      <Col span="4"  style="width:320px;margin-right:23px;" :data="site">
      <Card style="height:248px;position:relative" :data="clickSearch">
        <p slot="title" style="font-size:12px">用电量(kWh)</p>
        <div style="height:40px;line-height:40px;margin-top:20px;position:absolute;top:40%;left:35%">
          <h1 style="text-align:center">{{cardDispatchData.usePower}}K</h1>
        </div>
      </Card>
      </Col>
      <Col span="4"  style="width:350px">
      <Card style="height:248px;padding:0px">
        <p slot="title" style="font-size:12px">发电量(kWh)</p>
        <!-- 饼状图 -->
        <div style="height: 120px;width:350px;position:relative;left:-16px" id="powerPie"></div>
        <div class="modal" :style="{width: '350px', height: '62px'}" style="border-top:1px solid #eee;position:relative;left:-16px">
          <p style="line-height: 30px;margin-left: 10px;">园区</p>
          <span style="display: inline-block;width:15px;height:10px;backgroundColor:#EFA900;margin-left: 10px;"></span>
          <span>太阳能:{{cardDispatchData.solar}}</span>
          <span style="display: inline-block;width:15px;height:10px;backgroundColor:#7FB800;margin-left: 10px;"></span>
          <span>电池:{{cardDispatchData.battery}}</span>
          <span style="display: inline-block;width:15px;height:10px;backgroundColor:#F6511D;margin-left: 10px;"></span>
          <span>电网:{{cardDispatchData.powerGrid}}K</span>
        </div>
      </Card>
      </Col>
    </Row>
    <!-- 柱状图 -->
    <draw-bar :barData="chartBarData" v-if="showBar"></draw-bar>
    <!-- 折线图 -->
    <draw-line-four :lineData="chartLineData" v-if="!showBar"></draw-line-four>
    <div @click="clickSwitch"  v-show="isShowSwitch"  style="position:absolute;top:43%;right:12%;font-size:20px;cursor:pointer;">
      <Icon type="md-swap" />
    </div>
  </div>
</template>

<script>
  import drawBar from '../drawbar/drawBar.vue';
  import drawLinefour from '../drawlinefour/drawLineFour.vue';
    export default {
      name: 'TodayDispatchPower',
      components:{
        drawLineFour:drawLinefour,
        drawBar:drawBar
      },
      data() {
        return {
          xAixsData: [],
          UsePowerData: [],
          SendPowerData:[],
          SolarEnergyData: [],
          BatteryData: [],
          PowerGridData: [],
          isShowSwitch:false,
          showBar:true,
          cardDispatchUrl:'/card/today',
          cardDispatchData: {},
          chartBarUrl: '/chartBar/today',
          chartBarData: [],
          chartLineUrl: '/chartLine/today',
          chartLineData: [],

        }
      },
      props: {
        date: {
          type: '',
        },
        site: {
          type: '',
        },
        clickSearch: {
          type: Boolean,
          default: false,
        }
      },
      created() {
        this.getCardDispatchData();
      },
      beforeUpdate() {
        if (this.clickSearch) {
          this.$emit('changeClick1');
          this.getChartBar();
        }
      },
      methods: {
        getChartLine: function() {
          this.$ajax.get(this.chartLineUrl+ '/' + this.date)
            .then((response)=> {
              this.chartLineData = response.data;
              this.isShowSwitch=true;
              if (this.chartLineData.length !==0 && this.chartBarData.length !== 0 ) {
                this.drawPie(this.cardDispatchData);
              }
            }).catch(function (error) {
            console.log(error);
          });
        },
        getChartBar: function () {
          this.$ajax.get(this.chartBarUrl+ '/' + this.date)
            .then((response)=> {
              this.chartBarData = response.data;
              this.isShowSwitch=true
              this.getChartLine();
            }).catch(function (error) {
            console.log(error);
          });
        },
        getCardDispatchData: function () {
          this.$ajax.get(this.cardDispatchUrl+ '/' + this.date)
            .then((response)=> {
              this.cardDispatchData = response.data;
              this.getChartBar();
            });
        },
        drawPie(data) {
          let result = [];
          for (let pro in data) {
            if (pro === 'solar') {
              result.push({value:data[pro], name:'太阳能'})
            }
            if (pro === 'battery') {
              result.push({value:Math.abs(data[pro]), name:'电池'})
            }
            if (pro === 'powerGrid') {
              result.push({value:data[pro], name:'电网'})
            }
          }
          // 基于准备好的dom，初始化echarts实例
          let eCharts = this.$echarts.init(document.getElementById('powerPie'));
          var options = {
            color:['#EFA900','#7FB800','#F6511D'],
            series: [
              {
                name:'',
                type:'pie',
                radius: ['50%', '70%'],
                center: ['50%','38%'],
                avoidLabelOverlap: false,
                hoverOffset:2,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '14',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:result
              }
            ]
          };
          eCharts.setOption(options);

        },
        clickSwitch() {
          this.showBar = !this.showBar;
        },
      }
    }
</script>

<style lang="stylus" scoped>

</style>
