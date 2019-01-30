<template>
  <div class="todaymonitor">
    <div class="layout">
            <Card style="marginBottom: 30px">
              <div div style="min-height: 10px;">
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
                <DatePicker :disabled="isShowNow" type="date" :options="optionsrange" format="yyyy-MM-dd" placeholder="请选择您要查询的日期" @on-change="DateChange" :value=parentDate style="width: 200px" :style="{marginBottom:'10px',marginRight: '20px',width: '205px'}"></DatePicker>
                <!--@on-open-change="makeSureTime"-->
                <TimePicker format="HH:mm"  :value="parentTime" type="timerange" :steps="[1, 30, 15]"   @on-change="TimeChange"  placeholder="Select time"  v-show="isshowme" :style="{marginBottom:'10px',marginRight: '20px',width: '115px'}" ></TimePicker>
                <Button type="primary" @click="searchData">搜索</Button>
                </div>
                <div style="width: 100%;height: auto;padding-top: 20px">
                  <Tabs type="card" v-model="tactiveTabs"  @on-click="tabsChange" >
                    <TabPane label="调度发电量" name="tdispatch">
                      <today-dispatch-power @changeClick1="changeClickSearch1" :clickSearch="pClickSearch1" :site="siteModel" :date="parentDate"></today-dispatch-power>
                    </TabPane>
                    <TabPane label="价格" name="tprice">
                      <price-show @clickTabs="changeTabs" @changeClick2="changeClickSearch2" :clickSearch="pClickSearch2" :site="siteModel" :date="parentDate"></price-show>
                    </TabPane>
                    <TabPane label="进入小时明细" name="tnow">
                      <now-power-price-show @changeClick3="changeClickSearch3" :clickSearch="pClickSearch3" :site="siteModel" :date="parentDate" :time="parentTime"></now-power-price-show>
                    </TabPane>
                  </Tabs>
                </div>
            </Card>
    </div>
  </div>
</template>

<script>
  import PriceShow from "../priceshow/PriceShow.vue";
  import NowPowerPriceShow from "../nowpowerpriceshow/NowPowerPriceShow.vue";
  import TodayDispatchPower from "../todaydispatchpower/TodayDispatchPower.vue";
  import Multiselect from 'vue-multiselect/src/index.js'
    export default {
          name: 'TodayMonitor',
           data: function() {
            return {
              timeGetLast: false,
              pClickSearch1: false,
              pClickSearch2: false,
              pClickSearch3: false,
              // 单选站点
              siteList: [],
              siteModel: '站点 1',
              sitesUrl: '/getSites',
              // datepicker range
              optionsrange: {
                disabledDate (date) {
                  return (date.valueOf() > Date.now());
                }
              },
              isShowNow: false,
              isshowme: false,
              tactiveTabs: 'tdispatch',
              theme2:'dark',
              parentDate: '',
              parentTime: [],
              parentPriceShowData:[],
              parentUserPower:[],
              parentSendPower:[],
              parentDispatchPowerData:[],
              parentCardDispatchData:{},
              parentCardNowData:{},
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

            }
          },
        components: {
          TodayDispatchPower,
          NowPowerPriceShow,
          PriceShow,
          Multiselect
        },

       created: function () {
         this.parentDate = new Date().toISOString().split('T')[0];
         this.parentTime = ['00:00','01:00'];
         this.parentDispatchPowerData = [];
         this.parentPriceShowData = []
         this.getSites();
       },
        methods: {
          changeClickSearch1:function () {
            this.pClickSearch1 = false;
          },
          changeClickSearch2:function () {
            this.pClickSearch2 = false;
          },
          changeClickSearch3: function () {
            this.pClickSearch3 = false;
          },
          getSites: function () {
            this.$ajax.get(this.sitesUrl)
              .then((response) => {this.siteList = (response.data);
                this.siteModel = this.siteList[0]['value'];
              }).catch(function (error) {
            });
          },
          selelectSite: function (value) {
            this.siteModel = value;
          },
          tabsChange: function (name) {
            if (name === 'tnow') {
              this.isShowNow = true;
              this.isshowme = true;
            }else {
              this.isShowNow = false;
              this.isshowme = false;
            }
          },
          changeTabs: function (value) {
            this.tactiveTabs = 'tnow';
            this.isShowNow = true;
            this.isshowme = true;
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
          DateChange: function (event) {
            this.parentDate =  event;
          },
          TimeChange: function (event) {
            this.parentTime = event;
          },
//          makeSureTime: function (event) {
//            if (!event) {
//              console.log('父组件time发生改变了......');
//             console.log(this.parentTime);
//             var startTime = new Date(this.parentDate + ' ' + this.parentTime[0] + ':00').getTime();
//             var endTime = new Date(this.parentDate + ' ' + this.parentTime[1]+ ':00').getTime();
//             var currentTime = new Date().getTime();
//             console.log('开始时间')
//             console.log(startTime);
//             console.log(new Date(this.parentDate + ' ' + this.parentTime[0]).toLocaleTimeString())
//             console.log('结束时间')
//             console.log(endTime)
//              console.log(new Date(this.parentDate + ' ' + this.parentTime[1]).toLocaleTimeString())
//              console.log('当前时间')
//             console.log(currentTime);
//              console.log(new Date().toLocaleTimeString());
//             if (startTime > currentTime) {
//               this.$Modal.info({
//                 title:'Notice',
//                 height: '200px',
//                 content: '所选时间要小于当前时间！'
//               });
//             }
//            }
//          },
          searchData: function () {
            this.pClickSearch1 = true;
            this.pClickSearch2 = true;
            this.pClickSearch3 = true;

          }
        }

    }
</script>

<style lang="stylus">

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
//标签页
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab
  margin-right 36px
  width  120px
  text-align center
  background-color #fff
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active
  border-color #2d8cf0
// 单选站点
.ivu-select-selected-value
  display: inline-block !important
  height: 32px !important
  width: 205px !important
  font-size: 12px !important
  margin-right: 20px !important
  vertical-align: middle !important
</style>
