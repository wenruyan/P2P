<template>
  <div class="hetong">
    <div class="layout">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"><img src="../img/logo.png" alt=""></div>
          </Menu>
        </Header>
        <Content :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '20px 0'}">
            <BreadcrumbItem to="/" style="fontSize:18px"><Icon type="ios-home-outline" size="20"></Icon> Home</BreadcrumbItem>
          </Breadcrumb>
          <Card style="marginBottom: 36px">
            <div style="min-height: 10px">
              <h4 :style="{marginBottom:'10px'}">合同</h4>
              <hr style="backgroundColor:#eee;marginBottom: 10px;border:none;height:1px"/>
              <Table  border stripe :columns="columns1" :data="data1" ></Table>
            </div>
          </Card>
          <Card style="marginBottom: 36px">
            <div style="min-height: 10px;">
              <h4 :style="{marginBottom:'10px'}">我的账单结算</h4>
              <hr style="backgroundColor:#eee;marginBottom: 10px;border:none;height:1px"/>
              <DatePicker type="datetimerange" format="yyyy-MM-dd" placeholder="请选择您要查询的日期" style="width: 300px" :style="{marginBottom:'10px'}"></DatePicker>
              <Table border stripe :columns="columns2" :data="data2"></Table>
            </div>
          </Card>
          <Card>
            <div>
              <h4 :style="{marginBottom:'10px'}">我的投资-储能设备</h4>
              <hr style="backgroundColor:#eee;marginBottom: 10px;border:none;height:1px"/>
              <DatePicker type="datetimerange" format="yyyy-MM-dd" placeholder="请选择您要查询的日期" style="width: 300px" :style="{marginBottom:'10px'}"></DatePicker>
              <Table border stripe :columns="columns3" :data="data3"></Table>
            </div>
          </Card>
        </Content>
        <Footer class="layout-footer-center">2011-2018 &copy; Power X</Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeTong',
    data () {
      return {
        columns1: [
          {
            title: '合同名',
            key: 'name'
          },
          {
            title: '文件',
            render:(h,params)=>{
              return h('Button',{
                props:{
                  type:'primary',
                  size:'small'
                },
                on:{
                  click:() =>{
                    this.show()
                  }
                }
              },'下载')
            },
            align:'center'
          },
          {
            title: '签署日期',
            key: 'date'
          },
          {
            title:'有效期',
            key:'time'
          }
        ],
        data1: [
          {
            name: 'PowerX主动运维服务合同',
            age: 18,
            date: '2016-10-03',
            time:'1年'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01',
            time:'1年'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02',
            time:'1年'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            time:'1年'
          }
        ],
        columns2: [
          {
            title: '月份',
            key: 'month'
          },
          {
            title: '文件',
            render:(h,params)=>{
              return h('Button',{
                props:{
                  type:'primary',
                  size:'small'
                },
                on:{
                  click:() =>{
                    this.show()
                  }
                }
              },'下载')
            },
            align:'center'
          },
        ],
        data2:[
          {
            month:'2018年1月'
          },
          {
            month:'2018年2月'
          },
          {
            month:'2018年3月'
          },
          {
            month:'2018年4月'
          },
          {
            month:'2018年5月'
          }

        ],
        columns3: [
          {
            title: '月份',
            key: 'month'
          },
          {
            title:'预期收益',
            key:'expectedIncome'
          },
          {
            title:'实际收益',
            key:'realIncome'
          },
          {
            title:'预计成本',
            key:'expectedCost'
          },
          {
            title:'实际成本',
            key:'actualCost'
          },
          {
            title: '文件',
            render:(h,params)=>{
              return h('Button',{
                props:{
                  type:'primary',
                  size:'small'
                },
                on:{
                  click:() =>{
                    this.show()
                  }
                }
              },'下载')
            },
            align:'center'
          },
        ],
        data3:[
          {
            month:'2018年1月份',
            expectedIncome:600,
            realIncome:700,
            expectedCost:400,
            actualCost:350
          },
          {
            month:'2018年1月份',
            expectedIncome:600,
            realIncome:700,
            expectedCost:400,
            actualCost:350
          },
          {
            month:'2018年1月份',
            expectedIncome:600,
            realIncome:700,
            expectedCost:400,
            actualCost:350
          },
          {
            month:'2018年1月份',
            expectedIncome:600,
            realIncome:700,
            expectedCost:400,
            actualCost:350
          },
          {
            month:'2018年1月份',
            expectedIncome:600,
            realIncome:700,
            expectedCost:400,
            actualCost:350
          }
        ]
      }
    },
    methods:{
      show (){
        this.$Modal.info({
          title:'文件下载',
          content:'您的文件已经为您准备好，请查收！'
        })
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
