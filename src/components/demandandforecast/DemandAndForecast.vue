<template>
  <div class="demandAndForecast">
            <Card style="marginBottom: 30px;height: 250px">
              <div style="min-height: 10px;">
                <!--站点单选-->
                <Select class="ivu-select-selected-value" v-model="siteModel" clearable @on-change="selelectSite">
                  <Option v-for="item in siteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!--&lt;!&ndash; 站点选择 &ndash;&gt;-->
                <!--<div style="width:205px;height:32px;display:inline-block;margin-right: 20px;vertical-align: middle">-->
                  <!--<multiselect v-model="selectedCountries"-->
                               <!--id="a"-->
                               <!--label="name"-->
                               <!--@search-change="selectChange"-->
                               <!--track-by="code"-->
                               <!--placeholder="请选择站点"-->
                               <!--open-direction="below"-->
                               <!--selectLabel="√"-->
                               <!--deselectLabel="×"-->
                               <!--:options="countries"-->
                               <!--:multiple="true"-->
                               <!--:searchable="false"-->
                               <!--:internal-search="true"-->
                               <!--:clear-on-select="true"-->
                               <!--:close-on-select="false"-->
                               <!--:options-limit="300"-->
                               <!--:limit="1"-->
                               <!--:limit-text="limitText"-->
                               <!--:max-height="600"-->
                               <!--:show-no-results="false"-->
                               <!--:hide-selected="false">-->
                    <!--<template slot="clear" slot-scope="props">-->
                      <!--<div class="multiselect__clear" v-if="countries.length" @mousedown.prevent.stop="clearAll(props.search)"></div>-->
                    <!--</template>-->
                  <!--</multiselect>-->
                <!--</div>-->
                <!--日期选择器-->
                <!--默认一周时间预测-->
                <DatePicker :value="parentDate" type="daterange" format="yyyy-MM-dd" placeholder="请选择您要查询的日期" @on-change="DateChange"  style="width: 180px" :style="{marginBottom:'10px',marginRight: '20px',width: '205px'}"></DatePicker>
                <!--当前时间-->
                <DatePicker :value="currentTimeSelect" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="CurrentTimeChange" :time-picker-options="{steps: [1, 5, 10]}" placeholder="当前时间预测" :style="{marginBottom:'10px',marginRight: '20px',width: '205px'}"></DatePicker>
                <!--未来时间-->
                <DatePicker :value="forecastTimeSelect" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="ForecastTimeChange" :time-picker-options="{steps: [1, 30, 10]}" placeholder="未来时间预测" :style="{marginBottom:'10px',marginRight: '20px',width: '205px'}"></DatePicker>
                <Button type="primary" @click="searchData">搜索</Button>
              </div>
              <Row>
                <Col span="4" style="width:205px;margin-right:23px">
                <Card class="card">
                  <p slot="title" style="font-size:12px">用电总量(kWh)</p>
                  <div style="height:40px;line-height:40px">
                    <p style="float:left">预测</p>
                    <p class="psize" style="float:right;color:#000;font-size:16px">{{this.cardData.forecastTotal}}</p>
                  </div>
                  <div style="height:40px;line-height:40px">
                    <p style="float:left">实际</p>
                    <p class="psize" style="float:right;color:#000;font-size:16px">{{this.cardData.usePowerTotal}}</p>
                  </div>
                </Card>
                </Col>
                <Col span="4"  style="width:205px;margin-right:23px">
                <Card style="height:165px">
                  <p slot="title" style="font-size:12px">偏差额(kWh)</p>
                  <div style="height:40px;line-height:40px;margin-top:20px">
                    <h1 style="text-align:center">{{this.cardData.diff}}</h1>
                  </div>
                </Card>
                </Col>
                <Col span="4"  style="width:205px;margin-right:23px">
                <Card style="height:165px;">
                  <p slot="title" style="font-size:12px;">MAPE(HH)(%)</p>
                  <div style="height:40px;line-height:40px;margin-top:20px">
                    <h1 style="text-align:center">{{this.cardData.mape}}%</h1>
                  </div>
                </Card>
                </Col>
              </Row>
            </Card>
        <Card style="height: 400px;position:relative">
          <div style="min-height: 10px;width:100%;height: 500px;float: right;margin-top: 20px;">
            <div id="demandForecastData"  :style="{width: '95%', height: '300px'}"></div>
          </div>
          <div @click="downLoad" v-show="isShowExport" style="position:absolute;top:7%;right:12%;font-size:20px;cursor:pointer">
            <Icon type="md-download" />
          </div>
        </Card>
    </div>
