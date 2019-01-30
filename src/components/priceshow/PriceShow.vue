<template>
  <div class="priceshow" :data="date">
    <Tabs :data="site">
      <TabPane label="Table" :data="clickSearch">
        <Table  height="600"  :columns="columns"  :data="priceShowData"></Table>
      </TabPane>
      <TabPane label="Chart">
        <div id="priceShowEcharts" :style="{width: '90%', height: '600px'}"></div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  export default {
    name: 'PriceShow',
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
    data() {
      return {
        priceUrl: '/price',
        priceShowData: [],
        x2: [],
        y2: [],
        columns: [
          {
            title: this.date,
            key: 'time1',
            width: 200,
          },
          {
            title: 'CET/CEST time',
            key: 'time2',
            width: 200
          },
          {
            title: 'DA hourly price',
            key: 'price',

          },
          {
            title: '操作',
            width: 200,
            render:(h,params)=>{
              return h('Button',{
                props:{
                  type:'primary',
                  size:'small'
                },
                on:{
                  click:() =>{
                    this.toNowPriceShow(params);
                  }
                }
              },'明细')
            },
            align:'center'
          },
        ],
      }
    },
    beforeUpdate: function () {


      if (this.clickSearch) {
        this.columns[0].title = this.date;
        this.$emit('changeClick2');
        this.getPriceData();
      }

    },
    mounted() {
      this.getPriceData();
    },
    methods: {
      getPriceData: function(){
        this.$ajax.get(this.priceUrl+ '/' + this.date)
          .then((response)=> {
            this.priceShowData = response.data;
            this.drawLine(this.priceShowData);
          });
      },
      toNowPriceShow: function (value) {
        this.$emit('clickTabs',value.row);
      },
      drawLine(data) {
        this.x2 = [];
        this.y2 = [];
        for (var i = 0; i < data.length; i++) {
          this.x2.push(data[i].time2);
          this.y2.push(data[i].price);
        }
        // 基于准备好的dom，初始化echarts实例
        let eCharts = this.$echarts.init(document.getElementById('priceShowEcharts'));
        var options = ({
          animation: true,
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '5%',
            bottom: '6%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: 'Time',
              data: this.x2,
              nameLocation: 'center',
              nameGap:25,
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return '时间：' + params.value;
                  }
                }
              },
            }
          ],
          yAxis: [
            {
              name: 'DA hourly price',
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
          series: [
            {
              name: 'Price',
              type: 'line',
              data: this.y2,
              color: ['#0088cc'],
            },
          ]
        });
        eCharts.setOption(options);
      }
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
