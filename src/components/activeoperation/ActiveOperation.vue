<template>
  <div class="activeoperation" style="height: 900px">
    <Modal v-model="isShowPie" v-show="!this.$store.state.isShow" :title="pieTitle"  scrollable :footer-hide=true width="500">
      <div style="height: 380px;padding-top: -10px;">
            <div style="height: 280px;width:500px" id="powerDetailPie"></div>
        <div class="modal" :style="{width: '500px', height: '100px'}" style="border-top:1px solid #eee">
          <ul>
            <li>储能调节 (40)
              <p>40%<Icon type="md-arrow-up" size="18" color="#7FB800" /></p>
            </li>
            <li>增加太阳能比例
              <p>20%<Icon type="md-arrow-up" size="18" color="#7FB800" /></p>
            </li>
            <li>减少柴油发电比例
              <p>2%<Icon type="md-arrow-down" size="18" color="#F6511D"/></p>
            </li>
            <li>减少二氧化碳排放
              <p>200t<Icon type="md-arrow-down" size="18" color="#F6511D"/></p>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
    <div class="content" >
      <!--<Content  :style="{padding: '20px 0px',}">-->
            <Card style="height: 300px">
              <div style="min-height: 10px;">
                <!--站点单选-->
                <Select class="ivu-select-selected-value"  v-model="siteModel" clearable @on-change="selelectSite">
                  <Option v-for="item in siteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                 <!--站点选择多选框-->
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
                <!-- 日期选择 -->
                <DatePicker type="month" :options="optionsrange" format="yyyy-MM" placeholder="请选择您要查询的月份" @on-change="DateChange" :value=parentMonth :style="{marginBottom:'10px',marginRight: '20px',width: '205px'}"></DatePicker>
                <Button type="primary" @click="searchData">搜索</Button>
              </div>
              <Row :data="cardData">
                    <Col span="4" style="width:205px;margin-right:23px">
                        <Card class="card">
                            <p slot="title" style="font-size:12px">电网电费支出/收益(RMB)</p>
                            <div style="height:40px;line-height:40px">
                              <p style="float:left">预测</p>
                              <p class="psize" style="float:right;color:#000;font-size:16px">{{cardData.forecastPay}}/{{cardData.forecastIncome}}</p>
                            </div>
                            <div style="height:40px;line-height:40px">
                              <p style="float:left">实际</p>
                              <p class="psize" style="float:right;color:#000;font-size:16px">{{cardData.actualPay}}/{{cardData.actualIncome}}</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="4"  style="width:205px;margin-right:23px">
                        <Card class="card">
                            <p slot="title" style="font-size:12px">用电量/发电量(kWh)</p>
                            <div style="height:40px;line-height:40px">
                              <p style="float:left">用电</p>
                              <p class="psize" style="float:right;color:#000;font-size:18px">{{cardData.usePowerr}}</p>
                            </div>
                            <div style="height:40px;line-height:40px">
                              <p style="float:left">发电</p>
                              <p class="psize" style="float:right;color:#000;font-size:18px">{{cardData.sendPowerr}}</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="4"  style="width:205px">
                        <Card style="backgroundColor:#607D8B;border-bottom:none;height:165px">
                            <p slot="title" style="color:#fff;font-size:12px">平均电价(RMB/KWH)</p>
                            <div style="height:40px;line-height:40px;color:#fff;margin-top:20px">
                              <h1 style="text-align:center">{{cardData.averagePrice}}</h1>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card>
              <!-- 表单数据 -->
              <div style="min-height: 10px;width:100%;height: 300px;float: right;margin-top: 20px;">
                <div style="min-height: 10px;width:100%;height: 300px;float: right;margin-top: 10px;">
                  <!-- <Icon type="help-circled"></Icon> -->
                  <Table  class="activeOpera"  height="280"  @on-row-dblclick="popupWindow" :highlight-row=true  :columns="columns" :data="tableData" ></Table>
                </div>
              </div>
      <!--</Content>-->
    </div>

  </div>
</template>

