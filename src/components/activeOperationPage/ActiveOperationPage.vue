<template>
<div class="activeOperationPage">
  <div class="layout" >
    <Layout>
      <!-- <Header> -->
        <Menu mode="horizontal" theme="light" active-name="1">
          <div class="layout-logo"><router-link to="/"><img src="../img/logo.png" alt=""></router-link></div>
        </Menu>
      <!-- </Header> -->
      <Layout>
        <Sider style="padding-top:20px;text-align:left">
          <Menu theme="light"  @on-select="choiseRouter"  style="width:200px" :active-name="openNum" :open-names="['3']">
              <MenuItem name="1">总览</MenuItem>
              <MenuItem name="2" >需求侧预测</MenuItem>
              <Submenu name="3">
              <template slot="title">
                资产调度中心
              </template>
              <MenuItem name="3-1" >日前调度</MenuItem>
              <MenuItem name="3-2" >日内监控</MenuItem>
              </Submenu>
              <MenuItem name="4">历史信息查询</MenuItem>
          </Menu>
        </Sider>
        <loading-page></loading-page>
        <Content v-show="!this.$store.state.isShow"  :style="{padding: '30px 30px'}">
          <active-operation @changenum="changeOpenNum"  v-if="openNum === '1'"></active-operation>
          <demand-and-forecast v-if="openNum === '2'"></demand-and-forecast>
          <before-day-dispatch v-if="openNum === '3-1'"></before-day-dispatch>
          <today-monitor v-if="openNum === '3-2'"></today-monitor>
          <historical-review v-if="openNum === '4'"></historical-review>
        </Content>
      </Layout>
    </Layout>
  </div>
</div>
</template>

<script>

    import ActiveOperation from "../activeoperation/ActiveOperation.vue";
    import DemandAndForecast from "../demandandforecast/DemandAndForecast.vue";
    import BeforeDayDispatch from "../beforedaydispatch/BeforeDayDispatch.vue";
    import TodayMonitor from "../todaymonitor/TodayMonitor.vue";
    import HistoricalReview from "../historicalreview/HistoricalReview.vue";

    import Bus from '../../assets/js/bus.js'
    import LoadingPage from "../loadingPage/LoadingPage.vue";

    export default {
      components: {
        LoadingPage,
        HistoricalReview,
        TodayMonitor,
        BeforeDayDispatch,
        DemandAndForecast,
        ActiveOperation
      },
      name: 'ActiveOperationPage',
          data: function () {
            return {
              openNum: '1',
            }
          },
          methods: {
              choiseRouter: function (name) {
               this.openNum = name;
             },
            changeOpenNum(index){
              if (index === 0) {
                this.openNum = '2'
              }
              if (index === 1) {
                this.openNum = '3-1'
              }
            }
          },
        }
</script>

<style lang="stylus" scoped >

.vertical-center-modal
  display: flex;
  align-items: center;
  justify-content: center

  .ivu-modal
    top: 0
.ivu-layout-header,
.ivu-menu,
.ivu-layout-sider
  /*background #354053 !important*/
  background #fff !important

.layout
  // border 1px solid #d7dde4
  // background #51e39a
  position relative
  border-radius 4px
  overflow hidden
  text-align center

.ivu-layout-content
  text-align left
.layout-logo
  width 200px
  height 60px
  border-right: 1px solid #eee;
  background #fff
  border-radius 3px
  float left
  position relative
  // top 12px
  // left 20px
  img
    /*background #fff*/
    /*width 110px*/
    /*height 40px*/
    vertical-align middle

.layout-footer-center
  text-align center

.ivu-menu-horizontal.ivu-menu-light:after
  height 0
.ivu-menu-horizontal
      box-shadow: 4px 4px 4px #eee;

.ivu-menu-vertical.ivu-menu-light:after
  width 0
.ivu-icon-ios-arrow-down
  font-size 20px
  color #63ADFF
</style>
