<template>
  <div class="nowpowerpriceshow" :data="date">
    <div style="width:100%;height: auto" :data="time">
        <Row :data="site">
          <Col span="4" style="width:205px;margin-right:25px;margin-top: 20px;margin-left: 2px" :data="cardNowData">
          <Card class="card" :data="clickSearch">
            <p slot="title" style="font-size:12px">价格(RMB)</p>
            <div style="height:40px;line-height:40px">
              <p style="float:left">预测</p>
              <p class="psize" style="float:right;color:#000;font-size:16px">{{cardNowData.forecastPrice}}</p>
            </div>
            <div style="height:40px;line-height:40px">
              <p style="float:left">实际</p>
              <p class="psize" style="float:right;color:#000;font-size:16px">{{cardNowData.averagePrice}}</p>
            </div>
          </Card>
          </Col>
          <Col span="4"  style="width:205px;margin-top: 20px;">
          <Card style="height:165px">
            <p slot="title" style="font-size:12px">误差率</p>
            <div style="height:40px;line-height:40px;margin-top:20px">
              <h1 style="text-align:center">{{cardNowData.errorRate}}%</h1>
            </div>
          </Card>
          </Col>
        </Row>
      <div style="min-height: 10px;width:100%;height: 800px;float: right;padding-top: 20px" :data="customNeedPriceData">
        <div id="needPrice"  :style="{width: '85%', height: '550px'}" style="margin-top: 10px;"></div>
      </div>
    </div>
    <Modal v-model="isShowLine"  v-show="!this.$store.state.isShow" footer-hide width="800">
      <Tabs v-model="popupTabName" @on-click='tabsClick'>
        <TabPane label="太阳能" name="name1"><div id="needPriceDetail1" :style="{width: '100%', height: '500px'}"></div></TabPane>
        <TabPane label="储能(太阳能)" name="name2"><div id="needPriceDetail2" :style="{width: '100%', height: '500px'}"></div></TabPane>
        <TabPane label="电网" name="name3"><div id="needPriceDetail3" :style="{width: '100%', height: '500px'}"></div></TabPane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: 'NowPowerPriceShow',
        props: {
          date: {
            type: '',
          },
          site: {
            type: '',
          },
          time: {
            type: Array,
            default: [],
          },
          clickSearch: {
            type: Boolean,
            default: false,
          }
        },
        data: function () {
          return {
            popupTabName:'name1',
            isShowLine: false,
            startTime: '',
            endTime: '',
            xAxisLine:[],
            yAxisLine:[],
            sunNeedPriceDetailData:[],
            cardNowUrl:'/card/hourlyDetails/price',
            customNowUrl:'/hourlyDetails/bar',
            solarChartNowUrl:'/chartLine/solar/now',
            storeChartNowUrl:'/chartLine/store/now',
            powerGridChartNowUrl:'/chartLine/powerGrid/now',
            cardNowData:{},
            customNeedPriceData:[],
            needPriceDetailData:[],
          }
        },
      beforeUpdate: function () {
        if (this.clickSearch) {
          this.$emit('changeClick3');
          this.getCardNowData();

        }
      },
      mounted() {
          this.getCardNowData();
      },
      methods: {
        getCardNowData: function () {
          for (var i = 0; i < this.time.length; i++) {
            if (i === 0) {
              this.startTime = this.date + ' ' +this.time[i];
            }
            if (i === 1) {
              this.endTime = this.date + ' ' +this.time[i];
            }
          }
          this.$ajax.get(this.cardNowUrl+ '/' + this.startTime + '/' + this.endTime )
            .then((response)=> {
              this.cardNowData = response.data;
              this.getCustomNowData();
            }).catch(function (error) {
            console.log(error);
          });
        },
        getCustomNowData: function () {
          this.$ajax.get(this.customNowUrl+ '/' + this.date)
            .then((response)=> {
              this.customNeedPriceData = response.data;
              if (this.customNeedPriceData.length !== 0) {
                this.drawCustom(this.customNeedPriceData);
              }else {
                this.$Modal.info({
                  title:'Notice',
                  content: ' 未查到当前小时明细的数据 !'
                });
              }
            }).catch(function (error) {
            console.log(error);
          });
        },
        tabsClick(name){
          if(name=='name1'){
            this.getSunData();
          }
          if(name=='name2'){
            this.getStorageData();
          }
          if(name=='name3'){
            this.getPowerGridData();
          }
        },
        getSunData() {
            this.isShowLine = true,
            this.sunNeedPriceDetailData = [],
            this.$ajax.get(this.solarChartNowUrl)
            .then((response)=> {
              this.sunNeedPriceDetailData = response.data;
              this.drawLine(this.sunNeedPriceDetailData,this.customNeedPriceData[0].text,this.customNeedPriceData[0].needPower);
            }).catch(function (error) {
            console.log(error);
          });
        },
        getStorageData() {
          this.isShowLine = true,
          this.sunNeedPriceDetailData = [],
            this.$ajax.get(this.storeChartNowUrl)
              .then((response)=> {
                this.sunNeedPriceDetailData = response.data;
                this.drawLine(this.sunNeedPriceDetailData,this.customNeedPriceData[1].text,this.customNeedPriceData[1].needPower);
              }).catch(function (error) {
              console.log(error);
            });
        },
        getPowerGridData() {
          this.isShowLine = true,
          this.sunNeedPriceDetailData = [],
            this.$ajax.get(this.powerGridChartNowUrl)
              .then((response)=> {
                this.sunNeedPriceDetailData = response.data;
                this.drawLine(this.sunNeedPriceDetailData,this.customNeedPriceData[2].text,this.customNeedPriceData[2].needPower);
              }).catch(function (error) {
              console.log(error);
            });
        },


          drawLine(data,type,value) {
            if(type ==='太阳能'){
              var eCharts = this.$echarts.init(document.getElementById('needPriceDetail1'));
            }
            if(type ==='储能'){
              var eCharts = this.$echarts.init(document.getElementById('needPriceDetail2'));
            }
            if(type ==='电网'){
              var eCharts = this.$echarts.init(document.getElementById('needPriceDetail3'));
            }
              this.xAxisLine = [];
              this.yAxisLine = [];
              let forecastLine = data[data.length-1].value;;
              for (var i = 0; i < data.length; i++) {
                this.xAxisLine.push(data[i].time);
                this.yAxisLine.push(data[i].value);
              }
            // 基于准备好的dom，初始化echarts实例
//            let eCharts = this.$echarts.init(document.getElementById('needPriceDetail'));
            var options = ({
              animation: true,
              title: {
                left: 'center',
                textStyle :{
                  fontSize:14,
                  color:'#6D6D6D',
                },
                text: this.date +'预测数据采集详情，'+' 预测'+forecastLine+'kWh，'+'误差率'+this.cardNowData.errorRate+'%'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '7%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  name: 'Time',
                  axisPointer: {
                    label: {
                      formatter: function (params) {
                        return '时间：' + params.value;
                      }
                    }
                  },
                  data: this.xAxisLine
                }
              ],
              yAxis: [
                {
                  name: 'kWh',
                  type: 'value',
                  splitLine: {
                    show: true,
                    lineStyle: {
                      type: 'solid',
                      color: ['#eee'],
                    }
                  },
                },
              ],
              series: [
                {
                  name: 'Value',
                  type: 'line',
                  color: ['orange'],
                  data: this.yAxisLine,
                  markLine: {
                    symbol: 'none',
                    lineStyle: {
                      type: 'dotted',
                      color: ['#6D6D6D'],
                    },
                    label: {
                      position: 'middle',
                      formatter: '预测值: {c}kWh',
                      fontSize:16
                    },
                    data: [
                      {yAxis: forecastLine, name: '预测值'}
                    ]
                  }
                },
              ]
            });
            eCharts.setOption(options);
          },
           drawCustom(resultData) {
             var colorList = ['#EFA900', '#7FB800', '#F6511D'];
             var data = [];
             var start = 0;
             var end = 0;
             // [0, 50, 10,50, '太阳能'], [50, 60,20, 10, '储能(太阳能)'], [60, 80, 32,20, '电网']
             for (var i = 0; i < resultData.length; i++) {
               var result = [];
               if (i === 0) {
                 start = 0;
                 end = resultData[0].needPower;
               } else {
                 start = end
                 end += resultData[i].needPower
               }
               result.push(start);
               result.push(end);
               result.push(resultData[i].powerPrice);
               result.push(resultData[i].needPower);
               result.push(resultData[i].text);
               data.push(result);
             }
             var xMax = data[data.length-1][1];
             var yMax = data[data.length-1][2];
             data = this.$echarts.util.map(data, function (item, index) {
               return {
                 value: item,
                 itemStyle: {
                   normal: {
                     color: colorList[index],
                   }
                 },
                 label: {
                   normal: {
                     show: true,
                     position: 'inside',
                     color: '#fff' ,
                     formatter: item[4]

                   }
                 },
               };
             });
             // 基于准备好的dom，初始化echarts实例
             let eCharts = this.$echarts.init(document.getElementById('needPrice'));
             var options = ({
               animation: true,
               tooltip: {
                 show: true,
                 trigger: 'item'
               },
               grid: {
                 left: '4%',
                 right: '8%',
                 bottom: '3%',
                 containLabel: true
               },
               xAxis: {
                 name: '需求(kWh)',
                 scale: true,
                 nameLocation: 'end',
                 nameGap: 15,
                 max: function(value) {
                   return value.max  + Math.round( value.max / 10);
                 },
                 splitLine: {
                   show: false,
                 },
//                 axisLabel: {
//                   formatter: '{value} kWh'
//                 }
               },
               yAxis: {
                 name: '价格(RMB/kWh)',
                 nameLocation: 'end',
                 max: function(value) {
                   return Math.round(value.max + value.max / 10);
                 },
                 splitLine: {
                   show: false,
                 },
                 nameGap: 15,
               },
               series: [
                 {
                   type: 'custom',
                   renderItem: renderItem,
                   markLine: {
                     symbol: 'none',
                     lineStyle: {
                       // solid 实线
                       // dashed 破折虚线
                       // dotted 星星虚线
                       type: 'dashed',
                       color: ['#000000 '],
                     },
                     label: {
                       position: 'end',
                       formatter: '预测值: {c} ',
                     },
                     data: [
                       {xAxis: xMax, name: '预测值'},
                       {yAxis: yMax, name: '预测值'},
                     ]
                   },
                   dimensions: ['需求开始值','需求结束值', '价格','需求'],
                   encode: {
                     x: [0,1,2],
                     y: 2,
                     tooltip: [3,2],
                     itemName: 4
                   },
                   data: data
                 }
               ]
             });
             eCharts.setOption(options);
             //柱状图点击出现模态框
             eCharts.on('click',(params)=> {
               if(params.name=='太阳能'){
                 this.popupTabName='name1';
                 this.$options.methods.getSunData.bind(this)();
               }
               if(params.name=='储能'){
                 this.popupTabName='name2';
                 this.$options.methods.getStorageData.bind(this)();
               }
               if(params.name=='电网'){
                 this.popupTabName='name3';
                 this.$options.methods.getPowerGridData.bind(this)();
               }

             });
           },
         },
    }
    function renderItem(params, api) {
      var yValue = api.value(2);
      var start = api.coord([api.value(0), yValue]);
      var size = api.size([api.value(1) - api.value(0), yValue]);
      var style = api.style();

      return {
        type: 'rect',
        shape: {
          x: start[0],
          y: start[1],
          width: size[0],
          height: size[1]
        },
        style: style
      };
    }
</script>

<style lang="stylus" scoped>
.ivu-layout-header,
.ivu-menu
  background #22262f
.layout
  // border 1px solid #d7dde4
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
