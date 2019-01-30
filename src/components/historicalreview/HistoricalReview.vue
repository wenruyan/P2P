<template>
  <div class="historicalReview" >
    <Modal v-model="isSunShowLine " v-show="!this.$store.state.isShow"  :title="lineTitle"  scrollable :footer-hide=true  width="700">
      <div style="padding-top: 20px;padding-left: 20px;height: 20px;">
        <Select v-model="model1" style="width:200px" @on-change="sunChangeType">
          <Option v-for="item in typeSunSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="height: 550px;padding-top: 30px">
        <div style="height: 500px;" id="sunPowerDetailLine"></div>
      </div>
    </Modal>
    <Modal v-model="isStorageShowLine" v-show="!this.$store.state.isShow" :title="lineTitle"  scrollable :footer-hide=true  width="700">
      <div style="padding-top: 20px;padding-left: 20px;height: 20px;">
        <Select v-model="model2" style="width:200px" @on-change="storageChangeType" >
          <Option v-for="item in typeStorageSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="height: 550px;padding-top: 30px">
        <div style="height: 500px;" id="storagePowerDetailLine"></div>
      </div>
    </Modal>
    <div class="layout">
            <Card style="marginBottom: 15px;" :data="cardData">
              <div style="min-height: 10px;">
                <!--站点单选-->
                <Select class="ivu-select-selected-value" v-model="siteModel" clearable @on-change="selelectSite">
                  <Option v-for="item in siteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!-- 站点选择 -->
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
                <DatePicker type="month" format="yyyy-MM"  :options="optionsrange"  placeholder="请选择您要查询的日期" @on-change="DateChange" :value=parentDate style="width: 200px" :style="{marginBottom:'10px',marginRight: '20px',width: '205px'}"></DatePicker>
                <Button type="primary" @click="searchData">搜索</Button>
              </div>
              <Row>
                <Col span="4" style="width:205px;margin-right:23px">
                <Card class="card">
                  <p slot="title" style="font-size:12px">用电总量(kWh)</p>
                  <div style="height:40px;line-height:40px">
                    <p style="float:left">预测</p>
                    <p class="psize" style="float:right;color:#000;font-size:16px">{{cardData.forecast}}</p>
                  </div>
                  <div style="height:40px;line-height:40px">
                    <p style="float:left">实际</p>
                    <p class="psize" style="float:right;color:#000;font-size:16px">{{cardData.reality}}</p>
                  </div>
                </Card>
                </Col>
                <Col span="4"  style="width:205px;margin-right:23px">
                <Card style="height:165px">
                  <p slot="title" style="font-size:12px">差异(kWh)</p>
                  <div style="height:40px;line-height:40px;margin-top:20px">
                    <h1 style="text-align:center">{{cardData.diff}}</h1>
                  </div>
                </Card>
                </Col>
              </Row>
              <div style="width: 100%;height: auto; padding-top: 30px" >
                <Tabs type="card">

                    <TabPane  label="资产-太阳能(200kWh)" :data="sunCardData">
                      <Card :padding=15 style="width:130px;height: 60px;margin-left: 1px;margin-top: 10px;float: left;">
                        <p>投资估算(rmb)<br/> {{sunCardData.investment}}</p>
                      </Card>
                      <Card :padding=15 style="width:130px;height: 60px;margin-left: 20px;margin-top: 10px;float: left;">
                        <p>日前估算(kWh)<br/> {{sunCardData.beforeDay}}</p>
                      </Card>
                      <Card :padding=15 style="width:120px;height: 60px;margin-left: 20px;margin-top: 10px;float: left;">
                        <p>真实(kWh)<br/>  {{sunCardData.reality}}</p>
                      </Card>
                      <Card :padding=15 style="width:120px;height: 60px;margin-left: 20px;margin-top: 10px;float: left;">
                        <p >差异(kWh) {{sunCardData.diff}}</p>
                      </Card>

                      <Table height="520"  @on-row-dblclick="popupWindowSun" :highlight-row=true style="float: right;margin-top: 20px;width: 100%;"  :columns="columns1" :data="sunTableData" ></Table>
                    </TabPane>
                  <TabPane label="资产-储能(50kWh)"  :data="storageCardData">

                    <Card :padding=15 style="width:130px;height: 60px;margin-left: 1px;margin-top: 10px;float: left;">
                      <p>投资估算(rmb)<br/> {{storageCardData.investment}}</p>
                    </Card>
                    <Card :padding=15 style="width:130px;height: 60px;margin-left: 20px;margin-top: 10px;float: left;">
                      <p>日前估算(kWh)<br/> {{storageCardData.beforeDay}}</p>
                    </Card>
                    <Card :padding=15 style="width:120px;height: 60px;margin-left: 20px;margin-top: 10px;float: left;">
                      <p>真实(kWh)<br/> {{storageCardData.reality}}</p>
                    </Card>
                    <Card :padding=15 style="width:120px;height: 60px;margin-left: 20px;margin-top: 10px;float: left;">
                      <p >差异(kWh)<br/> {{storageCardData.diff}}</p>
                    </Card>
                    <Table  height="520" @on-row-dblclick="popupWindowStorage" :highlight-row=true style="float: right;margin-top: 20px;width: 100%;"   :columns="columns2" :data="storageTableData" ></Table>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect/src/index.js'
    export default {
      name: 'HistoricalReview',
      components: {Multiselect},
      data: function() {
        return {
          // 单选站点
          siteList: [],
          siteModel: '',
          sitesUrl: '/getSites',
          // datepicker range
          optionsrange: {
            disabledDate (date) {
              return (date.valueOf() > Date.now());
            }
          },
          // modal  sun select
          typeSunSelect: [
            {
              value: 'income',
              label: '预测收益/真实收益'
            },
            {
              value: 'price',
              label: '预测电价/真实电价'
            },
            {
              value: 'powerQuantity',
              label: '预测电量/真实电量'
            },
          ],
          model1: 'income',
          // modal  storage select
          typeStorageSelect: [
            {
              value: 'income',
              label: '预测收益/真实收益'
            },
            {
              value: 'cycle',
              label: '预测循环/真实循环'
            },
          ],
          model2: 'income',
          // 站点
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
          isSunShowLine: false,
          isStorageShowLine: false,
          lineTitle: '',
          xAixsData: [],
          sunForecastData: [],
          sunRealData:[],
          storageForecastData: [],
          storageRealData:[],
          parentDate: new Date().toISOString().split('T')[0].substring(0,7),
          columns1: [
            {
              title: '时间',
              key: 'time'
            },
            {
              title: '历史平均电价（rmb)',
              width: 110,
              key: 'historicalAveragePrice'
            },
            {
              title: '历史平均电量(kWh)',
              width: 110,
              key: 'historicalAverageElectricity'
            },
            {
              title: '投资收益估算(rmb)',
              width: 110,
              key: 'investmentIncomeEstimation',
              className: 'demo-table-info-column6'
            },
            {
              title: '预测电价(rmb)',
              key: 'forecastingPrice'
            },
            {
              title: '预测电量(kWh)',
              key: 'forecastingElectricity'
            },
            {
              title: '预测收益(rmb)',
              className: 'demo-table-info-column7',
              key: 'forecastingIncome'
            },
            {
              title: '真实电价(rmb)',

              key: 'realPrice'
            },
            {
              title: '真实电量(kWh)',

              key: 'realElectricity'
            },
            {
              title: '真实收益(rmb)',
              className: 'demo-table-info-column8',
              key: 'realIncome'
            },
          ],
          columns2: [
            {
              title: '时间',
              key: 'time'
            },
            {
              title: '历史平均电价（rmb)',
              width: 110,
              key: 'historicalAveragePrice'
            },
            {
              title: '历史循环',
              key: 'historicalCycle'
            },
            {
              title: '投资收益估算(rmb)',
              width: 110,
              key: 'investmentIncomeEstimation',
              className: 'demo-table-info-column9'
            },
            {
              title: '预测电价(rmb)',
              key: 'forecastingPrice'
            },
            {
              title: '预测循环',
              key: 'forecastingCycle'
            },
            {
              title: '预测收益(rmb)',
              key: 'forecastingIncome',
              className: 'demo-table-info-column10'
            },
            {
              title: '真实电价(rmb)',
              key: 'realPrice'
            },
            {
              title: '真实循环',
              key: 'realCycle'
            },
            {
              title: '真实收益(rmb)',
              key: 'realIncome',
              className: 'demo-table-info-column11'
            },
          ],

          cardData:{},
          sunCardData:{},
          storageCardData:{},
          sunTableData: [],
          storageTableData: [],
          sunLineData:[],
          storageLineData:[],
          cardDataUrl: '/card/history',
          sunCardDataUrl: '/cardSun',
          storageCardDataUrl: '/cardStorage',
          sunTableDataUrl: '/tableSun',
          storageTableDataUrl: '/tableStorage',
          sunLineDataUrl: '/sunLine',
          storageLineDataUrl: '/storageLine',
          lengendArray: [],
          sunDaySelect: '',
          storageDaySelect: '',
        }
      },
      created: function () {
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
        selelectSite: function (value) {
          console.log(value);
          this.siteModel = value;
        },
        storageChangeType: function (value) {
          console.log(value);
          this.model2 = value;
          this.getStorageChartLineData(this.storageDaySelect);
        },
        sunChangeType: function (value) {
          console.log(value);
          this.model1 = value;
          this.getSunChartLineData(this.sunDaySelect);
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
        getSunChartLineData: function (date) {
          this.$ajax.get(this.sunLineDataUrl+ '/' + date + '/type/' + this.model1)
            .then((response)=> {
              this.sunLineData = response.data;
              this.drawLineSun(this.sunLineData,this.model1);
            }).catch(function (error) {
            console.log(error);
          });
        },
        getStorageChartLineData: function (date) {
          console.log(date);
          this.$ajax.get(this.storageLineDataUrl+ '/' + date+ '/type/' + this.model2)
            .then((response)=> {
              this.storageLineData = response.data;
              this.drawLineStorage(this.storageLineData,this.model2);
            }).catch(function (error) {
            console.log(error);
          });
        },
        getTableData: function() {
          this.$ajax.get(this.sunTableDataUrl+ '/' + this.parentDate)
            .then((response)=> {
              this.sunTableData = response.data;
              this.$ajax.get(this.storageTableDataUrl+ '/' + this.parentDate)
                .then((response)=> {
                  this.storageTableData = response.data;
                }).catch(function (error) {
                console.log(error);
              });
            }).catch(function (error) {
            console.log(error);
          });

        },
        getCardData: function () {
          this.$ajax.get(this.cardDataUrl+ '/' + this.parentDate)
            .then((response)=> {
              this.cardData = response.data;
              this.$ajax.get(this.sunCardDataUrl+ '/' + this.parentDate)
                .then((response)=> {
                  this.sunCardData = response.data;
                  this.$ajax.get(this.storageCardDataUrl+ '/' + this.parentDate)
                    .then((response)=> {
                      this.storageCardData = response.data;
                      this.getTableData();
                    }).catch(function (error) {
                    console.log(error);
                  });
                }).catch(function (error) {
                console.log(error);
              });

            }).catch(function (error) {
            console.log(error);
          });


        },
        DateChange: function (event) {
          this.parentDate = event;
        },
        searchData: function () {
          this.getCardData();
        },
        popupWindowSun: function (data, index, event) {
          this.lineTitle = '资产-太阳能:  '+ data.time + '  数据优化'
          this.isSunShowLine = true;
          this.sunLineData = [];
          this.sunDaySelect = data.time;
          this.getSunChartLineData(this.sunDaySelect);
        },
        popupWindowStorage: function (data, index, event) {
          this.lineTitle = '资产-储能:  '+ data.time + '  数据优化'
          this.isStorageShowLine = true;
          this.storageLineData = [];
          this.storageDaySelect = data.time
          this.getStorageChartLineData(this.storageDaySelect);
        },
        drawLineSun(data,type) {
          // 基于准备好的dom，初始化echarts实例
          let eCharts = this.$echarts.init(document.getElementById('sunPowerDetailLine'));
          this.xAixsData = [];
          this.sunForecastData= [];
          this.sunRealData = [];
          //  预测收益------真实收益
          if (type === 'income') {
            for (var i = 0; i < data.length; i++) {
              this.xAixsData.push(data[i].time);
              this.sunForecastData.push(data[i].forecastingIncome);
              this.sunRealData.push(data[i].realIncome);
            }
            var options = ({
              animation: true,
              color: ['#33CCFF', '#9966FF'],
              tooltip: {
                show: true,
                trigger: 'axis'
              },
              legend: {
                show:'true',
                right: 20,
                data: ['预测收益','真实收益'],
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  name: 'Time',
                  type: 'category',
                  nameLocation: 'center',
                  nameGap: 20,
                  axisPointer: {
                    label: {
                      formatter: function (params) {
                        return '时间：' + params.value;
                      }
                    }
                  },
                  data: this.xAixsData,
                }
              ],
              yAxis: [
                {
                  name: 'RMB',
                  type: 'value',
                  splitLine: {
                    show: true,
                    lineStyle: {
                      type: 'dashed',
                      color: ['#34313a'],
                    }
                  }
                },
              ],
              series: [
                {
                  name: '预测收益',
                  type: 'line',
                  data:  this.sunForecastData ,
                },
                {
                  name: '真实收益',
                  type: 'line',
                  data:  this.sunRealData ,
                },
              ]
            });
            eCharts.setOption(options);

          }
          // 预测价格------真实价格
          if (type === 'price') {
            for (var i = 0; i < data.length; i++) {
              this.xAixsData.push(data[i].time);
              this.sunForecastData.push(data[i].forecastPowerPrice);
              this.sunRealData.push(data[i].realPowerPrice);
            }
            var options = ({
              animation: true,
              color: ['#33CCFF', '#9966FF'],
              tooltip: {
                show: true,
                trigger: 'axis'
              },
              legend: {
                show:'true',
                right: 20,
                data: ['预测价格','真实价格'],
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  name: 'Time',
                  type: 'category',
                  nameLocation: 'center',
                  nameGap: 20,
                  axisPointer: {
                    label: {
                      formatter: function (params) {
                        return '时间：' + params.value;
                      }
                    }
                  },
                  data: this.xAixsData,
                }
              ],
              yAxis: [
                {
                  name: 'RMB',
                  type: 'value',
                  splitLine: {
                    show: true,
                    lineStyle: {
                      type: 'dashed',
                      color: ['#34313a'],
                    }
                  }
                },
              ],
              series: [
                {
                  name: '预测价格',
                  type: 'line',
                  data:  this.sunForecastData ,
                },
                {
                  name: '真实价格',
                  type: 'line',
                  data:  this.sunRealData ,
                },
              ]
            });
            eCharts.setOption(options);

          }
          // 预测电量---------真实电量
          if (type === 'powerQuantity') {
            for (var i = 0; i < data.length; i++) {
              this.xAixsData.push(data[i].time);
              this.sunForecastData.push(data[i].forecastPowerQuantity);
              this.sunRealData.push(data[i].realPowerQuantity);
            }
            var options = ({
              animation: true,
              color: ['#33CCFF', '#9966FF'],
              tooltip: {
                show: true,
                trigger: 'axis'
              },
              legend: {
                show:'true',
                right: 20,
                data: ['预测电量','真实电量'],
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  name: 'Time',
                  type: 'category',
                  nameLocation: 'center',
                  nameGap: 20,
                  axisPointer: {
                    label: {
                      formatter: function (params) {
                        return '时间：' + params.value;
                      }
                    }
                  },
                  data: this.xAixsData,
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
                  }
                },
              ],
              series: [
                {
                  name: '预测电量',
                  type: 'line',
                  data:  this.sunForecastData ,
                },
                {
                  name: '真实电量',
                  type: 'line',
                  data:  this.sunRealData ,
                },
              ]
            });
            eCharts.setOption(options);
          }

        },
        drawLineStorage(data,type) {
          // 基于准备好的dom，初始化echarts实例
          let eCharts = this.$echarts.init(document.getElementById('storagePowerDetailLine'));
          this.xAixsData = [];
          this.storageForecastData= [];
          this.storageRealData = [];
          if (type === 'income') {
            for (var i = 0; i < data.length; i++) {
              this.xAixsData.push(data[i].time);
              this.storageForecastData.push(data[i].forecastingIncome);
              this.storageRealData.push(data[i].realIncome);
            }
            var options = ({
              animation: true,
              color: ['#33CCFF', '#9966FF'],
              tooltip: {
                show: true,
                trigger: 'axis'
              },
              legend: {
                show:'true',
                right: 20,
                data: ['预测收益','真实收益']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  name: 'Time',
                  type: 'category',
                  nameLocation: 'center',
                  nameGap: 20,
                  axisPointer: {
                    label: {
                      formatter: function (params) {
                        return '时间：' + params.value;
                      }
                    }
                  },
                  data: this.xAixsData,
                }
              ],
              yAxis: [
                {
                  name: 'RMB',
                  type: 'value',
                  splitLine: {
                    show: true,
                    lineStyle: {
                      type: 'dashed',
                      color: ['#34313a'],
                    }
                  }
                },
              ],
              series: [
                {
                  name: '预测收益',
                  type: 'line',
                  data:  this.storageForecastData ,

                },
                {
                  name: '真实收益',
                  type: 'line',
                  data:  this.storageRealData ,
                },
              ]
            });
            eCharts.setOption(options);
          }
          if (type === 'cycle') {
            for (var i = 0; i < data.length; i++) {
              this.xAixsData.push(data[i].time);
              this.storageForecastData.push(data[i].forecastCycle);
              this.storageRealData.push(data[i].realCycle);
            }
            var options = ({
              animation: true,
              color: ['#33CCFF', '#9966FF'],
              tooltip: {
                show: true,
                trigger: 'axis'
              },
              legend: {
                show:'true',
                right: 20,
                data: ['预测循环','真实循环']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  name: 'Time',
                  type: 'category',
                  nameLocation: 'center',
                  nameGap: 20,
                  axisPointer: {
                    label: {
                      formatter: function (params) {
                        return '时间：' + params.value;
                      }
                    }
                  },
                  data: this.xAixsData,
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
                  }
                },
              ],
              series: [
                {
                  name: '预测循环',
                  type: 'line',
                  data:  this.storageForecastData ,

                },
                {
                  name: '真实循环',
                  type: 'line',
                  data:  this.storageRealData ,
                },
              ]
            });
            eCharts.setOption(options);
          }
        },
      }

    }
