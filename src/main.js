// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts';
import axios from 'axios'
import Vuex from "vuex";

import Multiselect from 'vue-multiselect/src/index.js'
import multiselectMixin from 'vue-multiselect/src/multiselectMixin'
import pointerMixin from 'vue-multiselect/src/pointerMixin'
export default Multiselect
export { Multiselect, multiselectMixin, pointerMixin }

Vue.use(iView)
Vue.use(Vuex)
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

Vue.prototype.$ajax= axios
/* eslint-disable no-new */
export const store = new Vuex.Store({
  state:{
    isShow:false
  }
})
//定义一个请求拦截器
axios.interceptors.request.use(function(config){
  store.state.isShow=true; //在请求发出之前进行一些操作
  // console.log('请求数据加载.....开始')
  return config
})
//定义一个响应拦截器
axios.interceptors.response.use(function(config){
    store.state.isShow= false//在这里对返回的数据进行处理
    // console.log('请求数据加载.....完成')
    return config

})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
