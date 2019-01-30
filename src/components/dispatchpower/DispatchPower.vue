<template>

    <div class="dispatchpower" style="height:700px;position:relative" :data="date">
      <Row :data="cardData" style="padding-top: 20px">
        <Col span="4"  style="width:320px;margin-right:23px;" :data="site">
        <Card style="height:248px;position:relative" :data="clickSearch">
          <p slot="title" style="font-size:12px">用电量(kWh)</p>
          <div style="height:40px;line-height:40px;margin-top:20px;position:absolute;top:40%;left:35%">
            <h1 style="text-align:center">{{cardData.usePower}}K</h1>
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
            <span>太阳能:{{cardData.solar}}</span>
            <span style="display: inline-block;width:15px;height:10px;backgroundColor:#7FB800;margin-left: 10px;"></span>
            <span>电池:{{cardData.battery}}</span>
            <span style="display: inline-block;width:15px;height:10px;backgroundColor:#F6511D;margin-left: 10px;"></span>
            <span>电网:{{cardData.powerGrid}}K</span>
          </div>
        </Card>
        </Col>
      </Row>
      <!-- 柱状图 -->
      <draw-bar :barData="chartBarData" v-if="showBar" ></draw-bar>
      <!-- 折线图 -->
      <draw-line :lineData="chartLineData"  v-if="!showBar"></draw-line>
      <div @click="clickSwitch" v-show="isShowSwitch"  style="position:absolute;top:43%;right:12%;font-size:20px;cursor:pointer;">
        <Icon type="md-swap" />
      </div>
    </div>
</template>

<script>
  import drawLine from '../drawline/drawLine.vue';
  import drawBar from '../drawbar/drawBar.vue';
    export default {
        name: 'DispatchPower',
        components:{
          drawLine:drawLine,
          drawBar:drawBar
        },
        data() {
          return {
//            data: [],
            xAixsData: [],
            UsePowerData: [],
            SendPowerData:[],
            SolarEnergyData: [],
            BatteryData: [],
            PowerGridData: [],
            isShowSwitch:false,
            showBar:true,
            cardDispatchUrl:'/card/beforeDay',
            cardData: {},
            chartBarUrl: '/chartBar/beforeDay',
            chartBarData: [],
            chartLineUrl: '/chartLine/beforeDay',
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
      beforeUpdate() {
        if (this.clickSearch) {
          this.$emit('changeClick1');
          this.getCardData();
        }
      },
      created() {
        this.getCardData();
      },
      methods: {
        getChartLine: function() {
          this.$ajax.get(this.chartLineUrl+ '/' + this.date)
            .then((response)=> {
              this.chartLineData = response.data;
              this.isShowSwitch=true;
              if (this.chartLineData.length !==0 && this.chartBarData.length !== 0 ) {
                this.drawPie(this.cardData);
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
        getCardData: function () {
          this.$ajax.get(this.cardDispatchUrl+ '/' + this.date)
            .then((response)=> {
              this.cardData = response.data;
              this.getChartBar();
            }).catch(function (error) {
            console.log(error);
          });
        },
        clickSwitch(){
          this.showBar = !this.showBar;
        },
        drawPie(data) {
          // 基于准备好的dom，初始化echarts实例
          let eCharts = this.$echarts.init(document.getElementById('powerPie'));
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

      }
    }
</script>

<style lang="stylus" scoped>
.ivu-layout-header,
.ivu-menu
  background #22262f
.layout
  border 1px solid #d7dde4
  // background #51e39a
  position relative
  border-radius 4px
  overflow hidden


.layout-logo
  width 100px
  height 40px
  // background #fff
  border-radius 3px
  float left
  position relative
  top 12px
  left 20px
  img
    // background #fff
    width 100px
    height 30px

.layout-footer-center
  text-align center

</style>