</script>

<style lang="stylus">

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
//标签页
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab
  margin-right 36px
  width  180px !important
  text-align center
  background-color #fff
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active
  border-color #2d8cf0

/*//表格*/
/*.ivu-table*/
  /*color #4a5c6d !important*/
/*.ivu-table th*/
  /*background-color #f8f8f9 !important*/
  /*color: normal !important*/
/*.ivu-table-wrapper*/
  /*border none !important*/
/*.ivu-table:before*/
  /*height 0 !important*/
/*.ivu-table:after*/
  /*width 0 !important*/
/*.ivu-icon:hover .ivue-icon*/
  /*cursor pointer !important*/
.ivu-table td.demo-table-info-column6
  background-color: #EBF7FF
  color: black
.ivu-table td.demo-table-info-column7
  background-color: #EBF7FF
  color: black
.ivu-table td.demo-table-info-column8
  background-color: #EBF7FF
  color: black
.ivu-table td.demo-table-info-column9
  background-color: #EBF7FF
  color: black
.ivu-table td.demo-table-info-column10
  background-color: #EBF7FF
  color: black
.ivu-table td.demo-table-info-column11
  background-color: #EBF7FF
  color: black
// 单选站点
.ivu-select-selected-value
  display: inline-block !important
  height: 32px !important
  width: 205px !important
  font-size: 12px !important
  margin-right: 20px !important
  vertical-align: middle !important
</style>
