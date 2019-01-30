import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage/HomePage'
import HeTong from '@/components/hetong/HeTong'
import ContactUs from '@/components/contactus/ContactUs'
import PriceShow from '@/components/priceshow/PriceShow'
import DispatchPower from '@/components/dispatchpower/DispatchPower'
import BeforeDayDispatch from '@/components/beforedaydispatch/BeforeDayDispatch'
import HistoricalReview from '@/components/historicalreview/HistoricalReview'
import NowPowerPriceShow from '@/components/nowpowerpriceshow/NowPowerPriceShow'
import TodayMonitor from '@/components/todaymonitor/TodayMonitor'
import DemandAndForecast from '@/components/demandandforecast/DemandAndForecast'
import ActiveOperation from '@/components/activeoperation/ActiveOperation'
import TodayDispatchPower from '@/components/todaydispatchpower/TodayDispatchPower'
import LoadingPage from '@/components/loadingPage/LoadingPage'
import ActiveOperationPage from '@/components/activeOperationPage/ActiveOperationPage'

Vue.use(Router)

export default new Router({
  routes: [
    // 微网管理平台-------首页
    {
      path: '/',
      // name: 'HomePage',
      // component: HomePage
      component: resolve => require(['@/components/HomePage/HomePage'],resolve)
    },
    // ActiveOperationPage
    // 主动运维平台------首页
    {
      path:'/activeOperationPage',
      // name: 'ActiveOperationPage',
      // component: ActiveOperationPage
      component: resolve => require(['@/components/activeOperationPage/ActiveOperationPage'],resolve)
    },
    // 主动运维平台------总览
    {
      path:'/activeOperation',
      // name: 'ActiveOperation',
      // component: ActiveOperation
      component: resolve => require(['@/components/activeoperation/ActiveOperation'],resolve)
    },
    // 主动运维平台------需求侧预测页面
    {
      path: '/demandAndForecast',
      // name: 'DemandAndForecast',
      // component: DemandAndForecast,
      component: resolve => require(['@/components/demandandforecast/DemandAndForecast'],resolve)
    },
    // 主动运维平台------历史回顾
    {
      path: '/historicalReview',
      // name: 'HistoricalReview',
      // component: HistoricalReview,
      component: resolve => require(['@/components/historicalreview/HistoricalReview'],resolve)
    },

    // 主动运维平台------资产调度中心-------日前调度
    {
      path: '/beforeDayDispatch',
      // name: 'BeforeDayDispatch',
      // component: BeforeDayDispatch,
      component: resolve => require(['@/components/beforedaydispatch/BeforeDayDispatch'],resolve),
      children: [
    //   // 日前调度----调度发电量
        {
          path: 'dispatchPower',
          // name: 'DispatchPower',
          // component: DispatchPower,
          component: resolve => require(['@/components/dispatchpower/DispatchPower'],resolve),
        },
    //     // 日前调度----价格
        {
          path: 'priceShow',
          // name: 'PriceShow',
          // component: PriceShow,
          component: resolve => require(['@/components/priceshow/PriceShow'],resolve),
        },
      ],
    },
    // 主动运维平台------资产调度中心-------日内监控
    {
      path: '/todayMonitor',
      // name: 'TodayMonitor',
      // component: TodayMonitor,
      component: resolve => require(['@/components/todaymonitor/TodayMonitor'],resolve),
      children: [
    // //   日内监控----调度发电量
        {
          path: 'todayDispatchPower',
          // name: 'TodayDispatchPower',
          // component: TodayDispatchPower
          component: resolve => require(['@/components/todaydispatchpower/TodayDispatchPower'],resolve),
        },
       // // 日内监控----价格
        {
          path: 'priceShow',
          // name: 'PriceShow',
          // component: PriceShow
          component: resolve => require(['@/components/priceshow/PriceShow'],resolve),
        },
        // //日内监控----小时明细
        {
          path: 'nowPowerPriceShow',
          // name: 'NowPowerPriceShow', @/components/nowpowerpriceshow/NowPowerPriceShow
          // component: NowPowerPriceShow
          component: resolve => require(['@/components/nowpowerpriceshow/NowPowerPriceShow'],resolve),
        }
      ],
    },
    // 全局loading加载页面
    {
      path: '/loadingPage',
      // name: 'LoadingPage',
      // component: LoadingPage,
      component: resolve => require(['@/components/loadingPage/LoadingPage'],resolve),
    },
    // 日前调度和日内监控的调度发电量 barchart
    // 日前调度的调度发电量linechart
    // 日内监控的调度发电量 linechart
    // // 合同页面
    // {
    //   path: '/heTong',
    //   name: 'HeTong',
    //   component: HeTong,
    // },
    // // 联系我们
    // {
    //   path: '/contactUs',
    //   name: 'ContactUs',
    //   component: ContactUs,
    // },
  ]
})