</template>

<script>
  import Multiselect from 'vue-multiselect/src/index.js'
    export default {
        name: 'DemandAndForecast',
        components: {Multiselect},
        data: function () {
          return {
            // 下载icon
            isShowExport:false,
            // 单选站点
            siteList: [],
            siteModel: '',
            sitesUrl: '/getSites',
            // 多选站点
            selectedCountries: [],
            countries: [
              {
                "name": "站点 1",
                "code": "站点 1"
              },
              {
                "name": "站点 2",
                "code": "站点 2"
              },
              {
                "name": "站点 3",
                "code": "站点 3"
              },
              {
                "name": "站点 4",
                "code": "站点 4"
              },
              {
                "name": "站点 5",
                "code": "站点 5"
              },
              {
                "name": "站点 6",
                "code": "站点 6"
              },
            ],
            theme2:'dark',
            startTime: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            parentDate: [],
            currentTimeSelect: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
            forecastTimeSelect: '',
            xAxisLine:[],
            yAxisLineReal:[],
            yAxisLineForecast:[],
            yAxisLineForecastFuture:[],
            yAxisLineMAPE:[],
            yAxisLineDiff:[],
            demandAndForecastData: [],
            // 需求侧预测---card
            cardUrl: '/card/forecast',
            cardData:{},
            // 需求侧预测---实际预测4条线
            chartRealUrl: '/chart/real/forecast',
            chartRealData: [],
            // 需求侧预测---现在预测到未来结束
            chartNowUrl: '/chart/now/forecast',
            chartNowData: [],
            // 需求侧预测---未来的预测到未来结束
            chartFutureUrl: '/chart/future/forecast',
            chartFutureData: [],
            // 需求侧预测---数据下载
            exportDataUrl: '/exportCsv'
          }

        },
      created: function () {
         this.parentDate = [];
         this.parentDate.push(this.startTime);
         this.parentDate.push(this.endTime);

         this.getSites();
      },
      methods: {
        getSites: function () {
          this.$ajax.get(this.sitesUrl)
            .then((response) => {this.siteList = (response.data);
              this.siteModel = this.siteList[0]['value'];
              this.getCardData();
            }).catch(function (error) {
          });
        },
        //点击进行数据下载
        downLoad(){
          this.$ajax
            .get(this.exportDataUrl+ '/'+ this.startTime + '/' + this.currentTimeSelect,{
              keyword:this.goodsName,
              supplier_id:this.supplier_id,
              condition:this.condition,
              sort:this.sort,
            },{responseType: 'arraybuffer'}).then((res) => {
            if(res.status==200){
              let fileName = '需求侧预测.csv'
              let blob = new Blob([res.data], { type: 'application/x-xls' })
              if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, fileName);
              } else {
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
              }
            }

          })
        },
        selelectSite: function (value) {
          this.siteModel = value;
        },
        limitText (count) {
          return `and ${count} other`
        },
        clearAll () {
          this.selectedCountries = []
        },
        selectChange(searchQuery, id) {
          console.log(searchQuery);
          console.log(id);
        },
        getChartLineFuture: function () {
          var time = new Date().toTimeString().substr(0,5);
          var endTime = this.endTime + ' '+ time;
          this.chartFutureData = [];
          // 需求侧预测---未来的预测到未来结束
          this.$ajax.get(this.chartFutureUrl+ '/' + this.forecastTimeSelect+ '/' + endTime)
            .then((response)=> {
              this.chartFutureData = response.data;
              if (this.chartFutureData.length !== 0) {
                this.drawLine(this.chartRealData,this.chartNowData,this.chartFutureData);
              }else {
                this.$Modal.info({
                  title:'Notice',
                  content: this.forecastTimeSelect +' 至 ' +endTime+' 时间段内没有查询到数据!'
                });
              }
            }).catch(function (error) {
            console.log(error);
          });
        },
        getChartLineNow: function () {
          this.chartNowData = [];
          var time = new Date().toTimeString().substr(0,5);
          var endTime = this.endTime + ' '+ time;
          //   需求侧预测---现在预测到未来结束
          this.$ajax.get(this.chartNowUrl+ '/' + this.currentTimeSelect+ '/' + endTime)
            .then((response)=> {
              this.chartNowData = response.data;
              if (this.chartNowData.length !== 0) {
                if (this.forecastTimeSelect === '') {
                  this.drawLine(this.chartRealData,this.chartNowData,this.chartFutureData);
                }else {
                  this.getChartLineFuture();
                }
              }else {
                this.$Modal.info({
                  title:'Notice',
                  content: this.currentTimeSelect +' 至 ' + endTime +' 时间段内没有查询到数据!'
                });
              }
            }).catch(function (error) {
            console.log(error);
          });
        },
        getChartLineReal: function () {
          this.chartRealData = [];
          var time = new Date().toTimeString().substr(0,5);
          var startTime = this.startTime + ' '+ time;
         // 需求侧预测---实际预测4条线
          this.$ajax.get(this.chartRealUrl+ '/' + startTime+ '/' + this.currentTimeSelect)
            .then((response)=> {
              this.chartRealData = response.data;
              if (this.chartRealData.length !== 0) {
                this.getChartLineNow();
              }else {
                this.$Modal.info({
                  title:'Notice',
                  content: startTime +' 至 ' +this.currentTimeSelect+' 时间段内没有查询到数据!'
                });
              }
            }).catch(function (error) {
            console.log(error);
          });
        },
        getCardData: function () {
          var time = new Date().toTimeString().substr(0,5);
          var startTime = this.startTime + ' '+ time;
          this.$ajax.get(this.cardUrl+ '/' + startTime+ '/' + this.currentTimeSelect)
            .then((response)=> {
              this.cardData = response.data;
              this.getChartLineReal();
            }).catch(function (error) {
            console.log(error);
          });
        },
        drawLine(realData,newData,futureData) {
          this.xAxisLine = [];
          this.yAxisLineReal = [];
          this.yAxisLineForecast = [];
          this.yAxisLineDiff = [];
          this.yAxisLineMAPE = [];
          this.yAxisLineForecastFuture = [];
          if (futureData.length !== 0) {
            for (var i = 0; i < realData.length; i++) {
              this.xAxisLine.push(realData[i].time);
              this.yAxisLineReal.push(realData[i].realValue);
              this.yAxisLineForecast.push(realData[i].forecastValue);
              this.yAxisLineDiff.push(realData[i].Diff);
              this.yAxisLineMAPE.push(realData[i].MAPE);
              this.yAxisLineForecastFuture.push(null);
            }
            let endTime = new Date(this.forecastTimeSelect).getTime();
            for (var i = 0; i < newData.length; i++) {
              var startTime = new Date(newData[i].time).getTime();
              if (startTime < endTime) {
                this.yAxisLineForecastFuture.push(null);
              }
              this.xAxisLine.push(newData[i].time);
              this.yAxisLineForecast.push(newData[i].forecastValue);
            }
            for (var i = 0; i < futureData.length; i++) {
              this.yAxisLineForecastFuture.push(futureData[i].forecastValue);
            }
          } else {
            for (var i = 0; i < realData.length; i++) {
              this.xAxisLine.push(realData[i].time);
              this.yAxisLineReal.push(realData[i].realValue);
              this.yAxisLineForecast.push(realData[i].forecastValue);
              this.yAxisLineDiff.push(realData[i].Diff);
              this.yAxisLineMAPE.push(realData[i].MAPE);
            }
            for (var i = 0; i < newData.length; i++) {
              this.xAxisLine.push(newData[i].time);
              this.yAxisLineForecast.push(newData[i].forecastValue);
            }
          }
          // 基于准备好的dom，初始化echarts实例
          let eCharts = this.$echarts.init(document.getElementById('demandForecastData'));
          var options = ({
            animation: true,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
            },
            legend: {
              itemWidth: 20,
              itemHeight: 1,
              itemGap: 10,
              right: 150,
              data:['实际总量','预测总量','偏差额','MAPE'],
            },
            grid: {
              left: '3%',
              right: '4%',
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
                nameLocation:'center',
                nameGap:24,
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
                    type: 'dashed',
                    color: ['#34313a'],
                  }
                },
              },
              {
                name: 'MAPE',
                type: 'value',
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: 'dashed',
                    color: ['#34313a'],
                  }
                },
              },
            ],
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
            series: [
              {
                name: '实际总量',
                type: 'line',
                color: ['#4bc4ff'],
                yAxisIndex:0,
                smooth: true,
                data: this.yAxisLineReal,
              },
              {
                name: '预测总量',
                type: 'line',
                color: ['#50e3c2'],
                yAxisIndex:0,
                smooth: true,
                data: this.yAxisLineForecast,
                markLine: {
                  symbol: 'none',
                  lineStyle: {
                    type: 'dashed',
                    color: ['#000000 '],
                  },
                  label: {
                    position: 'end',
                    formatter: '当前时间: {c} ',
                  },
                  data: [
                    {xAxis: realData[realData.length-1].time, name: '当前时间'},
                  ]
                },
              },
              {
                name: '偏差额',
                type: 'line',
                color: ['#fa5f7a'],
                smooth: true,
                yAxisIndex:0,
                data: this.yAxisLineDiff,
              },
              {
                name: 'MAPE',
                type: 'line',
                smooth: true,
                color: ['#fba05f'],
                yAxisIndex:1,
                data: this.yAxisLineMAPE,
              },
              {
                name: '未来时间预测',
                type: 'line',
                smooth: true,
                color: ['#6AA2BE'],
                yAxisIndex:0,
                data: this.yAxisLineForecastFuture,
              },
            ]
          });
          eCharts.setOption(options);
          this.isShowExport=true;
        },
        DateChange: function (event) {
          this.parentDate = event;
          this.startTime = this.parentDate[0];
          this.endTime = this.parentDate[1];
        },
        CurrentTimeChange: function(event) {
          this.currentTimeSelect = event;
          var startTime = new Date(this.startTime).getTime();
          var endTime = new Date(this.endTime).getTime();
          var currentTime = new Date(this.currentTimeSelect).getTime();
          if (currentTime < startTime || currentTime > endTime) {
            this.$Modal.info({
              title:'Notice',
              height: '200px',
              content: this.currentTimeSelect +' 不在 <br/>' +this.startTime+' 至 ' + this.endTime+ ' 范围内, 请重新选择'
            });
          }
        },
        ForecastTimeChange: function(event) {
          this.forecastTimeSelect = event;
          var startTime = new Date(this.currentTimeSelect).getTime();
          var endTime = new Date(this.endTime).getTime();
          var currentTime = new Date(this.forecastTimeSelect).getTime();
          if (currentTime < startTime || currentTime > endTime) {
            this.$Modal.info({
              title:'Notice',
              height: '200px',
              content: this.forecastTimeSelect +' 不在 <br/>' +this.currentTimeSelect+' 至 ' + this.endTime+ ' 范围内, 请重新选择'
            });
          }
        },
        searchData: function () {
          this.getCardData();
        }
    }


    }
</script>

<style lang="stylus" >

.ivu-layout-content
  text-align left
//站点
.multiselect__single
  font-size 12px !important

.multiselect__tags
  min-height 32px !important
  padding 2px 40px 0 8px !important

.multiselect
  height 32px !important
  min-height 32px !important

.multiselect__select
  height 32px !important
  width 26px

.multiselect__content-wrapper
  font-size 12px !important

.multiselect__tag
  padding 2px 26px 2px 10px !important
  background #f7f7f7 !important
  color gray !important
  margin-bottom 0 !important
  vertical-align middle !important
  margin-top 3px !important
  border-radius 0 !important

.multiselect__strong
  font-size 12px !important
  vertical-align middle !important
  margin-top 3px !important
  margin-bottom 0 !important
.multiselect__tag-icon:hover .multiselect__tag-icon:after
  background-color #000 !important
.multiselect__single
  margin-bottom 0 !important
  vertical-align middle !important
  margin-top 3px !important
// 单选站点
.ivu-select-selected-value
  display: inline-block !important
  height: 32px !important
  width: 205px !important
  font-size: 12px !important
  margin-right: 20px !important
  vertical-align: middle !important
</style>