<script>

    import LoadingPage from "../loadingPage/LoadingPage.vue";
    import Multiselect from 'vue-multiselect/src/index.js'
    export default {
      components: {LoadingPage,Multiselect},
      name: 'ActiveOperation',
        created: function () {
          this.getSites();
        },
        data: function () {
            return {
              // 单选站点
              siteList: [],
              siteModel: '',
              // datepicker range
              optionsrange: {
                disabledDate (date) {
                  return (date.valueOf() > Date.now());
                }
              },
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
              pieTitle: '',
              isShowPie: false,
              cardData:{},
              tableData:[],
              sendPowerPieData: [],
              usePowerPieData:[],
              usePowerPieUrl: '/usePower/',
              sendPowerPieUrl: '/sendPower/',
              tableUrl: '/table/',
              cardUrl: '/card/',
              sitesUrl: '/getSites',
              parentMonth: new Date().toISOString().split('T')[0].substring(0,7),
                columns: [
                  {
                    title: 'PowerType',
                    key: 'powerType',
                    width:500,
                    className: 'demo-table-info-column1'
                  },
                  {
                    title: '预测(kWh)',
                    key: 'forecast',
                    align: 'center',
                    className: 'demo-table-info-column2'
                  },
                  {
                    title: '实际(kWh)',
                    key: 'demand',
                    align: 'center',
                    className: 'demo-table-info-column3'
                  },
                  {
                    title: '差异(kWh)',
                    key: 'diff',
                    align: 'center',
                    className: 'demo-table-info-column4'

                  },
                  {
                    title:' ',
                    key:'icon',
                    width:100,
                    className: 'demo-table-info-column5',
                    align: 'center',
                    render: (h,params)=>{
                        return h('div',[
                            h('Icon',{
                                props:{
                                    type:params.index=='0'||params.index=='1' ?'md-help-circle':'',
                                    size:20,
                                    color:'#328fc4',
                                },
                                on: {
                                    click: (data,index,event) => {
                                         if (params.index === 0) {
                                            this.isShowPie = true;
                                            this.pieTitle = this.parentMonth +'  '+ params.row.powerType+'能源比例图';
                                            this.getUsePowerLine(this.parentMonth,params.row.powerType);
                                          } else if(params.index === 1) {
                                            this.isShowPie = true;
                                            this.pieTitle = this.parentMonth +'  '+ params.row.powerType+'能源比例图';
                                            this.getSendPowerLine(this.parentMonth,params.row.powerType);
                                          }
                                    }
                                }
                            })
                        ])
                    }
                  },
                ],

            }
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
            this.siteModel = value;
          },
          searchData: function () {
            this.getCardData();
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
          choise(name) {
            this.openNum = name.toString();
          },
          getUsePowerLine: function (time,type) {
            this.$ajax.get(this.usePowerPieUrl+time)
              .then((response)=> {
                this.usePowerPieData = response.data;
                this.drawPie(this.usePowerPieData,type);
              }).catch(function (error) {
            });
          },
          getSendPowerLine: function (time,type) {
            this.$ajax.get(this.sendPowerPieUrl+time)
              .then((response)=> {
                this.sendPowerPieData = response.data;
                this.drawPie(this.sendPowerPieData,type);
              }).catch(function (error) {
              console.log(error);
            });
          },
          getTableData: function () {
            this.$ajax.get(this.tableUrl+ this.parentMonth)
              .then((response)=> {
                this.tableData = response.data;
              }).catch(function (error) {
              console.log(error);
            });
          },
          getCardData: function () {
            this.$ajax.post(this.cardUrl + this.parentMonth,
                [{
                  'value': this.siteModel,
                  'label': this.siteModel,

                }])
              .then((response)=> {
              this.cardData = response.data;
              this.getTableData();
              }).catch(function (error) {
              console.log(error);
            });
          },
          popupWindow: function (data, index, event) {
            this.$emit('changenum',index);

          },
          drawPie(data,type) {
            // 基于准备好的dom，初始化echarts实例
            let eCharts = this.$echarts.init(document.getElementById('powerDetailPie'));
            let uselegendName = [];
            let useLegendData = [];
            let useTotal = 0;
            let sendlegendName = [];
            let sendLegendData = [];
            let sendTotal = 0;
            if (type === '用电量') {
              for (var i = 0; i < data.length; i++) {
                uselegendName.push(data[i].name);
                useTotal += data[i].value
              }
              for (var i = 0; i < data.length; i++) {
                useLegendData.push('(' + ((data[i].value / useTotal) * 100).toFixed(1) + '%)');
              }
              var options = {
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color:['#EFA900','#7FB800'],
                legend: {
                  orient: 'vertical',
                  x: '330',
                  y:'middle',
                  data:data,
                  formatter: function(name) {
                    var index = 0;
                    var clientlabels = uselegendName;
                    var clientcounts = useLegendData;
                    clientlabels.forEach(function(value,i){
                      if(value == name){
                        index = i;
                      }
                    });
                    return name  + clientcounts[index];
                  }

                },
                series: [
                  {
                    name:'',
                    type:'pie',
                    radius: ['50%', '70%'],
                    center: ['35%','48%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        show: true,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data:data
                  }
                ]
              };
              eCharts.setOption(options);
            }
            if (type === '发电量') {
              for (var i = 0; i < data.length; i++) {
                sendlegendName.push(data[i].name);
                sendTotal += data[i].value
              }
              for (var i = 0; i < data.length; i++) {
                sendLegendData.push('(' + ((data[i].value / sendTotal) * 100).toFixed(1) + '%)');
              }
              var options =  {
                tooltip: {
                  trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color:['#EFA900','#7FB800','#F6511D',],
                  legend: {
                orient: 'vertical',
                  x: '330',
                  y:'middle',
                  data:data,
                  formatter: function(name) {
                  var index = 0;
                  var clientlabels = sendlegendName;
                  var clientcounts = sendLegendData;
                  clientlabels.forEach(function(value,i){
                    if(value == name){
                      index = i;
                    }
                  });
                  return name  + clientcounts[index];
                }

              },
                series: [
                  {
                    name:'',
                    type:'pie',
                    radius: ['50%', '70%'],
                    center: ['35%','48%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        show: true,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data:data
                  }
                ]
              }
              eCharts.setOption(options);
            }
          },
          DateChange: function (event) {
            this.parentMonth = event;
          },
        },

    }
</script>

<style lang="stylus">

  .vertical-center-modal
    display: flex;
    align-items: center;
    justify-content: center

    .ivu-modal
      top: 0

.ivu-layout-content
  text-align left
.ivu-card-head
  text-align center

.ivu-card-head
      border-bottom: 1px solid rgba(233,239,244,0.4) !important

// 媒体查询
@media screen and (max-width: 1000px) {
     .ivu-row{
       .psize{
         font-size 12px !important
       }
     }
}
// .ivu-select-multiple .ivu-tag
//   padding 0 4px
// .ivu-select-multiple .ivu-select-selection
//   padding 0

//表格
.ivu-table th.demo-table-info-column1
  background-color #fff !important
  color #989898 !important

.ivu-table th.demo-table-info-column2
  background-color #fff !important
  color #989898 !important

.ivu-table th.demo-table-info-column3
  background-color #fff !important
  color #989898 !important

.ivu-table th.demo-table-info-column4
  background-color #fff !important
  color #989898 !important

.ivu-table th.demo-table-info-column5
  background-color #fff !important
  color #989898 !important






.ivu-modal-body
  padding 0
.modal li
  list-style none
  float left
  height 100px
  width 25%
  text-align center
  padding 20px 35px
.modal li:first-child
  border-right 1px solid #eee
  padding 20px
.modal li p
  font-size 16px
  color #000
  margin-top 10px
.modal li:first-child p
  font-size 20px
  margin-top 15px
.ivu-icon .ivu-icon-android-arrow-up
  width 10px
  height 10px



//多选站点
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
